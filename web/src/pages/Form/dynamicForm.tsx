import React, { useState } from "react";
import { FieldTypeEnum, RepairField } from "../../domain/graphql";



interface DynamicFormProps {
  fields: RepairField[];
  formValues: { [key: string]: string | File  };
  errors: { [key: string]: string };
  handleChange: (id: string, value: string | File) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ fields, formValues, errors, handleChange }) => {
  const MAX_FILE_SIZE_MB = 3;
  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

  const isValidFileSize = (size?: number) => size !== undefined && size <= MAX_FILE_SIZE_BYTES;
  const isValidImage = (file: File) => ["image/png", "image/jpg", "image/jpeg"].includes(file.type);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, fieldId: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!isValidImage(file)) {
      alert("Solo se permiten imágenes en formato PNG, JPG o JPEG.");
      return;
    }

    if (!isValidFileSize(file.size)) {
      alert(`El archivo no debe superar los ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }

    handleChange(fieldId, file);
  };

  return (
    <form className="space-y-4">
      {fields.map((field) => {
        const value = formValues[field.id] || "";
        const error = errors[field.id];

        switch (field.type) {
          case FieldTypeEnum.Text:
            return (
              <div key={field.id} className="flex flex-col">
                <label className="text-gray-700">{field.name} {field.isRequired && <span className="text-red-500">*</span>}</label>
                <input
                  type="text"
                  className={`border p-2 rounded-md ${error ? "border-red-500" : "border-gray-300"}`}
                  placeholder={field.name}
                  value={value}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                />
              </div>
            );

          case FieldTypeEnum.Number:
            return (
              <div key={field.id} className="flex flex-col">
                <label className="text-gray-700">{field.name} {field.isRequired && <span className="text-red-500">*</span>}</label>
                <input
                  type="number"
                  className={`border p-2 rounded-md ${error ? "border-red-500" : "border-gray-300"}`}
                  placeholder={field.name}
                  value={value}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                />
                {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}
              </div>
            );

          case FieldTypeEnum.LongText:
            return (
              <div key={field.id} className="flex flex-col">
                <label className="text-gray-700">{field.name} {field.isRequired && <span className="text-red-500">*</span>}</label>
                <textarea
                  className={`border p-2 rounded-md ${error ? "border-red-500" : "border-gray-300"}`}
                  placeholder={field.name}
                  value={value}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  rows={4}
                />
              </div>
            );

          case FieldTypeEnum.Date:
            console.log(value)
            return (
              <div key={field.id} className="flex flex-col">
                <label className="text-gray-700">{field.name} {field.isRequired && <span className="text-red-500">*</span>}</label>
                <input
                  type="date"
                  className={`border p-2 rounded-md ${error ? "border-red-500" : "border-gray-300"}`}
                  value={value && typeof value === 'string' ? value.split('T')[0] : ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                />
              </div>
            );

          case FieldTypeEnum.Image:
            return (
              <div key={field.id} className="flex flex-col">
                <label className="text-gray-700">{field.name} {field.isRequired && <span className="text-red-500">*</span>}</label>
                <img src={value} />
                <input
                  type="file"
                  accept="image/png, image/jpg, image/jpeg"
                  className="border p-2 rounded-md"
                  onChange={(e) => handleImageUpload(e, field.id)}
                />
              </div>
            );

        case FieldTypeEnum.Selector:
          return (
            <div key={field.id} className="flex flex-col">
              <label className="text-gray-700">{field.name} {field.isRequired && <span className="text-red-500">*</span>}</label>
              <select
                className={`border p-2 rounded-md ${error ? "border-red-500" : "border-gray-300"}`}
                value={value}
                onChange={(e) => handleChange(field.id, e.target.value)}
              >
                <option value="">Selecciona una opción</option>
                {field.selectorOptions?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.value}
                  </option>
                ))}
              </select>
            </div>
          );
          default:
            return null;
        }
      })}
    </form>
  );
};

export default DynamicForm;
