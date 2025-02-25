import React, { useState, useRef } from 'react';
import { Animated, TouchableOpacity, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColor } from '../../Constants/Color';
import { useNavigation } from '@react-navigation/native';

const { color } = useColor();

interface FloatingButtonProps {
  onPress: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onPress }) => {
  const [showOptions, setShowOptions] = useState(false); // Estado para controlar la visibilidad de las opciones
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const translateAnim = useRef(new Animated.Value(0)).current; // Animación para las opciones adicionales
  const navigation = useNavigation()
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
    toggleOptions(); // Llamamos para alternar las opciones
  };

  const toggleOptions = () => {
    setShowOptions((prevState) => !prevState); // Alternar entre mostrar y ocultar opciones
    Animated.timing(translateAnim, {
      toValue: showOptions ? 0 : -100, // Desplazamos las opciones hacia arriba
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const closeOptions = () => {
    if (showOptions) {
      setShowOptions(false); // Cerrar las opciones si están abiertas
      Animated.timing(translateAnim, {
        toValue: 0, // Desplazamos las opciones hacia abajo
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  const handelCash = () => {
    navigation.navigate('ReciboPagoScreen')
  }
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={closeOptions}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      {/* Botones adicionales */}
      {showOptions && (
        <Animated.View style={[styles.optionButtonContainer, { transform: [{ translateY: translateAnim }] }]}>
          <TouchableOpacity onPress={onPress} style={[styles.optionButton, styles.optionButton1]}>
            <MaterialCommunityIcons name="car-wrench" color="white" size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handelCash}style={[styles.optionButton, styles.optionButton1]}>
            <MaterialCommunityIcons name="account-cash-outline" color="white" size={24} />
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Botón principal */}
      <Animated.View style={[styles.buttonContainer, { transform: [{ scale: scaleAnim }] }]}>
        <TouchableOpacity
          style={styles.mainButton}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name={showOptions ? 'close' : 'plus'} color="white" size={24} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    bottom: 20,
    right: 20,
    // elevation: 5,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    elevation: 5,
  },
  mainButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: color.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent', // Para que solo cierre las opciones sin bloquear el resto de la UI
  },
  optionButtonContainer: {
    position: 'absolute',
    bottom: 1, // Los botones adicionales estarán arriba del botón principal
    right: 0,
    alignItems: 'center',
  },
  optionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionButton1: {
    backgroundColor: color.primary,
  },
  optionButton2: {
    backgroundColor: color.lightPink,
  },
});

export default FloatingButton;
