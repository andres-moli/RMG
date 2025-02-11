import React, { useState } from "react";
import { FieldTypeEnum, RepairField, useCreateOrderRepairTypeMutation } from "../../../domain/graphql";
import { toast } from "sonner";
import { ToastyErrorGraph } from "../../../lib/utils";
import { apolloClient } from "../../../main.config";
import DynamicForm from "../../Form/dynamicForm";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterServiceModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const [fields, setFields] = useState<RepairField[]>([]);
  const [formValues, setFormValues] = useState<{ [key: string]: string | File }>({});
  const [newFieldName, setNewFieldName] = useState("");
  const [newFieldType, setNewFieldType] = useState<FieldTypeEnum>(FieldTypeEnum.Text);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isRequired, setIsRequired] = useState(false); // Estado para "Requerido"
  const [minValue, setMinValue] = useState<number>(); // Estado para "Min"
  const [maxValue, setMaxValue] = useState<number>(); // Estado para "Max"
  const [createOrderRepair] = useCreateOrderRepairTypeMutation();
  const [formData, setFormData] = useState({ name: "", costEstimate: 0 });
  const [errors, setErrors] = useState({ name: "", costEstimate: "" });
  const [selectorOptions, setSelectorOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState("");
  
  const addOption = () => {
    if (newOption.trim()) {
      setSelectorOptions([...selectorOptions, newOption.trim()]);
      setNewOption("");
    }
  };
  
  const removeOption = (index: number) => {
    setSelectorOptions(selectorOptions.filter((_, i) => i !== index));
  };
  
  const handleChangeField = (id: string, value: string | File) => {
    setFormValues({ ...formValues, [id]: value });
  };

  const addOrEditField = () => {
    if (!newFieldName.trim()) return;
    const Options = newFieldType === FieldTypeEnum.Selector ? selectorOptions.map((x)=>{
      return {
        value: x
      }
    }) : undefined
    const newField: RepairField = {
      name: newFieldName,
      type: newFieldType,
      isRequired: isRequired,
      minLength: minValue || undefined, // Solo se establece si el valor no es vacío
      maxLength: maxValue || undefined, // Solo se establece si el valor no es vacío
      selectorOptions: Options 
    };

    if (editIndex !== null) {
      // Editar campo existente
      const updatedFields = [...fields];
      updatedFields[editIndex] = newField;
      setFields(updatedFields);
      setEditIndex(null);
    } else {
      // Agregar nuevo campo
      setFields([...fields, newField]);
    }

    setNewFieldName("");
    setMinValue(undefined);
    setMaxValue(undefined);
    setSelectorOptions([])
    setIsRequired(false); // Resetear
  };

  const deleteField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const startEditField = (index: number) => {
    setNewFieldName(fields[index].name);
    setNewFieldType(fields[index].type);
    setEditIndex(index);
  };

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
    const toastId = toast.loading("Creando servicio...");
    try {
      const res = await createOrderRepair({
        variables: { createInput: { ...formData, costEstimate: Number(formData.costEstimate) ,fields: fields } }
      });

      if (res.errors) {
        toast.error(res.errors[0].message);
        toast.dismiss(toastId);
        return;
      }

      toast.success("Servicio creado con éxito.");
      apolloClient.cache.evict({ fieldName: "OrderRepairsType" });
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
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

        {/* Agregar / Editar Campo */}
        <div className="border p-4 rounded-md shadow-md mt-4">
          <h2 className="text-lg font-semibold mb-2">{editIndex !== null ? "Editar Campo" : "Añadir Campo"}</h2>
          <input
            type="text"
            placeholder="Nombre del campo"
            value={newFieldName}
            onChange={(e) => setNewFieldName(e.target.value)}
            className="border p-2 rounded-md w-full mb-2"
          />
          <select
            value={newFieldType}
            onChange={(e) => setNewFieldType(e.target.value as FieldTypeEnum)}
            className="border p-2 rounded-md w-full mb-2"
          >
            {Object.values(FieldTypeEnum).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <div className="flex flex-col space-y-2 mb-4">
            {newFieldType === FieldTypeEnum.Selector && (
              <div>
                <h3 className="text-md font-medium">Opciones del Selector</h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    placeholder="Nueva opción"
                    className="border p-2 rounded-md w-full"
                  />
                  <button onClick={addOption} className="bg-green-500 text-white px-4 py-2 rounded-md">
                    Agregar
                  </button>
                </div>
                <ul className="mt-2 space-y-1">
                  {selectorOptions.map((option, index) => (
                    <li key={index} className="flex justify-between items-center bg-gray-200 p-2 rounded-md">
                      <span>{option}</span>
                      <button
                        onClick={() => removeOption(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

        <div className="flex space-x-4 mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isRequired}
              onChange={() => setIsRequired(!isRequired)}
              className="mr-2"
            />
            <span>Requerido</span>
          </div>
          <div className="flex items-center">
            <input
              type="number"
              value={minValue}
              onChange={(e) => setMinValue(e.target.value ? parseInt(e.target.value) : "")}
              className="border p-2 rounded-md"
              placeholder="Min"
            />
            <span className="ml-2">-</span>
            <input
              type="number"
              value={maxValue}
              onChange={(e) => setMaxValue(e.target.value ? parseInt(e.target.value) : "")}
              className="border p-2 rounded-md ml-2"
              placeholder="Max"
            />
          </div>
        </div>
          <button
            onClick={addOrEditField}
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
          >
            {editIndex !== null ? "Actualizar Campo" : "Agregar Campo"}
          </button>
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Campos Agregados</h2>
          {fields.length === 0 ? (
            <p className="text-gray-500">No hay campos aún.</p>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="fieldsList">
                {(provided) => (
                  <ul {...provided.droppableProps} ref={provided.innerRef} className="border p-4 rounded-md shadow-md">
                    {fields.map((field, index) => (
                      <Draggable key={index} draggableId={index.toString()} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="flex justify-between items-center p-2 border-b cursor-pointer bg-gray-100 hover:bg-gray-200"
                          >
                            <span>{field.name} ({field.type})</span>
                            <div className="flex space-x-2">
                              <button onClick={() => startEditField(index)} className="text-yellow-500">Editar</button>
                              <button onClick={() => deleteField(index)} className="text-red-500">Eliminar</button>
                            </div>
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>


        {/* Vista previa */}
        <h2 className="text-lg font-semibold mt-4">Formulario en tiempo real</h2>
        <DynamicForm fields={fields} errors={{}} formValues={formValues} handleChange={handleChangeField} />

        {/* Botones */}
        <div className="flex justify-end space-x-4 mt-6">
          <button onClick={onClose} className="bg-red-500 text-white px-6 py-3 rounded-md text-lg">Cancelar</button>
          <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg" onClick={handleSubmit}>
            Registrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterServiceModal;
