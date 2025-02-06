import { FileInfo } from '../graphql/generated/graphql';
import axios from "axios";
import * as ImageManipulator from 'expo-image-manipulator';

const compressImage = async (uri: string) => {
  const result = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 800 } }], // Redimensionar a 800px de ancho
    { compress: 0.3, format: ImageManipulator.SaveFormat.JPEG } // Comprimir al 70%
  );
  return result.uri;
};
// Función para subir el archivo
const handleUploadImage = async (file: any) => {
  try {
    const url = `https://4tpbvf4h-3035.use.devtunnels.ms/attachment/files`;
    const formData = new FormData();
    formData.append('file', {
      uri: await compressImage(file.uri),
      ...file,
    });
    console.log(formData)

    const response = await axios.post<FileInfo>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Transfer-Encoding': 'chunked',
      },
      timeout: 60000, // Aumentar el tiempo de espera si es necesario
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent?.total || 0);
        console.log(`Subida: ${percentCompleted}%`);
      },
    });
    return response?.data;
  } catch (error) {
    console.log('Error subiendo imagen:', error);
  }
};


export default handleUploadImage;
