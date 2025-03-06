import React, { useState } from "react";
import { Products, useCreateProductInflowMutation } from "../../../domain/graphql";
import { toast } from "sonner";
import { ToastyErrorGraph } from "../../../lib/utils";
import { apolloClient } from "../../../main.config";
import SelectProduct from "../../SelectFind/select-product";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModalProductsEntry: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const [createUser] = useCreateProductInflowMutation();

  // Estado del formulario
  const [formData, setFormData] = useState({
    quantity: 0,
    description: "",
    inflowDate: new Date().toISOString().split("T")[0], // Fecha en formato YYYY-MM-DD
  });

  // Estado del producto seleccionado
  const [selectedProduct, setSelectedProduct] = useState<Products | null>(null);

  // Estado de errores
  const [errors, setErrors] = useState({
    quantity: "",
    description: "",
    inflowDate: "",
    selectedProduct: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) || 0 : value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleSelectProduct = (product: Products) => {
    setSelectedProduct(product);
    setErrors((prevErrors) => ({ ...prevErrors, selectedProduct: "" })); // Limpiar error si existía
  };

  const validateForm = () => {
    let formErrors: Record<string, string> = {};

    if (!selectedProduct) formErrors.selectedProduct = "Debe seleccionar un producto.";
    if (!formData.quantity) formErrors.quantity = "Este campo es obligatorio.";
    if (!formData.inflowDate) formErrors.inflowDate = "Este campo es obligatorio.";

    return formErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!selectedProduct){
      toast.info('Debes selecionar un producto')
      return
    }
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const toastId = toast.loading("Creando entrada producto...");
    try {
      const res = await createUser({
        variables: {
          createInput: {
            ...formData,
            productId: selectedProduct?.id, // Enviar el ID del producto
          },
        },
      });

      if (res.errors) {
        toast.error(res.errors[0].message);
        toast.dismiss(toastId);
        return;
      }

      toast.success("Producto creado correctamente.");
      apolloClient.cache.evict({ fieldName: "ProductsInflows" });
    } catch (err) {
      ToastyErrorGraph(err as any);
    } finally {
      toast.dismiss(toastId);
    }

    onClose(); // Cerrar el modal después de enviar
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[800px] shadow-lg max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Entrada de productos</h2>
        <form onSubmit={handleSubmit}>
          {/* Selector de Producto */}
          <div className="mb-4">
            <SelectProduct onSelect={handleSelectProduct} />
            {errors.selectedProduct && <span className="text-red-500 text-sm">{errors.selectedProduct}</span>}
          </div>

          {/* Cantidad */}
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-sm font-medium">{`Cantidad a ingresar`}</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.quantity ? "border-red-500" : "border-gray-300"} rounded-md`}
            />
            {errors.quantity && <span className="text-red-500 text-sm">{errors.quantity}</span>}
          </div>

          {/* Fecha de entrada */}
          <div className="mb-4">
            <label htmlFor="inflowDate" className="block text-sm font-medium">{`Fecha de entrada`}</label>
            <input
              type="date"
              id="inflowDate"
              name="inflowDate"
              value={formData.inflowDate}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.inflowDate ? "border-red-500" : "border-gray-300"} rounded-md`}
            />
            {errors.inflowDate && <span className="text-red-500 text-sm">{errors.inflowDate}</span>}
          </div>

          {/* Descripción */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.description ? "border-red-500" : "border-gray-300"} rounded-md`}
            />
            {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
          </div>

          {/* Botones */}
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

export default RegisterModalProductsEntry;
