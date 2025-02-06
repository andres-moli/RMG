import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { useFocusEffect } from '@react-navigation/native'; // Esto es importante para manejar el enfoque de la pantalla

const QRScannerScreen = ({navigation}) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState<string | null>(null);
  const [cameraReady, setCameraReady] = useState(false);

  // Obtener permisos de la cámara cuando el componente se monte
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Llamar a la cámara y reiniciar la vista cuando la pantalla se enfoque
  useFocusEffect(
    React.useCallback(() => {
      setScanned(false); // Reiniciar el estado de escaneado cuando la pantalla se enfoque
      setData(null); // Reiniciar los datos escaneados
      setCameraReady(true); // Asegurarse de que la cámara esté lista
      return () => {
        setCameraReady(false); // Limpiar estado cuando la pantalla se deje de ver
      };
    }, [])
  );

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    setData(data);
    navigation.navigate('RepairDetailScreen', {orderRepairId: data})
    
  };

  if (hasPermission === null) {
    return <Text>Solicitando permiso de la cámara...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Acceso a la cámara denegado</Text>;
  }

  return (
    <View style={styles.container}>
      {cameraReady && (
        <CameraView
          style={StyleSheet.absoluteFillObject}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        />
      )}
      {scanned && (
        <>
          <View style={styles.overlay}>
            <Text style={styles.text}>Código escaneado: {data}</Text>
          </View>
          <TouchableOpacity onPress={() => setScanned(false)}>
            <Text style={styles.text}>{'Volver'}</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export default QRScannerScreen;
