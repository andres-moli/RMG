import React, { useState } from "react";
import { Client, useCreateUserMutation, User, UserDocumentTypes, UserStatusTypes, UserTypes, useUpdateClientMutation, useUpdateUserMutation } from "../../../domain/graphql";
import { toast } from "sonner";
import { ToastyErrorGraph } from "../../../lib/utils";
import { apolloClient } from "../../../main.config";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: Client | undefined
}
const typeDocumentsOptions: { key: string; value: string | number }[] = [
  {
    key: UserDocumentTypes.CitizenshipCard,
    value: "Cedula de ciudadania"
  },
  {
    key: UserDocumentTypes.IdentityCard,
    value: "Tarjeta de identidad"
  },
  {
    key: UserDocumentTypes.Nit,
    value: "Nit"
  },
  {
    key: UserDocumentTypes.SpecialPermissionToStay,
    value: "Permiso de permanencia espacial"
  },
]
const typeStatusOptions: { key: string; value: string | number }[] = [
  {
    key: UserStatusTypes.Active,
    value: "Activo"
  },
  {
    key: UserStatusTypes.PartlyActive,
    value: "Activo Parcial"
  },
  {
    key: UserStatusTypes.Inactive,
    value: "Inactivo"
  }
]
const EditClientModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, user }) => {
  if(!user) return null
  const [update] = useUpdateClientMutation()
  const [formData, setFormData] = useState({
    name: user?.name || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    address: user?.address || '',
    celular: user?.celular || '',
    numberDocument: user?.numberDocument || '',
    identificationType: user?.identificationType || ''
  });

  const [errors, setErrors] = useState({
    name: "",
    lastName: "",
    email: "",
    address: "",
    celular: "",
    numberDocument: "",
    identificationType: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const validateForm = () => {
    let formErrors: any = {};
    const phonePattern = /^[0-9]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name) formErrors.name = "Este campo es obligatorio";
    if (!formData.lastName) formErrors.lastName = "Este campo es obligatorio";
    if (!formData.email || !emailPattern.test(formData.email)) formErrors.email = "Correo electrónico no válido";
    if (!formData.address) formErrors.address = "Este campo es obligatorio";
    if (!formData.celular || !phonePattern.test(formData.celular)) formErrors.phoneNumber = "Número de teléfono inválido";
    if (!formData.numberDocument || !phonePattern.test(formData.numberDocument)) formErrors.identificationNumber = "Número de identificación inválido";
    if (!formData.identificationType) formErrors.identificationType = "Este campo es obligatorio";

    return formErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    const toatsId = toast.loading('Actualizando usuario..')
    try {
      const res = await update({
        variables: {
          updateInput: {
            ...formData,
            id: user.id,
            identificationType: formData.identificationType as UserDocumentTypes
          }
        }
      })
      if(res.errors){
        toast.error(res.errors[0].message);
        toast.dismiss(toatsId)
        return
      }
      toast.success('Usuario Actualizado...');
      apolloClient.cache.evict({ fieldName: "clients" })
    } catch (err) {
        ToastyErrorGraph(err as any)
    } finally {
      toast.dismiss(toatsId)
    }
    onClose(); // Cerrar el modal después de enviar
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[800px] shadow-lg max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Editar de Cliente</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">Nombres</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium">Apellidos</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium">Dirección</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="identificationNumber" className="block text-sm font-medium">Número de Identificación</label>
            <input
              type="text"
              id="identificationNumber"
              name="identificationNumber"
              value={formData.numberDocument}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.numberDocument ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {errors.numberDocument && <span className="text-red-500 text-sm">{errors.numberDocument}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="identificationType" className="block text-sm font-medium">Tipo de Identificación</label>
            <select
              id="identificationType"
              name="identificationType"
              value={formData.identificationType}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.identificationType ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            >
              <option disabled defaultChecked>Seleccione un tipo</option>
              {
                typeDocumentsOptions.map((id)=> {
                  return (
                    <option value={id.key}>{id.value}</option>
                  )
                })
              }
            </select>
            {errors.identificationType && <span className="text-red-500 text-sm">{errors.identificationType}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-sm font-medium">Teléfono</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.celular}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.celular ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {errors.celular && <span className="text-red-500 text-sm">{errors.celular}</span>}
          </div>
          {/* <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium">Estado</label>
            <select
              id="status"
              name="status"
              value={formData.identificationType}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.status ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            >
              <option disabled defaultChecked>Seleccione un estado</option>
              {
                typeStatusOptions.map((id)=> {
                  return (
                    <option value={id.key}>{id.value}</option>
                  )
                })
              }
            </select>
            {errors.status && <span className="text-red-500 text-sm">{errors.status}</span>}
          </div> */}

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
        </form>
      </div>
    </div>
  );
};

export default EditClientModal;
