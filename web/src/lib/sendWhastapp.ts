import { toast } from "sonner";
import { axiosRest } from "../domain/api.config";

export const handleSendWhastapp = async (whastapp:string, data: any, type: string,setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (!whastapp || !data) {
      toast.error('Por favor, ingresa un numero y asegúrate de que los datos estén completos.');
      return;
    }
    try {
      const mesaje = prompt('Escriba un mensaje corto, para enviar al whastapp')
      if(mesaje === null) return
      // Hacer la solicitud POST al backend
      setLoading(true)
        await axiosRest.post(
        `emailDocument/send-whastapp/${type}/${whastapp}/${mesaje.trim() === '' ? 'NA' : mesaje}`, // Cambia la URL según tu endpoint
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success('whastapp enviado con exito')
    } catch (err) {
      toast.error('Hubo un error al enviar el whastapp')
    } finally {
        setLoading(false)

    }
  };