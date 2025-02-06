import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Share, Platform } from 'react-native';
import * as Print from 'expo-print';
import { useColor } from '../../Constants/Color';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
const { color } = useColor();

interface GenerateQRProps {
  base64QR?: string; // Recibe el QR en base64
}

const GenerateQR: React.FC<GenerateQRProps> = ({ base64QR }) => {
  // Función para compartir el QR
  const shareQR = async () => {
    if (!base64QR) return;
  
    try {
      // Verifica si el Base64 tiene el prefijo correcto
      const base64Data = base64QR.startsWith('data:image/png;base64,')
        ? base64QR.replace('data:image/png;base64,', '')
        : base64QR;
  
      // Define la ruta del archivo temporal
      const fileUri = FileSystem.cacheDirectory + 'qr.png';
  
      // Guarda la imagen en el sistema de archivos
      await FileSystem.writeAsStringAsync(fileUri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      // Verifica si se puede compartir la imagen
      if (Platform.OS === 'android') {
        // Usa expo-sharing para Android
        const isAvailable = await Sharing.isAvailableAsync();
        if (isAvailable) {
          await Sharing.shareAsync(fileUri);
        } else {
          console.log('Compartir no está disponible en este dispositivo.');
        }
      } else {
        // Usa Share.share para iOS
        await Share.share({
          url: fileUri,
          message: 'Aquí está tu código QR',
        });
      }
    } catch (error) {
      console.log('Error compartiendo:', error);
    }
  };

  // Función para imprimir el QR
  const printQR = async () => {
    if (!base64QR) return;
    const imageUri = `${base64QR}`;
    try {
      await Print.printAsync({ html: `<img src="${imageUri}" style="width:100%;"/>` });
    } catch (error) {
      console.log('Error imprimiendo:', error);
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Generar QR</Text>

      {/* Mostrar QR recibido en Base64 */}
      {base64QR ? (
        <View style={styles.qrContainer}>
          <Image source={{ uri: base64QR }} style={styles.qrImage} />
        </View>
      ) : (
        <Text style={styles.qrText}>No hay QR disponible</Text>
      )}

      {/* Botones */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={shareQR} disabled={!base64QR}>
          <Text style={styles.buttonText}>Compartir QR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={printQR} disabled={!base64QR}>
          <Text style={styles.buttonText}>Imprimir QR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: color.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  qrContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  qrImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  qrText: {
    fontSize: 18,
    textAlign: 'center',
    color: color.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    backgroundColor: color.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GenerateQR;
