import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
import { Alert, Share } from 'react-native';

const API_URL = 'https://4tpbvf4h-3035.use.devtunnels.ms/invoice/generate-pdf'; // Reemplaza con tu URL real

export const downloadAndShareInvoice = async (invoiceData: any) => {
  try {
    // Definir la ruta donde se guardará el PDF
    const fileUri = FileSystem.documentDirectory + `Recibo de pago n-${invoiceData.invoiceNumber}.pdf`;

    // Hacer la petición al backend para obtener el PDF
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invoiceData),
    });

    if (!response.ok) {
      throw new Error("Error al generar el PDF");
    }

    // Convertir la respuesta en un blob
    const pdfData = await response.blob();
    const reader = new FileReader();

    reader.readAsDataURL(pdfData);
    reader.onloadend = async () => {
      const base64data = reader.result?.split(',')[1];
      if (base64data) {
        // Guardar el archivo en el dispositivo
        await FileSystem.writeAsStringAsync(fileUri, base64data, { encoding: FileSystem.EncodingType.Base64 });

        await Share.share({
        url: fileUri,
        message: `Recibo de pago #${invoiceData.invoiceNumber}`,
        });
      }
    };

  } catch (error) {
    console.log("Error al descargar la factura:", error);
    Alert.alert("Error", "No se pudo descargar la factura");
  }
};
