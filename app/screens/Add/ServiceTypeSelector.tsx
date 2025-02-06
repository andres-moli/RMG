import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColor } from '../../Constants/Color';

const { color } = useColor();

const ServiceTypeSelector = () => {
  const [selectedService, setSelectedService] = useState('');

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Seleccionar Tipo de Servicio</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: color.white,
    width: '100%',
    borderRadius: 10,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: color.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: color.primary,
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default ServiceTypeSelector;
