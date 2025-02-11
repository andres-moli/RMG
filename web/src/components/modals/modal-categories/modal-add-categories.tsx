import React, { useState, useRef, useEffect } from "react";
import MainLayout from "../../../layouts/mainLayouts/mainLayouts";
import Card from "../../cards/Card";
import ClientForm from "./ClientForm";
import RepairDetailsForm from "./RepairDetailsForm";
import GenerateQR from "./GenerateQR";
import { useCreateOrderRepairFullMutation, UserDocumentTypes } from "../../../domain/graphql";
import { ToastyErrorGraph } from "../../../lib/utils";
import { toast } from "sonner";
import handleUploadImage from "../../../lib/uptloadFile";
import { Navigate } from "react-router-dom";

const StepProgressPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const totalSteps = 3;

  const [clientData, setClientData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    numberDocumento: "",
    typeNumberDocument: UserDocumentTypes.CitizenshipCard,
    address: "",
  });

  const [repairData, setRepairData] = useState<any>(null);
  const [qr, setQr] = useState<string>();
  const repairDetailsRef = useRef<any>(null);
  const [createFull] = useCreateOrderRepairFullMutation()

  useEffect(() => {
    setNextDisabled(
      !!(clientData.nombre && clientData.apellido  && clientData.telefono)
    );
  }, [clientData]);

  const handleNext = () => {
    if (repairDetailsRef.current && step === 2) {
      const confirmFinish = window.confirm("¿Estás seguro de que quieres terminar?");
      if (confirmFinish) {
        repairDetailsRef.current.handleSubmit();
      }
      return;
    }
    setStep((prevStep) => Math.min(prevStep + 1, totalSteps));
  };

  const handlePrevious = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleRepairDataSubmit = async (data: any) => {
    setRepairData(data);
    setLoading(true);
    const fieldFile = await Promise.all(data.fieldValues.map(async(x) => {
      if(x.valorFotoId){
        const data = await handleUploadImage(x.valorFotoId);


        if(!data){
          throw Error('Hubo un error al subir de archivo')
        }
        return {
          fieldId: x.fieldId,
          valorFotoId: data?.id
        }
      }
      return {
        ...x
      }
    }))
    try {
      const res = await createFull({
        variables: {
          createOrderRepairFullInput: {
            client: {
              celular: clientData.telefono,
              identificationType: clientData.typeNumberDocument as UserDocumentTypes,
              lastName: clientData.apellido,
              name: clientData.nombre,
              numberDocument: clientData.numberDocumento,
              address: clientData.address,
              email: clientData.email
            },
            repairTypeId: data.repairTypeId,
            fieldValues: fieldFile
          }
        }
      })
      if(res.errors){
        ToastyErrorGraph(res.errors)
        return
      }
      setQr(res.data?.createOrderRepairFull);
      toast.success('Proceso termino con exito')
      setStep((prevStep) => Math.min(prevStep + 1, totalSteps));
    }catch (err) {
      ToastyErrorGraph(err as any)
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <Card className="w-full">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Proceso de Reparación</h1>
        </Card>

        {/* Barra de progreso (siempre visible en la parte superior) */}
        <Card className="top-0 z-10 bg-white p-4 shadow">
          <div className="flex justify-between mb-4">
            {["Cliente", "Reparación", "QR"].map((label, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${
                    step > index ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  {index + 1}
                </div>
                <p className="text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Contenedor del contenido desplazable */}
        {/* <Card className="p-4 space-y-4 max-h-[80vh] overflow-y-auto">

        </Card> */}
        {step === 1 && <ClientForm clientData={clientData} setClientData={setClientData} />}
        {step === 2 && <RepairDetailsForm onSubmit={handleRepairDataSubmit} ref={repairDetailsRef} />}
        {step === 3 && <GenerateQR base64QR={qr} />}

        {/* Botones de navegación */}
        <div className="flex justify-between p-4">
          {step > 1 && step < 3 && (
            <button
              onClick={handlePrevious}
              className="bg-gray-300 text-black px-4 py-2 rounded-md"
            >
              Atrás
            </button>
          )}
          {step < totalSteps ? (
            <button
              disabled={!nextDisabled || loading}
              onClick={handleNext}
              className={`px-4 py-2 rounded-md ${
                !nextDisabled || loading ? "bg-gray-400" : "bg-blue-500 text-white"
              }`}
            >
              {loading ? "Cargando..." : "Siguiente"}
            </button>
          ) : (
            <a href="/repair" className="bg-green-500 text-white px-4 py-2 rounded-md">
              Terminar
            </a>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default StepProgressPage;
