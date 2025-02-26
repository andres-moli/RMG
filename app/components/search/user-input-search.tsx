import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useColor } from '../../Constants/Color';
import { Client, useClientsQuery } from '../../graphql/generated/graphql'; // Asegúrate de importar tu hook useClientsQuery

const { color } = useColor();

interface SearchComponentProps {
  placeholder?: string; // Prop opcional para el placeholder
  onSelectClient: (client: Client) => void; // Función que se ejecutará al seleccionar un cliente
  onClear?: () => void; // Función opcional que se ejecutará al limpiar la selección
}

const SearchUserComponent: React.FC<SearchComponentProps> = ({ placeholder = "Buscar clientes...", onSelectClient, onClear }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const [selectedClient, setSelectedClient] = useState<Client | null>(null); // Estado para el cliente seleccionado
  const { data, loading, refetch } = useClientsQuery({
    variables: {
      pagination: {
        skip: 0, // Comenzamos desde el principio
        take: 20, // Tomamos las primeras 20 opciones
      },
      where: {
        name: {
          _contains: searchQuery,
        },
        _or: [
          {
            lastName: {
              _contains: searchQuery,
            },
          },
          {
            numberDocument: {
              _contains: searchQuery,
            },
          },
        ],
      },
    },
    skip: searchQuery.length < 3, // No ejecutar la query si hay menos de 3 caracteres
  });

  useEffect(() => {
    // Refetch data cuando searchQuery cambie y tenga al menos 3 caracteres
    if (searchQuery.length >= 3) {
      refetch();
    }
  }, [searchQuery, refetch]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleItemPress = (item: Client) => {
    // Llamamos a la función onSelectClient pasándole toda la data del cliente
    onSelectClient(item);
    setSelectedClient(item); // Guardamos el cliente seleccionado
    setSearchQuery(''); // Limpiamos la búsqueda después de seleccionar un cliente
    setIsModalVisible(false); // Cerramos el modal
  };

  // Función para limpiar la selección del cliente
  const clearSelection = () => {
    setSelectedClient(null); // Limpiamos el cliente seleccionado
    if (onClear) {
      onClear(); // Llamamos a la función onClear si está definida
    }
  };

  // Determinar si hay resultados para mostrar
  const hasResults = data?.clients && data.clients.length > 0;

  return (
    <View style={styles.container}>
      {/* Botón para abrir el modal */}
      <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.searchButton}>
        {selectedClient ? (
          <View style={styles.selectedClientContainer}>
            <Text style={styles.selectedClientText}>
              {selectedClient.name} {selectedClient.lastName}
            </Text>
            <TouchableOpacity onPress={clearSelection} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.searchButtonText}>{placeholder}</Text>
        )}
      </TouchableOpacity>

      {/* Modal para buscar y seleccionar clientes */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)} // Cierra el modal al presionar el botón de retroceso en Android
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Campo de búsqueda dentro del modal */}
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar clientes..."
              value={searchQuery}
              onChangeText={handleSearch}
              autoFocus={true} // Enfoca automáticamente el campo de búsqueda al abrir el modal
            />

            {/* Resultados de búsqueda */}
            {loading ? (
              <Text>Cargando...</Text>
            ) : searchQuery.length > 0 && searchQuery.length < 3 ? (
              <Text style={styles.message}>Ingresa al menos 3 letras para buscar.</Text>
            ) : hasResults ? (
              <FlatList
                data={data.clients}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleItemPress(item)}>
                    <View style={styles.item}>
                      <Text>{item.name + ' ' + item.lastName + ' - ' + item.celular}</Text>
                    </View>
                  </TouchableOpacity>
                )}
                style={styles.list} // Aplicamos estilos a la lista
              />
            ) : searchQuery.length >= 3 ? (
              <Text style={styles.message}>No se encontraron resultados.</Text>
            ) : null}

            {/* Botón para cerrar el modal */}
            <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.closeButton}>
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
    flex: 1,
  },
  searchButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: color.primary,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchButtonText: {
    color: color.primary,
    fontSize: 16,
  },
  selectedClientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  selectedClientText: {
    color: color.primary,
    fontSize: 16,
  },
  clearButton: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: color.lightPink,
    borderRadius: 15,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%', // Altura máxima del modal
  },
  searchInput: {
    height: 50,
    borderColor: color.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    marginBottom: 10,
    fontSize: 16,
    color: color.primary,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: color.primary,
  },
  list: {
    marginTop: 10,
    marginBottom: 10,
  },
  message: {
    marginTop: 10,
    color: color.darkGray,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: color.primary,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SearchUserComponent;