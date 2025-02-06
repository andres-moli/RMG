import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

const MapComponent = ({route}) => {
  const {latitude, longitude} = route.params;

  const [region, setRegion] = useState({
    latitude: latitude, // Coordenadas iniciales (en este caso, latitud y longitud de San Francisco)
    longitude: longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  return (
    <View style={styles.container}>
      {/* Card que contiene el mapa */}
      <MapView
          style={styles.map}
          initialRegion={region} // Configuración de la región inicial
          region={region} // Actualización de la región cuando el usuario se mueve
          showsUserLocation={true} // Muestra la ubicación actual del usuario
          showsCompass={true} // Muestra la brújula
          loadingEnabled={true}
          // provider={PROVIDER_GOOGLE}
        >

          {/* Marcador de la ubicación actual */}
          <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} title="Ubicación donde se marco" />
        </MapView>

      {/* Información opcional sobre la ubicación */}
      {/* {userLocation && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Latitud: {userLocation.latitude.toFixed(4)} {'\n'}
            Longitud: {userLocation.longitude.toFixed(4)}
          </Text>
        </View>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    card: {
      width: '100%', // Ocupa el 95% del ancho de la pantalla
      height: '100%', // Ocupa el 90% de la altura de la pantalla
      borderRadius: 15,
      overflow: 'hidden', // Para que el mapa se ajuste a los bordes redondeados
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 6,
      elevation: 6, // Sombra para Android
      margin: 10, // Márgenes en los bordes
    },
    map: {
      width: '100%', // El mapa ocupará todo el espacio dentro de la tarjeta
      height: '100%', // El mapa ocupará toda la altura de la tarjeta
    },
  });
  

export default MapComponent;
