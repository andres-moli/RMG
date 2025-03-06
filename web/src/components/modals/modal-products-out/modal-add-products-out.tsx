import React, { useState } from "react";
import { OrderTypes, PaymentMethodEnum, Products, StatusInvoice, useClientsQuery, useCreateProductInflowMutation, useCreateProductOutflowMutation, useOrderRepairsTypeQuery, useProductsQuery } from "../../../domain/graphql";
import { toast } from "sonner";
import { formatCurrency, ToastyErrorGraph } from "../../../lib/utils";
import { apolloClient } from "../../../main.config";
import { PiPlus } from "react-icons/pi";
import { BiTrash } from "react-icons/bi";
import SearchableSelect from "../../SelectFind/selectFind";
import RegisterClientModal from "../modal-client/modal-add-client";
import RegisterServiceModal from "../../../pages/service/modal/modal-add-service";
import RegisterModalProducts from "../modal-products/modal-add-products";
import RegisterModalProductsEntry from "../modal-products-entry/modal-add-products-entry";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const typePaymentMethod: { key: string; value: string | number }[] = [
  { key: PaymentMethodEnum.Efectivo, value: "EFECTIVO" },
  { key: PaymentMethodEnum.Transferencia, value: "TRANSFERENCIA" },
  { key: PaymentMethodEnum.Tarjeta, value: "TARJETA" }
];

