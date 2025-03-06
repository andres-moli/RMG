import React, { useState } from "react";
import { FieldTypeEnum, RepairField, RepairType, useCreateOrderRepairTypeMutation, useUpdateOrderRepairTypeMutation } from "../../../domain/graphql";
import { toast } from "sonner";
import { ToastyErrorGraph } from "../../../lib/utils";
import { apolloClient } from "../../../main.config";
import DynamicForm from "../../Form/dynamicForm";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: RepairType | undefined 
}

const UpdateRegisterService: React.FC<RegisterModalProps> = ({ isOpen, onClose, service }) => {
  if(!service) return
  const [fields, setFields] = useState<RepairField[]>(service.fields || []);
  const [updateOrderTypeUpdate] = useUpdateOrderRepairTypeMutation();
  const [formData, setFormData] = useState({ name:service.name, costEstimate: service.costEstimate});
  const [errors, setErrors] = useState({ name: "", costEstimate: "" });
  const [active, setActive] = useState(service.status); // Estado para "Requerido"
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let formErrors: any = {};
    if (!formData.name) formErrors.name = "Este campo es obligatorio";
    if (!formData.costEstimate) formErrors.costEstimate = "Este campo es obligatorio";
    return formErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    const toastId = toast.loading("Actualizando servicio...");
    try {
      const res = await updateOrderTypeUpdate(
        {
          variables: {
            updateInput: { 
              ...formData,
              costEstimate: Number(formData.costEstimate),
              id: service.id,
              status: active || false
            } 
          }
        }
      );

      if (res.errors) {
        toast.error(res.errors[0].message);
        toast.dismiss(toastId);
        return;
      }

      toast.success("Servicio actualizado con éxito.");
      apolloClient.cache.evict({ fieldName: "orderRepairsType" });
      setFields([])
    } catch (err) {
      ToastyErrorGraph(err as any);
    } finally {
      toast.dismiss(toastId);
    }

    setFormData({ name: "", costEstimate: 0 });
    onClose();
  };
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const reorderedFields = Array.from(fields);
    const [movedItem] = reorderedFields.splice(result.source.index, 1);
    reorderedFields.splice(result.destination.index, 0, movedItem);
    setFields(reorderedFields);
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[1000px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Registrar Servicio</h2>

        {/* Nombre del Servicio */}
        <div>
          <label className="block text-lg font-medium">Nombre del servicio</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-2 block w-full p-3 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-md text-lg`}
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
        </div>

        {/* Valor del Servicio */}
        <div>
          <label className="block text-lg font-medium">Valor del servicio</label>
          <input
            type="number"
            name="costEstimate"
            value={formData.costEstimate}
            onChange={handleChange}
            className={`mt-2 block w-full p-3 border ${errors.costEstimate ? "border-red-500" : "border-gray-300"} rounded-md text-lg`}
          />
          {errors.costEstimate && <span className="text-red-500 text-sm">{errors.costEstimate}</span>}
        </div>
        <input
          type="checkbox"
          checked={active}
          onChange={() => setActive(!active)}
          className="mr-2"
        />
        <span>Activo o inactivo</span>

        {/* Vista previa */}
        {/* <h2 className="text-lg font-semibold mt-4">Formulario en tiempo real</h2>
        <DynamicForm fields={fields} errors={{}} formValues={formValues} handleChange={handleChangeField} /> */}

        {/* Botones */}
        <div className="flex justify-end space-x-4 mt-6">
          <button onClick={onClose} className="bg-red-500 text-white px-6 py-3 rounded-md text-lg">Cancelar</button>
          <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg" onClick={handleSubmit}>
            Actualizar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateRegisterService;
