import axios from "axios";
import { API_URL_REST } from "../graphql/client";
import { Alert } from "react-native";

export const handleSendEmail = async (email:string, data: any, type: string,setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (!email || !data) {
      Alert.alert('Por favor, ingresa un correo y asegúrate de que los datos estén completos.');
      return;
    }
    try {
         setLoading(true)
        // Hacer la solicitud POST al backend
        await axios.post(
        API_URL_REST + `emailDocument/send-email/${type}/${email}`, // Cambia la URL según tu endpoint
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      Alert.alert('Email enviado con exito')
    } catch (err) {
      Alert.alert('Hubo un error al enviar el email')
    } finally {
        setLoading(false)

    }
  };