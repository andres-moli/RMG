import React, { useState } from "react";
import { OrderTypes, PaymentMethodEnum, Products, StatusInvoice, useClientsQuery, useCreateProductInflowMutation, useCreateProductOutflowMutation, useProductsQuery } from "../../../domain/graphql";
import { toast } from "sonner";
import { formatCurrency, ToastyErrorGraph } from "../../../lib/utils";
import { apolloClient } from "../../../main.config";
import SelectProduct from "../../SelectFind/select-product";
import { PiPlus } from "react-icons/pi";
import { BiTrash } from "react-icons/bi";
import SearchableSelect from "../../SelectFind/selectFind";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const typePaymentMethod: { key: string; value: string | number }[] = [
  {
    key: PaymentMethodEnum.Efectivo,
    value: "EFECTIVO"
  },
  {
    key: PaymentMethodEnum.Transferencia,
    value: "TRANSFERENCIA"
  },
  {
    key: PaymentMethodEnum.Tarjeta,
    value: "TARJETA"
  }
]
const RegisterModalProductsOut: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const [createUser] = useCreateProductOutflowMutation();
  const [clientId,setClientId] = useState<string>()
  const [description,setDescription] = useState<string>()
  const [paymentMethod, SetPaymentMethod] = useState<PaymentMethodEnum>();
  const [products, setProducts] = useState([{ productId: '', quantity: 1, discount: 0, tax: 0, unitPrice: 0, total: 0 }]);
  const { data, loading } = useClientsQuery({
    variables: {
      orderBy: { createdAt: OrderTypes.Desc },
      pagination: {
        skip: 0,
        take: 99999999
      }
    }
  });
  const optionClient = data?.clients.map((x) => ({
    key: x.id,
    value: x.name + ' ' + x.lastName + " - " + x.numberDocument,
  })) || [];
  const {data: productsData, loading: productsLoading} = useProductsQuery({
    variables: {
      where: {
        isActive: {
          _eq: 'true'
        }
      },
      pagination: {
        skip: 0,
        take: 99999999
      }
    }
  })
  const optionProductList = productsData?.Products.map((p) => ({
    key: p.id,
    value: p.name + " - " + p.salePrice,
  })) || [];

  const handleProductChange = (index: number, field: string, value: string | number) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    let { quantity, discount, tax, unitPrice, productId } = updatedProducts[index];
    const proudctFind = productsData?.Products.find((p)=> p.id === productId)
    unitPrice = proudctFind?.salePrice || 0
    const subtotal = unitPrice;
    const discountAmount = (subtotal * discount) / 100;
    const taxAmount = (subtotal * tax) / 100;
    updatedProducts[index].total = (unitPrice * quantity) - discountAmount + taxAmount;

    setProducts(updatedProducts);
  };

  const addProduct = () => {
    setProducts([...products, { productId: '', quantity: 1, discount: 0, tax: 0, unitPrice: 0, total: 0 }]);
  };

  const calculateTotalInvoice = () => {
    return products.reduce((total, product) => total + product.total, 0);
  };
  const removeProduct = (index: number) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!clientId){
      toast.info('Debes selecionar un cliente')
      return
    }
    if(!paymentMethod){
      toast.info('Debes selecionar un metodo de pago')
      return
    }
    if(!products.length){
      toast.error("Debes selecionar minimo 1 producto");
      return
    }
    const findEmpy = products.find((x)=> x.productId == '')
    if(findEmpy) {
      toast.error("Debes selecionar minimo 1 producto o hay un columna sin producto");
      return
    }

    const toastId = toast.loading("Creando recibo producto...");
    try {
      const resMutation = await createUser({
        variables: {
          createInput: {
            description: description,
            clientId: clientId,
            inflowDate: new Date(),
            paymentMethod: paymentMethod as PaymentMethodEnum,
            status: StatusInvoice.Pagada,
            invoiceProducts: products.map(({ productId, quantity, discount, tax, unitPrice }) => ({
              productId,
              quantity,
              discount,
              tax,
              unitPrice,
            })),
          }
        }
      });

      if (resMutation.errors) {
        toast.error("¡Oops, hubo un error!");
        return;
      }
      apolloClient.cache.evict({ fieldName: "ProductsOutflows" })

      toast.success("recibo de pago creado con éxito");
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
      <div className="bg-white p-6 rounded-lg w-[800px] shadow-lg max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Entrada de productos</h2>
        <form onSubmit={handleSubmit}>
          {/* Selector de Producto */}
          <div className="mb-4">
          <SearchableSelect
              value={clientId}
              onChange={(value) => setClientId(value)}
              options={optionClient}
              placeholder="Seleccione un cliente"
          />
          <label htmlFor="identificationType" className="block text-sm font-medium">Tipo de Identificación</label>
          <select
            id="identificationType"
            name="identificationType"
            value={paymentMethod}
            onChange={(e)=> SetPaymentMethod(e.target.value as PaymentMethodEnum)}
            className={`mt-1 block w-full p-2 border border-gray-300 rounded-md`}
          >
            <option disabled selected value={''}>Seleccione un tipo</option>
            {
              typePaymentMethod.map((id)=> {
                return (
                  <option value={id.key}>{id.value}</option>
                )
              })
            }
          </select>
          </div>
          <label htmlFor="description" className="block text-sm font-medium">Descripcion</label>
          <textarea
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            rows={4}
            className={`mt-1 block w-full p-2 border border-gray-300 rounded-md`}
          />
          <div className="mt-4">
          <h3 className="text-lg font-semibold"><PiPlus onClick={addProduct} className='cursor-pointer'/></h3>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Descuento (%)</th>
                <th>Impuesto (%)</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
            {products.map((product, index) => (
              <tr key={index} className="border-b">
                {/* Columna de Producto - ocupa más espacio */}
                <td className="w-1/3">
                  <SearchableSelect
                    value={product.productId}
                    onChange={(value) => handleProductChange(index, 'productId', value)}
                    options={optionProductList}
                    placeholder="Seleccione un producto"
                  />
                </td>

                {/* Columnas de valores numéricos más estrechas */}
                <td className="w-1/12">
                  <input
                    type="number"
                    value={product.quantity}
                    onChange={(e) => handleProductChange(index, 'quantity', parseFloat(e.target.value) || 1)}
                    className="w-full p-3 border border-gray-300 rounded text-xs"
                  />
                </td>
                <td className="w-1/12">
                  <input
                    type="number"
                    value={product.discount}
                    onChange={(e) => handleProductChange(index, 'discount', parseFloat(e.target.value) || 0)}
                    className="w-full p-3 border border-gray-300 rounded text-xs"
                  />
                </td>
                <td className="w-1/12">
                  <input
                    type="number"
                    value={product.tax}
                    onChange={(e) => handleProductChange(index, 'tax', parseFloat(e.target.value) || 0)}
                    className="w-full p-3 border border-gray-300 rounded text-xs"
                  />
                </td>
                <td className="w-1/6 p-1 text-right">
                  <input
                    type="number"
                    value={product.total.toFixed(2)}
                    className="w-full p-3 border border-gray-300 rounded text-xs"
                    disabled={true}
                  />
                </td>
                
                {/* Columna de acciones con el icono de eliminar */}
                <td className="w-1/12 text-center">
                  <BiTrash onClick={() => removeProduct(index)} className="text-red-500 cursor-pointer"/>
                </td>
              </tr>
            ))}
              </tbody>
              </table>
            </div>

            <h3 className="mt-4 text-lg font-semibold">
              Total recibo de pago: {formatCurrency(calculateTotalInvoice())}
            </h3> <br />
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
        </form>
      </div>
    </div>
  );
};

export default RegisterModalProductsOut;
