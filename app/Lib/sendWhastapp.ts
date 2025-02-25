import axios from "axios";
import { Alert } from "react-native";
import { API_URL_REST } from "../graphql/client";
import Prompt from "react-native-prompt-android"; // Importar la biblioteca

export const handleSendWhastapp = async (
  whastapp: string,
  data: any,
  type: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (!whastapp || !data) {
    Alert.alert("Por favor, ingresa un número y asegúrate de que los datos estén completos.");
    return;
  }

  try {
    // Mostrar el prompt para capturar el mensaje
    setLoading(true);
    await axios.post(
      `${API_URL_REST}emailDocument/send-whastapp/${type}/${whastapp}/NA`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setLoading(false);
    Alert.alert("WhatsApp enviado con éxito");
  } catch (err) {
    Alert.alert("Hubo un error al enviar el WhatsApp");
  } finally {
    setLoading(false);
  }
};