const RegisterModalProductsOut: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const [createUser] = useCreateProductOutflowMutation();
  const [clientId, setClientId] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodEnum>();
  const [items, setItems] = useState([{ type: 'product', id: '', quantity: 1, discount: 0, tax: 0, unitPrice: 0, total: 0 }]);
  const [calculationMethod, setCalculationMethod] = useState<'manual' | 'auto'>('auto');
  const [isOpenModalCliente,setOpenModalCliente] = useState(false)
  const [isOpenModalService,setOpenModalService] = useState(false)
  const [isOpenModalProduct,setOpenModalProduct] = useState(false)
  const [isOpenModalProductEntry,setOpenModalProductEntry] = useState(false)
  const { data, loading, refetch } = useClientsQuery({
    variables: {
      orderBy: { createdAt: OrderTypes.Desc },
      pagination: { skip: 0, take: 99999999 }
    }
  });

  const optionClient = data?.clients.map((x) => ({
    key: x.id,
    value: x.name + ' ' + x.lastName + " - " + x.numberDocument,
  })) || [];

  const { data: productsData, loading: productsLoading, refetch: refetchProduct } = useProductsQuery({
    variables: {
      where: { isActive: { _eq: 'true' } },
      orderBy: {
        name: OrderTypes.Asc
      },
      pagination: { skip: 0, take: 99999999 }
    }
  });

  const optionProductList = productsData?.Products.map((p) => ({
    key: p.id,
    value: p.name + " - " + formatCurrency(p.salePrice),
  })) || [];

  const { data: serviceData, loading: serviceLoading, refetch: refetchService } = useOrderRepairsTypeQuery({
    variables: {
      where: {},
      orderBy: {
        createdAt: OrderTypes.Desc
      },
      pagination: { skip: 0, take: 99999999 }
    }
  });

  const optionServiceList = serviceData?.orderRepairsType.filter((s) => s.status).map((p) => ({
    key: p.id,
    value: p.name + " - " + formatCurrency(p.costEstimate || 0),
  })) || [];

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
  
    if (field === 'type' || field === 'id') {
      const item = updatedItems[index];
      if (item.type === 'product') {
        const product = productsData?.Products.find((p) => p.id === item.id);
        updatedItems[index].unitPrice = product?.salePrice || 0;
      } else if (item.type === 'service') {
        const service = serviceData?.orderRepairsType.find((s) => s.id === item.id);
        updatedItems[index].unitPrice = service?.costEstimate || 0;
      }
    }
  
    if (calculationMethod === 'auto') {
      const { quantity, discount, tax, unitPrice } = updatedItems[index];
      const subtotal = unitPrice * quantity;
      const discountAmount = (subtotal * discount) / 100;
      const taxAmount = (subtotal * tax) / 100;
      updatedItems[index].total = subtotal - discountAmount + taxAmount;
    }
    if(field == 'quantity' && calculationMethod === 'manual'){
      const { total, quantity } = updatedItems[index];
      updatedItems[index].total = total * quantity
    }
  
    setItems(updatedItems);
  };
  const addItem = () => {
    setItems([...items, { type: 'product', id: '', quantity: 1, discount: 0, tax: 0, unitPrice: 0, total: 0 }]);
  };

  const removeItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const calculateTotalInvoice = () => {
    return items.reduce((total, item) => total + item.total, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId) {
      toast.info('Debes seleccionar un cliente');
      return;
    }
    if (!paymentMethod) {
      toast.info('Debes seleccionar un método de pago');
      return;
    }
    if (!items.length) {
      toast.error("Debes seleccionar al menos 1 ítem");
      return;
    }
    const findEmpty = items.find((x) => x.id === '');
    if (findEmpty) {
      toast.error("Debes seleccionar un ítem en todas las filas");
      return;
    }

    const toastId = toast.loading("Creando recibo...");
    try {
      const invoiceProducts = items
        .filter((item) => item.type === 'product')
        .map(({ id, quantity, discount, tax, unitPrice,total }) => ({
          productId: id,
          quantity,
          discount,
          tax,
          unitPrice,
          total: calculationMethod === 'manual' ? total : undefined
        }));

      const invoiceServices = items
        .filter((item) => item.type === 'service')
        .map(({ id, quantity, discount, tax, unitPrice, total }) => ({
          serviceId: id,
          quantity,
          discount,
          tax,
          unitPrice,
          total: calculationMethod === 'manual' ? total : undefined
        }));

      const resMutation = await createUser({
        variables: {
          createInput: {
            description: description,
            clientId: clientId,
            inflowDate: new Date(),
            paymentMethod: paymentMethod as PaymentMethodEnum,
            status: StatusInvoice.Pagada,
            manually: calculationMethod === 'manual',
            invoiceProducts,
            invoiceServices,
          }
        }
      });

      if (resMutation.errors) {
        toast.error("¡Oops, hubo un error!");
        return;
      }
      apolloClient.cache.evict({ fieldName: "ProductsOutflows" });

      toast.success("Recibo de pago creado con éxito");
    } catch (error) {
      ToastyErrorGraph(error as any);
    } finally {
      toast.dismiss(toastId);
    }

    onClose(); // Cerrar el modal después de enviar
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg  w-[90%] shadow-lg max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Entrada de productos y servicios</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
          <div className="space-y-4">
            <button 
              type="button" 
              className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 mx-4" 
              onClick={() => setOpenModalCliente(true)}
            >
              Crear Cliente
            </button>
            <button 
              type="button" 
              className="bg-orange-500 text-white px-4 py-2 rounded-md mb-4 mx-4" 
              onClick={() => setOpenModalService(true)}
            >
              Crear Servicio
            </button>
            <button 
              type="button" 
              className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 mx-4" 
              onClick={() => setOpenModalProduct(true)}
            >
              Crear Producto
            </button>
            <button 
              type="button" 
              className="bg-orange-500 text-white px-4 py-2 rounded-md mb-4 mx-4" 
              onClick={() => setOpenModalProductEntry(true)}
            >
              Crear Entrada Producto
            </button>
          </div>

            <SearchableSelect
              value={clientId}
              onChange={(value) => setClientId(value)}
              options={optionClient}
              placeholder="Seleccione un cliente"
            />
            <label htmlFor="identificationType" className="block text-sm font-medium">Metodo de pago</label>
            <select
              id="identificationType"
              name="identificationType"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as PaymentMethodEnum)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option disabled selected value={''}>Seleccione un tipo</option>
              {typePaymentMethod.map((id) => (
                <option key={id.key} value={id.key}>{id.value}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Método de cálculo:</label>
            <div>
              <label>
                <input
                  type="radio"
                  value="auto"
                  checked={calculationMethod === 'auto'}
                  onChange={() => setCalculationMethod('auto')}
                />
                Automático (con descuento e impuesto)
              </label>
              <label>
                <input
                  type="radio"
                  value="manual"
                  checked={calculationMethod === 'manual'}
                  onChange={() => setCalculationMethod('manual')}
                />
                Manual
              </label>
            </div>
          </div>
          <label htmlFor="description" className="block text-sm font-medium">Descripción</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          <div className="mt-4">
            <h3 className="text-lg font-semibold"><PiPlus onClick={addItem} className='cursor-pointer' /></h3>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Ítem</th>
                  <th>Cantidad</th>
                  <th>Descuento (%)</th>
                  <th>Impuesto (%)</th>
                  <th>Total</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="w-1/12">
                      <select
                        value={item.type}
                        onChange={(e) => handleItemChange(index, 'type', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                      >
                        <option value="product">Producto</option>
                        <option value="service">Servicio</option>
                      </select>
                    </td>
                    <td className="w-1/3">
                      <SearchableSelect
                        value={item.id}
                        onChange={(value) => handleItemChange(index, 'id', value)}
                        options={item.type === 'product' ? optionProductList : optionServiceList}
                        placeholder={`Seleccione un ${item.type}`}
                      />
                    </td>
                    <td className="w-1/12">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 1)}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </td>
                    <td className="w-1/12">
                        <input
                          type="number"
                          value={item.discount}
                          onChange={(e) => handleItemChange(index, 'discount', parseFloat(e.target.value) || 0)}
                          className="w-full p-2 border border-gray-300 rounded"
                          disabled={calculationMethod === 'manual'}
                        />
                      </td>
                      <td className="w-1/12">
                        <input
                          type="number"
                          value={item.tax}
                          onChange={(e) => handleItemChange(index, 'tax', parseFloat(e.target.value) || 0)}
                          className="w-full p-2 border border-gray-300 rounded"
                          disabled={calculationMethod === 'manual'}
                        />
                      </td>
                      <td className="w-1/6 p-1 text-right">
                        <input
                          type="number"
                          value={calculationMethod === 'manual' ? item.total: item.total.toFixed(2)}
                          onChange={(e) => calculationMethod === 'manual' && handleItemChange(index, 'total', parseFloat(e.target.value) || 0)}
                          className="w-full p-2 border border-gray-300 rounded"
                          disabled={calculationMethod === 'auto'}
                        />
                    </td>
                    <td className="w-1/12 text-center">
                      <BiTrash onClick={() => removeItem(index)} className="text-red-500 cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="mt-4 text-lg font-semibold">
            Total recibo de pago: {formatCurrency(calculateTotalInvoice())}
          </h3>
          <br />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Registrar
          </button>
          <button type="button" className="bg-red-500 text-white px-4 py-2 rounded-md ml-2" onClick={onClose}>
            Cerrar
          </button>
        </form>
      </div>
      <RegisterClientModal 
        isOpen={isOpenModalCliente}
        onClose={() => setOpenModalCliente(false)}
        refresh={refetch}
      />
      <RegisterServiceModal 
          isOpen={isOpenModalService}
          onClose={() => setOpenModalService(false)}
          refresh={refetchService}
      />
      <RegisterModalProducts 
        isOpen={isOpenModalProduct}
        onClose={() => setOpenModalProduct(false)}
        refresh={refetchProduct}
      />
      <RegisterModalProductsEntry 
        isOpen={isOpenModalProductEntry}
        onClose={() => setOpenModalProductEntry(false)}

      />
    </div>
  );
};

export default RegisterModalProductsOut;