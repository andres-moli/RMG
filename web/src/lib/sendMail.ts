import { toast } from "sonner";
import { axiosRest } from "../domain/api.config";

export const handleSendEmail = async (email:string, data: any, type: string,setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (!email || !data) {
      toast.error('Por favor, ingresa un correo y asegúrate de que los datos estén completos.');
      return;
    }
    try {
         setLoading(true)
        // Hacer la solicitud POST al backend
        await axiosRest.post(
        `emailDocument/send-email/${type}/${email}`, // Cambia la URL según tu endpoint
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success('Email enviado con exito')
    } catch (err) {
      toast.error('Hubo un error al enviar el email')
    } finally {
        setLoading(false)

    }
  };