import React, { useState } from "react";
import { CategoryExpenses, CountExpenses, StatusCategoryExpenses, StatusCountExpenses, useCreateCategoryExpenseMutation, useCreateProductMutation, useUpdateCategoryExpenseMutation, useUpdateCountExpenseMutation } from "../../../domain/graphql";
import { toast } from "sonner";
import { formatCurrency, ToastyErrorGraph } from "../../../lib/utils";
import { apolloClient } from "../../../main.config";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: CountExpenses | undefined
}
const EditModalCategory: React.FC<RegisterModalProps> = ({ isOpen, onClose, category }) => {
  if(!category) return
  const [update] = useUpdateCountExpenseMutation()
  const [formData, setFormData] = useState({
    name: category.name,
    description: category.description,
    status: category.status,
    numberCount: category.numberCount,
    nameBank: category.nameBank
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    numberCount: "",
    nameBank: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
  
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) || 0 : value, // Convertir a número si es input de tipo number
    }));
  
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };
  

  const validateForm = () => {
    let formErrors: any = {};
    if (!formData.name) formErrors.name = "Este campo es obligatorio";
    return formErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    const toatsId = toast.loading('Actualizando cuenta de gasto..')
    try {
      const res = await update({
        variables: {
          updateInput: {
            ...formData,
            id: category.id
          }
        }
      })
      if(res.errors){
        toast.error(res.errors[0].message);
        toast.dismiss(toatsId)
        return
      }
      toast.success('cuenta de gasto actualizada...');
      apolloClient.cache.evict({ fieldName: "CountExpenses" })
    } catch (err) {
        ToastyErrorGraph(err as any)
    } finally {
      toast.dismiss(toatsId)
    }
    onClose(); // Cerrar el modal después de enviar
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[800px] shadow-lg max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Registro de categoria gasto</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">Nombre</label>
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
            <label htmlFor="numberCount" className="block text-sm font-medium">Numero cuenta</label>
            <input
              type="text"
              id="numberCount"
              name="numberCount"
              value={formData.numberCount}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.numberCount ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {errors.numberCount && <span className="text-red-500 text-sm">{errors.numberCount}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="nameBank" className="block text-sm font-medium">Banco</label>
            <input
              type="text"
              id="nameBank"
              name="nameBank"
              value={formData.nameBank}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.nameBank ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {errors.nameBank && <span className="text-red-500 text-sm">{errors.nameBank}</span>}
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium">Estado</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md`}
            >
              <option disabled selected value={''}>Seleccione un tipo</option>
              {
                Object.values(StatusCountExpenses).map((id)=> {
                  return (
                    <option value={id}>{id}</option>
                  )
                })
              }
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium">Descripcion</label>
            <textarea
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`mt-1 block w-full p-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
          </div>

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

export default EditModalCategory;
