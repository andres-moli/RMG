import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { CustomFieldValue, FieldTypeEnum, OrderTypes, RepairField, useOrderRepairsTypeQuery } from "../../../domain/graphql";
import mime from "mime";

const RepairDetailsForm = forwardRef(({ onSubmit }: { onSubmit: (data: any) => void }, ref: any) => {
  const [selectTypeRepair, setSelectTypeRepair] = useState<string | undefined>();
  const [fields, setFields] = useState<RepairField[]>([]);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data, loading } = useOrderRepairsTypeQuery({
    variables: {
      orderBy: {
        createdAt: OrderTypes.Desc,
      },
      pagination: {
        skip: 0,
        take: 999999,
      },
    },
  });

  const repairsType = data?.orderRepairsType.filter((type) => type.status) || [];
  const options = repairsType.map((repair) => ({
    key: repair.id,
    value: repair.name,
  }));

  useEffect(() => {
    if (selectTypeRepair) {
      const selectedRepair = repairsType.find((repair) => repair.id === selectTypeRepair);
      setFields(selectedRepair?.fields || []);
    }
  }, [selectTypeRepair, repairsType]);

  const handleChange = (fieldId: string, value: any, isFile = false) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      if (field.isRequired && !formValues[field.id]) {
        valid = false;
        newErrors[field.id] = `${field.name} es obligatorio.`;
      }
    });

    setErrors(newErrors);
    return valid;
  };

  useImperativeHandle(ref, () => ({
    handleSubmit: () => {
      if (validateForm()) {
        const fieldValues = fields.map((field) => {
          const value = formValues[field.id];
          if (field.type === FieldTypeEnum.Number) {
            return { fieldId: field.id, valorNumerico: parseInt(value, 10) };
          }
          if (field.type === FieldTypeEnum.Date) {
            return { fieldId: field.id, valorFecha: value };
          }
          if (field.type === FieldTypeEnum.LongText) {
            return { fieldId: field.id, valorTextoLargo: value };
          }
          if (field.type === FieldTypeEnum.Image) {
            return { fieldId: field.id, valorFotoId: value };
          }
          return { fieldId: field.id, valorTexto: value };
        });

        onSubmit({
          repairTypeId: selectTypeRepair,
          fieldValues: fieldValues,
        });
      }
    },
  }));

  return (
    <div style={styles.pageContainer}>
      <div style={styles.cardContainer}>
        {loading ? (
          <p>Cargando servicios...</p>
        ) : (
          <div style={styles.inputContainer}>
            <label>Seleccione un tipo de reparación:</label>
            <select
              value={selectTypeRepair || ""}
              onChange={(e) => setSelectTypeRepair(e.target.value)}
              style={styles.select}
            >
              <option value="">Seleccione...</option>
              {options.map((opt) => (
                <option key={opt.key} value={opt.key}>
                  {opt.value}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Campos dinámicos */}
        {fields.length > 0 &&
          fields.map((field) => (
            <div key={field.id} style={styles.inputContainer}>
              {field.type === FieldTypeEnum.Text && (
                <input
                  type="text"
                  placeholder={field.name}
                  value={formValues[field.id] || ""}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  style={{ borderColor: errors[field.id] ? "red" : "#ccc" }}
                />
              )}

              {field.type === FieldTypeEnum.Number && (
                <input
                  type="number"
                  placeholder={field.name}
                  value={formValues[field.id] || ""}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  style={{ borderColor: errors[field.id] ? "red" : "#ccc" }}
                />
              )}

              {field.type === FieldTypeEnum.LongText && (
                <textarea
                  placeholder={field.name}
                  value={formValues[field.id] || ""}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  rows={4}
                  style={{ borderColor: errors[field.id] ? "red" : "#ccc" }}
                />
              )}

              {field.type === FieldTypeEnum.Date && (
                <input
                  type="date"
                  value={formValues[field.id] || ""}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                />
              )}

              {field.type === FieldTypeEnum.Image && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleChange(field.id, e.target.files[0], true);
                    }
                  }}
                />
              )}
              {
                field.type === FieldTypeEnum.Selector && (
                  <>
                  <label className="text-gray-700">{field.name} {field.isRequired && <span className="text-red-500">*</span>}</label>
                  <select
                    className={`border p-2 rounded-md border-gray-300`}
                    value={formValues[field.id] || ""}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                  >
                    <option value="">Selecciona una opción</option>
                    {field.selectorOptions?.map((option) => (
                      <option key={option.id} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </select>
                  </>
                )
              }

              {errors[field.id] && <p style={{ color: "red" }}>{errors[field.id]}</p>}
            </div>
          ))}
      </div>
    </div>
  );
});

const styles = {
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start", // Cambiado de 'center' a 'flex-start' para mover el contenido hacia arriba
    minHeight: "100vh",
    paddingTop: "40px", // Añadimos un espacio superior
    backgroundColor: "#f5f5f5",
  },
  cardContainer: {
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    padding: "40px",
    width: "95%", // Aumentamos el ancho a un 95% para que ocupe más espacio
    maxWidth: "1000px", // Aumentamos el límite máximo de ancho
  },
  inputContainer: {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column" as "column",
  },
  select: {
    padding: "12px 16px",
    marginTop: "8px",
    marginBottom: "12px",
    borderColor: "#ccc",
    borderRadius: "8px",
  },
};

export default RepairDetailsForm;


