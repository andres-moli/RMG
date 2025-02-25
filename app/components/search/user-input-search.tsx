import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { useColor } from '../../Constants/Color';
import FormText from '../input/FormText'; // Asegúrate de importar el componente FormText que proporcionaste
import { Client, useClientsQuery } from '../../graphql/generated/graphql'; // Asegúrate de importar tu hook useClientsQuery

const { color } = useColor();

interface SearchComponentProps {
  placeholder?: string; // Prop opcional para el placeholder
  onSelectClient: (client: Client) => void; // Función que se ejecutará al seleccionar un cliente
}

const SearchUserComponent: React.FC<SearchComponentProps> = ({ placeholder = "Buscar clientes...", onSelectClient }) => {
  const [searchQuery, setSearchQuery] = useState('');
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
          {
            celular: {
                _contains: searchQuery,
              }
          }
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
    setSearchQuery(''); // Limpiamos la búsqueda después de seleccionar un cliente
  };

  // Determinar si hay resultados para mostrar
  const hasResults = data?.clients && data.clients.length > 0;

  return (
    <View style={styles.container}>
      <FormText
        value={searchQuery}
        placeholder={placeholder} // Usamos el placeholder recibido por las props
        onChangeText={handleSearch}
      />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: color.primary,
  },
  list: {
    backgroundColor: 'white', // Fondo blanco para la lista
    borderRadius: 10, // Bordes redondeados
    elevation: 3, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginTop: 5, // Espacio entre el input y la lista
    maxHeight: 200, // Altura máxima de la lista
  },
  message: {
    marginTop: 10,
    color: color.darkGray, // Color del mensaje
    textAlign: 'center',
  },
});

export default SearchUserComponent;