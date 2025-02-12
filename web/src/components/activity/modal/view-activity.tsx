import React, { useState } from "react";
import { CustomFieldValue, OrderRepairty, OrderStatusEnum, useAnularInovoiceByRepairMutation, useCreateUserMutation, User, UserDocumentTypes, UserTypes, useUpdateOrderRepairMutation, useUpdateUserMutation } from "../../../domain/graphql";
import { toast } from "sonner";
import { ToastyErrorGraph } from "../../../lib/utils";
import { apolloClient } from "../../../main.config";
import dayjs from "dayjs";
import { getStatusLabel } from "../tables/activity-table";
import DynamicForm from "../../../pages/Form/dynamicForm";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  visit: OrderRepairty | undefined
}

const convertToKeyValue = (fieldValues: CustomFieldValue[]): { [key: string]: any } => {
  const keyValueObject: { [key: string]: any } = {};

  fieldValues.forEach((fieldValue) => {
    const fieldName = fieldValue.field.id; // Usamos el nombre del campo como clave

    // Condicionamos para asignar el valor correcto según el tipo de campo
    if (fieldValue.valorTexto) {
      keyValueObject[fieldName] = fieldValue.valorTexto;
    } else if (fieldValue.valorTextoLargo) {
      keyValueObject[fieldName] = fieldValue.valorTextoLargo;
    } else if (fieldValue.valorFecha) {
      keyValueObject[fieldName] = fieldValue.valorFecha;
    } else if (fieldValue.valorNumerico) {
      keyValueObject[fieldName] = fieldValue.valorNumerico;
    } else if (fieldValue.valorFoto) {
      keyValueObject[fieldName] = fieldValue.valorFoto.url;
    }
  });

  return keyValueObject;
};
const obtenerHabilitacionBotones = (estado: OrderStatusEnum | undefined)   => {
  switch (estado) {
    case OrderStatusEnum.Canceled:
      return {  finalizar: false, cancelar: false, facturar: false };

    case OrderStatusEnum.InProgress:
      return {  finalizar: true, cancelar: false, facturar: false };

    case OrderStatusEnum.Completed:
      return {  finalizar: false, cancelar: false, facturar: true };
    case OrderStatusEnum.Pending:
      return { finalizar: true, cancelar: true, facturar: false };

      default:
      return { finalizar: false, cancelar: false, facturar: false };
  }
};
const ViewActivityModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, visit }) => {
  if(!visit) return null


  if (!isOpen) return null;
  // const formValues = visit.fieldValues
  const [formValues,setFormValues] = useState(convertToKeyValue(visit.fieldValues || []))
  const [updateStatus] = useUpdateOrderRepairMutation()
  const [anular] = useAnularInovoiceByRepairMutation()
  const handleChangeField = (id: string, value: string | File) => {
    // const fielValue = visit.repairType.fields?.find((value) => value.id === id)
    setFormValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  }
  const changeStatus = async (status: OrderStatusEnum) => {
    if(confirm('¿Estas seguro que quieres actulizar el estado de la repación?')){
      const toastId = toast.loading('Actualizando estado de la repación')
      try {
        const res = await updateStatus({
          variables: {
            updateInput: {
              id: visit.id,
              status: status
            }
          }
        })
        if(res.errors){
          ToastyErrorGraph(res.errors)
          return
        }
        toast.success('Reparación actualizada con éxito')
        apolloClient.cache.evict({ fieldName: "orderRepairs" })
        onClose()
      }catch(err){
        ToastyErrorGraph(err as any)
      }finally {
        toast.dismiss(toastId)
      }
    }
  }
  const removeInvoiceByRepair = async (id: string) => {
    if(confirm('¿Estas seguro que quieres actulizar anular el recibo de pago?')){
      const toastId = toast.loading('Anulando recibo de pago')
      try {
        const res = await anular({
          variables: {
            idRepair: id
          }
        })
        if(res.errors){
          ToastyErrorGraph(res.errors)
          return
        }
        toast.success('Anulación realizada con éxito')
        apolloClient.cache.evict({ fieldName: "orderRepairs" })
        onClose()
      }catch(err){
        ToastyErrorGraph(err as any)
      }finally {
        toast.dismiss(toastId)
      }
    }
  }
  const handleUpdate = () => {
    console.log(formValues)
  }
  const { finalizar, cancelar, facturar } = obtenerHabilitacionBotones(visit.status);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[800px] shadow-lg max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Información de la reparacion</h2>
          <div className="mb-4">
            <label htmlFor="dateVisit" className="block text-sm font-medium">Nombres del cliente</label>
            <input
              type="text"
              id="dateVisit"
              name="dateVisit"
              value={visit.client.name + ' ' + visit.client.lastName}
              disabled
            //   onChange={handleChange}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md`}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="dateVisit" className="block text-sm font-medium">Fecha</label>
            <input
              type="text"
              id="dateVisit"
              name="dateVisit"
              disabled
              value={dayjs(visit.createdAt).format('YYYY-MM-DD HH:mm')}
            //   onChange={handleChange}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md`}
            />
            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium">Servicio</label>
                <input
                  type="text"
                id="description"
                name="description"
                value={visit.repairType.name}
                disabled
                //   onChange={handleChange}
                className={`mt-1 block w-full p-2 border border-gray-300 rounded-md`}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="status" className="block text-sm font-medium">Estado</label>
                <input
                type="text"
                id="status"
                name="status"
                value={getStatusLabel(visit.status)}
                disabled
                //   onChange={handleChange}
                className={`mt-1 block w-full p-2 border border-gray-300 rounded-md`}
                />
            </div>
            {/* {} */}
            <h2 className="text-lg font-semibold mt-4">Formulario</h2>
            <DynamicForm fields={visit.repairType.fields || []} errors={{}} formValues={formValues} handleChange={handleChangeField} />
            <br />
            <div className="flex justify-start space-x-2">
              {
                finalizar 
                && 
                (
                  <button
                  type="button"
                  onClick={()=> changeStatus(OrderStatusEnum.Completed)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Finalizar
                </button>
                )
              }
              {
                cancelar 
                && 
                (
                  <button
                  type="button"
                  onClick={()=> changeStatus(OrderStatusEnum.Canceled)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Cancelar
                </button>
                )
              }
              {
                visit.invoice 
                && 
                (
                  <button
                  type="button"
                  onClick={()=> removeInvoiceByRepair(visit.id)}
                  className="bg-orange-500 text-white px-4 py-2 rounded-md"
                >
                  Anular recibo de pago
                </button>
                )
              }
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Cerrar Ventana
              </button>
              {
                visit.status === OrderStatusEnum.Pending
                &&
                (
                  <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={handleUpdate}
                  // disabled={cancelar}
                >
                  Actualizar
                </button>
                )
              }
            </div>
          </div>
     
      </div>
    </div>
  );
};

export default ViewActivityModal;
