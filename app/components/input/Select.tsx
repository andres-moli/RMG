import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  FlatList,
} from 'react-native';
import { useColor } from '../../Constants/Color';
import { Ionicons } from '@expo/vector-icons';
const { color } = useColor();

export interface OptionsSelect {
  key: string;
  value: string;
}

interface SelectProps {
  options: OptionsSelect[];
  placeholder?: string;
  selectedOption?: string;  // Recibe la opción seleccionada como prop
  onSelect: (selectedOption: string) => void;
}

const Select: React.FC<SelectProps> = ({ options, placeholder, selectedOption, onSelect }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions = options.filter(option =>
    option.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option: OptionsSelect) => {
    onSelect(option.key); // Llamamos al onSelect para actualizar el estado en el componente padre
    setIsVisible(false);
    setSearchTerm('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.selectText}>
        {placeholder}
      </Text>
      <TouchableOpacity
        style={styles.selectBox}
        onPress={() => setIsVisible(true)}
      >
        <Text style={styles.selectPlaceholder}>
          {selectedOption ? options.find((x)=> x.key == selectedOption)?.value : "Seleccione una opción"} {/* Muestra la opción seleccionada */}
        </Text>
      </TouchableOpacity>

      <Modal
        transparent
        animationType="slide"
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color={color.lightPink} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar..."
                placeholderTextColor={color.lightPink}
                value={searchTerm}
                onChangeText={setSearchTerm}
              />
            </View>
            <FlatList
              data={filteredOptions}
              keyExtractor={(item) => item.key.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item)}
                >
                  <View style={styles.radioContainer}>
                    <View style={selectedOption === item.key ? styles.selectedRadio : styles.unselectedRadio} />
                    <Text style={styles.optionText}>{item.value}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 20,
  },
  selectBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
  selectText: {
    fontSize: 16,
    color: color.primary,
    fontWeight: 'bold',
  },
  selectPlaceholder: {
    fontSize: 16,
    color: color.darkGray,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '100%',
    height: '50%',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 5,
    marginLeft: 10,
  },
  searchIcon: {
    padding: 5,
    color: color.lightPink,
  },
  option: {
    padding: 10,
  },
  optionText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: color.lightPink,
    paddingVertical: 10,
    borderRadius: 19,
    alignItems: 'center',
  },
  closeButtonText: {
    color: color.lightBeige,
    fontWeight: 'bold',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: color.lightPink,
    marginRight: 10,
  },
  unselectedRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: color.darkGray,
    marginRight: 10,
  },
});

export default Select;
