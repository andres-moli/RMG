import React, { useState, useEffect } from 'react';
import { OrderRepairty, PaymentMethodEnum, StatusInvoice, useCreateInvoiceMutation } from '../../../domain/graphql';
import { formatCurrency, ToastyErrorGraph } from '../../../lib/utils';
import { toast } from 'sonner';
import { apolloClient } from '../../../main.config';

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderRepair: OrderRepairty | undefined;
}
export const optionMethodPayment: { key: string; value: string | number }[] = [
  {
    key: PaymentMethodEnum.Efectivo,
    value: "EFECTIVO"
  },
  {
    key: PaymentMethodEnum.Transferencia,
    value: 'TRANSFERENCIA'
  },
  {
    key: PaymentMethodEnum.Tarjeta,
    value: 'TARJETA'
  }
]
const CreateInovice: React.FC<CommentModalProps> = ({ isOpen, onClose, orderRepair }) => {
  if (!isOpen || !orderRepair) return null;

  const [tax, setTax] = useState<number>(0); // Porcentaje del impuesto
  const [discount, setDiscount] = useState<number>(0); // Porcentaje del descuento
  const [paymentMethod, SetPaymentMethod] = useState<PaymentMethodEnum>();
  const [description, setDescription] = useState<string>();
  const [total, setTotal] = useState<number>(orderRepair.repairType.costEstimate || 0); // Inicializamos con el subtotal
  const [createInovice] = useCreateInvoiceMutation()
  useEffect(() => {
    const subtotal = orderRepair.repairType.costEstimate || 0;
    
    // Calcular el impuesto y el descuento como porcentaje del subtotal
    const taxAmount = (tax / 100) * subtotal; // Impuesto como porcentaje
    const discountAmount = (discount / 100) * subtotal; // Descuento como porcentaje
    
    // Calcular el total
    const newTotal = subtotal + taxAmount - discountAmount;
    setTotal(newTotal);
  }, [tax, discount, orderRepair.repairType.costEstimate]); // Dependemos de tax, discount y subtotal

  // Función para manejar la creación del recibo
  const handleCreateInvoice = async () => {
    if(!paymentMethod){
      toast.info('Debes selecionar un metodo de pago')
      return
    }
    if(confirm('¿Estas seguro que quieres crear el recibo de la repación?')){
      const toastId = toast.loading('Creando recibo de pago')
      try {
        const res = await createInovice({
          variables: {
            createInput: {
              clienteId: orderRepair.client.id,
              issueDate: new Date(),
              orderRepairId: orderRepair.id,
              discount: discount,
              tax: tax,
              subtotal: orderRepair.repairType.costEstimate || 0,
              total: total,
              status: StatusInvoice.Pagada,
              paymentMethod: paymentMethod,
              description: description
            }
          }
        })
        if(res.errors){
          ToastyErrorGraph(res.errors)
          return
        }
        toast.success('Recibo creado con éxito')
        apolloClient.cache.evict({ fieldName: "orderRepairs" })
        onClose()
      }catch(err){
        ToastyErrorGraph(err as any)
      }finally {
        toast.dismiss(toastId)
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[800px] shadow-xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Crear recibo de pago</h2>
        <div className="space-y-4">
          <label htmlFor="cliente" className="block text-sm font-medium">Cliente</label>
          <input
            type="text"
            id="cliente"
            name="cliente"
            disabled
            value={orderRepair.client.name + ' ' + orderRepair.client.lastName + ' - ' + orderRepair.client.numberDocument}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          <label htmlFor="service" className="block text-sm font-medium">Servicio</label>
          <input
            type="text"
            id="service"
            name="service"
            disabled
            value={orderRepair.repairType.name}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          <label htmlFor="subtotal" className="block text-sm font-medium">Sub total</label>
          <input
            type="text"
            id="subtotal"
            name="subtotal"
            disabled
            value={formatCurrency(orderRepair.repairType.costEstimate || 0)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          <label htmlFor="tax" className="block text-sm font-medium">Impuesto (%)</label>
          <input
            type="number"
            id="tax"
            name="tax"
            value={tax}
            onChange={(e) => setTax(Math.min(100, Math.max(0, Number(e.target.value))))} // Límite entre 0 y 100
            min="0"
            max="100"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          <label htmlFor="discount" className="block text-sm font-medium">Descuento (%)</label>
          <input
            type="number"
            id="discount"
            name="discount"
            value={discount}
            onChange={(e) => setDiscount(Math.min(100, Math.max(0, Number(e.target.value))))} // Límite entre 0 y 100
            min="0"
            max="100"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          <label htmlFor="total" className="block text-sm font-medium">Total a pagar</label>
          <input
            type="text"
            id="total"
            name="total"
            value={formatCurrency(total)}
            disabled
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          <label htmlFor="identificationType" className="block text-sm font-medium">Metodo de pago</label>
          <select
            id="identificationType"
            name="identificationType"
            value={paymentMethod}
            onChange={(e)=> SetPaymentMethod(e.target.value as PaymentMethodEnum)}
            className={`mt-1 block w-full p-2 border border-gray-300 rounded-md`}
          >
            <option disabled selected value={''}>Seleccione un tipo</option>
            {
              optionMethodPayment.map((id)=> {
                return (
                  <option value={id.key}>{id.value}</option>
                )
              })
            }
          </select>
          {/* <label htmlFor='description' className="text-gray-700">Descripción</label> */}
          <textarea
            id='description'
            name='description'
            className={`border w-full p-2 rounded-md border-gray-300`}
            placeholder={'Descripción'}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>

        <div className="flex justify-between space-x-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
          >
            Cerrar
          </button>
          <button
            type="button"
            onClick={handleCreateInvoice} // Llamamos a la función de crear la factura
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateInovice;
