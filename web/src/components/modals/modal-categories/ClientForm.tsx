import React, { useEffect, useState } from "react";
import { useFindOneByNumberPhoneLazyQuery,useFindOneByDocumentNumberLazyQuery, UserDocumentTypes  } from "../../../domain/graphql";
useFindOneByNumberPhoneLazyQuery
const typeDocumentsOptions = [
  { key: UserDocumentTypes.CitizenshipCard, value: "Cédula de ciudadanía" },
  { key: UserDocumentTypes.IdentityCard, value: "Tarjeta de identidad" },
  { key: UserDocumentTypes.Nit, value: "NIT" },
  { key: UserDocumentTypes.SpecialPermissionToStay, value: "Permiso de permanencia especial" },
];

interface ClientData {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  numberDocumento: string;
  typeNumberDocument: string;
  address: string;
}

interface ClientFormProps {
  clientData: ClientData;
  setClientData: React.Dispatch<React.SetStateAction<ClientData>>;
}

const ClientForm: React.FC<ClientFormProps> = ({ clientData, setClientData }) => {
    const [findOneClient, { loading }] = useFindOneByDocumentNumberLazyQuery();
    const [findOneClientByNumberQuery, { loading: loadingPhone }] = useFindOneByNumberPhoneLazyQuery();
  
    const handleInputChange = (name: string, value: string) => {
      setClientData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
    useEffect(() => {
      // Desplazar el scroll hacia arriba cuando el componente se monte
      window.scrollTo(0, 0);
    }, []); // Solo se ejecuta una vez cuando se monta el componente
    const findOneClientHandle = async () => {
      if (!clientData.numberDocumento.trim()) return;
  
      try {
        const { data } = await findOneClient({
          variables: { numberDocument: clientData.numberDocumento },
          fetchPolicy: "no-cache",
        });
  
        if (data?.findOneByDocumentNumber) {
          const client = data.findOneByDocumentNumber;
          setClientData({
            nombre: client.name,
            apellido: client.lastName || "",
            email: client.email,
            telefono: client.celular,
            numberDocumento: client.numberDocument,
            typeNumberDocument: client.identificationType || "",
            address: client.address || "",
          });
        } else {
          setClientData((prev) => ({
            nombre: "",
            apellido: "",
            email: "",
            telefono: prev.telefono,
            numberDocumento: prev.numberDocumento,
            typeNumberDocument: "",
            address: "",
          }));
        }
      } catch (error) {
        console.error("Error fetching client:", error);
      }
    };
  
    const findOneClientByNumber = async () => {
      if (!clientData.telefono.trim()) return;
  
      try {
        const { data } = await findOneClientByNumberQuery({
          variables: { numberPhone: clientData.telefono },
          fetchPolicy: "no-cache",
        });
  
        if (data?.findOneByNumberPhone) {
          const client = data.findOneByNumberPhone;
          setClientData({
            nombre: client.name,
            apellido: client.lastName || "",
            email: client.email,
            telefono: client.celular,
            numberDocumento: client.numberDocument,
            typeNumberDocument: client.identificationType || "",
            address: client.address || "",
          });
        } else {
          setClientData((prev) => ({
            nombre: "",
            apellido: "",
            email: "",
            telefono: prev.telefono,
            numberDocumento: prev.numberDocumento,
            typeNumberDocument: UserDocumentTypes.CitizenshipCard,
            address: "",
          }));
        }
      } catch (error) {
        console.error("Error fetching client:", error);
      }
    };
  
    return (
      <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold">Número de documento</label>
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
            type="text"
            value={clientData.numberDocumento}
            placeholder="Número de documento"
            onChange={(e) => handleInputChange("numberDocumento", e.target.value)}
            // onBlur={findOneClientHandle}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                findOneClientHandle(); // Llamar a la función cuando se presiona Enter
              }
            }}
          />
        </div>
  
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold">Celular</label>
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
            type="text"
            value={clientData.telefono}
            placeholder="Celular"
            onChange={(e) => handleInputChange("telefono", e.target.value)}
            onBlur={findOneClientByNumber}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                findOneClientByNumber(); // Llamar a la función cuando se presiona Enter
              }
            }}
          />
        </div>
  
        {(loading || loadingPhone) && (
          <div className="flex justify-center my-2">
            <span className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500"></span>
          </div>
        )}
  
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold">Tipo de documento</label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
            value={clientData.typeNumberDocument}
            onChange={(e) => handleInputChange("typeNumberDocument", e.target.value)}
          >
            <option value="">Seleccione un tipo de documento</option>
            {typeDocumentsOptions.map((option) => (
              <option key={option.key} value={option.key}>
                {option.value}
              </option>
            ))}
          </select>
        </div>
  
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold">Nombres</label>
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
            type="text"
            value={clientData.nombre}
            placeholder="Nombres"
            onChange={(e) => handleInputChange("nombre", e.target.value)}
          />
        </div>
  
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold">Apellidos</label>
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
            type="text"
            value={clientData.apellido}
            placeholder="Apellidos"
            onChange={(e) => handleInputChange("apellido", e.target.value)}
          />
        </div>
  
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold">Correo</label>
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
            type="email"
            value={clientData.email}
            placeholder="Correo"
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </div>
  
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold">Dirección</label>
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
            type="text"
            value={clientData.address}
            placeholder="Dirección"
            onChange={(e) => handleInputChange("address", e.target.value)}
          />
        </div>
      </div>
    );
  };
  
  export default ClientForm;
  
