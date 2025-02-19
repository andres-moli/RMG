import React, { useState } from "react";
import { OrderTypes, PaymentMethodEnum, Products, RepairType, StatusInvoice, useClientsQuery, useCreateCotizacionMutation, useCreateProductOutflowMutation, useOrderRepairsTypeQuery, useProductsQuery } from "../../../../domain/graphql";
import { toast } from "sonner";
import { formatCurrency, ToastyErrorGraph } from "../../../../lib/utils";
import { apolloClient } from "../../../../main.config";
import { PiPlus } from "react-icons/pi";
import { BiTrash } from "react-icons/bi";
import SearchableSelect from "../../../../components/SelectFind/selectFind";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModalCotizacionOut: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const [createCotizacion] = useCreateCotizacionMutation();
  const [clientId, setClientId] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [items, setItems] = useState([
    { type: 'product', id: '', quantity: 1, discount: 0, tax: 0, unitPrice: 0, total: 0 },
  ]);
  const [itemType, setItemType] = useState<'product' | 'service'>('product');

  const { data: clientsData } = useClientsQuery({
    variables: {
      orderBy: { createdAt: OrderTypes.Desc },
      pagination: { skip: 0, take: 99999999 },
    },
  });
  const clientOptions = clientsData?.clients.map((x) => ({
    key: x.id,
    value: `${x.name} ${x.lastName} - ${x.numberDocument}`,
  })) || [];

  const { data: productsData } = useProductsQuery({
    variables: {
      where: { isActive: { _eq: 'true' } },
      pagination: { skip: 0, take: 99999999 },
    },
  });
  const productOptions = productsData?.Products.map((p) => ({
    key: p.id,
    value: `${p.name} - ${formatCurrency(p.salePrice)}`,
  })) || [];

  const { data: servicesData } = useOrderRepairsTypeQuery({
    variables: {
      pagination: { skip: 0, take: 99999999 },
    },
  });
  const serviceOptions = servicesData?.orderRepairsType?.filter((service) => service.status === true)?.map((s) => ({
    key: s.id,
    value: `${s.name} - ${formatCurrency(s.costEstimate || 0)}`,
  })) || [];

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    const { quantity, discount, tax, unitPrice, id } = updatedItems[index];
    let itemPrice = 0;

    const selectedItem = updatedItems[index].type === 'product'
      ? productsData?.Products.find((p) => p.id === id)?.salePrice
      : servicesData?.orderRepairsType.find((s) => s.id === id)?.costEstimate;
    itemPrice = selectedItem || 0;
    const subtotal = itemPrice;
    const discountAmount = (subtotal * discount) / 100;
    const taxAmount = (subtotal * tax) / 100;
    updatedItems[index].total = (itemPrice * quantity) - discountAmount + taxAmount;
    updatedItems[index].unitPrice = subtotal
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([
      ...items,
      { type: itemType, id: '', quantity: 1, discount: 0, tax: 0, unitPrice: 0, total: 0 },
    ]);
  };

  const removeItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.total, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientId) {
      toast.info('Debes seleccionar un cliente');
      return;
    }
    if (!items.length) {
      toast.error("Debes seleccionar mínimo 1 artículo");
      return;
    }

    // Validar si algún artículo tiene un precio cero o inválido
    // for (const item of items) {
    //   if (item.unitPrice <= 0 || item.quantity <= 0) {
    //     toast.error(`El precio o la cantidad del ${item.} es inválido.`);
    //     return;
    //   }
    // }
    const toastId = toast.loading("Creando cotización...");
    try {
      // Preparar los datos para la mutación
      const cotizacionData = {
        clientId,
        description,
        items: items.map(item => ({
          id: item.id,
          type: item.type,
          quantity: item.quantity,
          discount: item.discount,
          tax: item.tax,
          unitPrice: item.unitPrice,
          total: item.total
        }))
      };
      console.log(cotizacionData)

      const resMutation = await createCotizacion({
        variables: {
          createInput: cotizacionData
        }
      });

      if (resMutation.errors) {
        toast.error("¡Oops, hubo un error!");
        return;
      }

      apolloClient.cache.evict({ fieldName: "Cotizaciones" });
      toast.success("Cotización creada con éxito");
    } catch (error) {
      ToastyErrorGraph(error as any);
    } finally {
      toast.dismiss(toastId);
    }

    onClose(); // Cerrar el modal después de enviar
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[90%] shadow-lg max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Cotización de productos o servicios</h2>
        <form onSubmit={handleSubmit}>
          {/* Selector de cliente */}
          <div className="mb-4">
            <SearchableSelect
              value={clientId}
              onChange={(value) => setClientId(value)}
              options={clientOptions}
              placeholder="Seleccione un cliente"
            />
          </div>

          {/* Selector de tipo de artículo (producto o servicio) */}
          {/* <div className="mb-4">
            <label htmlFor="itemType" className="block text-sm font-medium">Tipo de artículo</label>
            <select
              id="itemType"
              value={itemType}
              onChange={(e) => setItemType(e.target.value as 'product' | 'service')}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="product">Producto</option>
              <option value="service">Servicio</option>
            </select>
          </div> */}

          {/* Descripción */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium">Descripción</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Agregar Producto o Servicio */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">
              <PiPlus onClick={addItem} className="cursor-pointer" />
            </h3>

            {/* Mostrar tabla de productos o servicios según selección */}
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Producto o servicio</th>
                  <th>Cantidad</th>
                  <th>Precio und</th>
                  <th>Descuento (%)</th>
                  <th>Impuesto (%)</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="w-1/8">
                    <select
                        id="itemType"
                        value={item.type}
                        onChange={(e) => handleItemChange(index, 'type', e.target.value as 'product' | 'service')}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        >
                        <option value="product">Producto</option>
                        <option value="service">Servicio</option>
                    </select>
                    </td>
                    <td className="w-1/3">
                      <SearchableSelect
                        value={item.id}
                        onChange={(value) => handleItemChange(index, 'id', value)}
                        options={item.type === 'product' ? productOptions : serviceOptions}
                        placeholder={`Seleccione un ${item.type === 'product' ? 'producto' : 'servicio'}`}
                      />
                    </td>
                    <td className="w-1/12">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 1)}
                        className="w-full p-3 border border-gray-300 rounded text-xs"
                      />
                    </td>
                    <td className="w-1/12">
                      <input
                        type="number"
                        disabled
                        value={item.unitPrice}
                        className="w-full p-3 border border-gray-300 rounded text-xs"
                      />
                    </td>
                    <td className="w-1/12">
                      <input
                        type="number"
                        value={item.discount}
                        onChange={(e) => handleItemChange(index, 'discount', parseFloat(e.target.value) || 0)}
                        className="w-full p-3 border border-gray-300 rounded text-xs"
                      />
                    </td>
                    <td className="w-1/12">
                      <input
                        type="number"
                        value={item.tax}
                        onChange={(e) => handleItemChange(index, 'tax', parseFloat(e.target.value) || 0)}
                        className="w-full p-3 border border-gray-300 rounded text-xs"
                      />
                    </td>
                    <td className="w-1/6 p-1 text-right">
                      <input
                        type="number"
                        value={item.total.toFixed(2)}
                        className="w-full p-3 border border-gray-300 rounded text-xs"
                        disabled={true}
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
            Total: {formatCurrency(calculateTotal())}
          </h3>

          <div className="mt-4 flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Registrar
            </button>
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterModalCotizacionOut;