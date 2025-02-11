import React, { useState } from "react";
import { Products, useCreateProductMutation, useUpdateProductMutation } from "../../../domain/graphql";
import { toast } from "sonner";
import { formatCurrency, ToastyErrorGraph } from "../../../lib/utils";
import { apolloClient } from "../../../main.config";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Products | undefined
}
const EditModalProducts: React.FC<RegisterModalProps> = ({ isOpen, onClose, product }) => {
  if(!product) return
  const [updateProdcut] = useUpdateProductMutation()
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    salePrice: product.salePrice,
    costPrice: product.costPrice,
    minStock: product.minStock,
  });
  const [isActive,setIsAvtive] = useState(product.isActive)

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    salePrice: "",
    costPrice: "",
    minStock: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
  
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) || 0  : value,
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
    if (!formData.costPrice) formErrors.costPrice = "Este campo es obligatorio";
    if (!formData.minStock) formErrors.minStock = "Correo electrónico no válido";
    if (!formData.salePrice) formErrors.salePrice = "Este campo es obligatorio";

    return formErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    const toatsId = toast.loading('Actualizando producto..')
    try {
      const res = await updateProdcut({
        variables: {
          updateInput: {
            ...formData,
            isActive: isActive,
            id: product.id
          }
        }
      })
      if(res.errors){
        toast.error(res.errors[0].message);
        toast.dismiss(toatsId)
        return
      }
      toast.success('Producto actualizado.');
      apolloClient.cache.evict({ fieldName: "Products" })
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
        <h2 className="text-2xl font-bold mb-4">Actulizar de productos</h2>
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

          <div className="mb-4">
            <label htmlFor="salePrice" className="block text-sm font-medium">{`Precio de venta [${formatCurrency(formData.salePrice)}]`}</label>
            <input
              type="number"
              id="salePrice"
              name="salePrice"
              value={formData.salePrice}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.salePrice ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {errors.salePrice && <span className="text-red-500 text-sm">{errors.salePrice}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="costPrice" className="block text-sm font-medium">{`Precio de costo [${formatCurrency(formData.costPrice)}]`}</label>
            <input
              type="number"
              id="costPrice"
              name="costPrice"
              value={formData.costPrice}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.costPrice ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {errors.costPrice && <span className="text-red-500 text-sm">{errors.costPrice}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="minStock" className="block text-sm font-medium">Minimo en stock</label>
            <input
              type="number"
              id="minStock"
              name="minStock"
              value={formData.minStock}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.minStock ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {errors.minStock && <span className="text-red-500 text-sm">{errors.minStock}</span>}
          </div>
          <div className="flex space-x-4">
            <label htmlFor="stock" className="block text-sm font-medium">stock</label>
            <input
              type="text"
              id="stock"
              disabled
              name="stock"
              value={product.stock.stock}
              className={`mt-1 block w-1/4 p-2 border border-gray-300 rounded-md`}
            />
            <label htmlFor="entrada" className="block text-sm font-medium">Entrada</label>
            <input
              type="text"
              disabled
              id="entrada"
              name="entrada"
              value={product.stock.entrada_producto}
              className={`mt-1 block w-1/4 p-2 border border-gray-300 rounded-md`}
            />
            <label htmlFor="salida" className="block text-sm font-medium">Salida</label>
            <input
              type="text"
              id="salida"
              disabled
              name="salida"
              value={product.stock.salida_producto}
              className={`mt-1 block w-1/4 p-2 border border-gray-300 rounded-md`}
            />
          </div>
          <div className="mb-4">
            <input
              type="checkbox"
              checked={isActive}
              onChange={()=> setIsAvtive((prev)=> !prev)}
              className="mr-2"
            />
            <span>Activo</span>
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
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModalProducts;
