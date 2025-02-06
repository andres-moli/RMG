import React, { useState } from "react";
import { CustomFieldValue, OrderRepairty, useCreateUserMutation, User, UserDocumentTypes, UserTypes, useUpdateUserMutation } from "../../../domain/graphql";
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
const ViewActivityModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, visit }) => {
  if(!visit) return null


//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const formErrors = validateForm();
//     if (Object.keys(formErrors).length > 0) {
//       setErrors(formErrors);
//       return;
//     }
//     const toatsId = toast.loading('Actualizando usuario..')
//     try {
//       const res = await update({
//         variables: {
//           updateInput: {
//             ...formData,
//             id: user.id,
//             type: UserTypes.User,
//             identificationType: formData.identificationType as UserDocumentTypes,
//             password: formData.identificationNumber
//           }
//         }
//       })
//       if(res.errors){
//         toast.error(res.errors[0].message);
//         toast.dismiss(toatsId)
//         return
//       }
//       toast.success('Usuario Actualizado...');
//       apolloClient.cache.evict({ fieldName: "users" })
//     } catch (err) {
//         ToastyErrorGraph(err as any)
//     } finally {
//       toast.dismiss(toatsId)
//     }
//     onClose(); // Cerrar el modal después de enviar
//   };
// const startTime = dayjs(visit.visitItem.find((x) => x.type === VisitComentTypeEnum.Inicio)?.dateFull || new Date())
// const endTime = dayjs(visit.visitItem.find((x) => x.type === VisitComentTypeEnum.Fin)?.dateFull || new Date())

// const totalMinutos = endTime.diff(startTime, 'minutes')
  if (!isOpen) return null;
  const formValues = visit.fieldValues
  const handleChangeField = () => {

  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[800px] shadow-lg max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Información de la reparacion</h2>
        <form>
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
            <DynamicForm fields={visit.repairType.fields || []} errors={{}} formValues={convertToKeyValue(visit.fieldValues || [])} handleChange={handleChangeField} />
            <br />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Actualizar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewActivityModal;
