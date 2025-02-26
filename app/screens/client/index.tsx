import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { useColor } from '../../Constants/Color';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Client, useClientsQuery } from '../../graphql/generated/graphql';

const { color } = useColor();

const ClientList = () => {
  const [search, setSearch] = useState<string | null>(null);
  const [page, setPage] = useState(1); // Para manejar la paginación
  const [loadingMore, setLoadingMore] = useState(false); // Para controlar la carga de más datos
  const [clients, setClients] = useState<Client[]>([]); // Estado para almacenar los clientes

  const { data, loading, refetch } = useClientsQuery({
    variables: {
      pagination: {
        skip: (page - 1) * 10, // Calcula el "skip" según la página actual
        take: 10, // Tomamos 10 elementos por página
      },
    },
    onCompleted: (data) => {
      if (data?.clients) {
        setClients((prevClients) => [...prevClients, ...data.clients]); // Añadimos los nuevos clientes a los anteriores
      }
      setLoadingMore(false); // Terminamos de cargar más datos
    }
  });
  
  // Filtra los clientes con base en la búsqueda
  const handleSearch = (text: string) => {
    setSearch(text);
  };

  // Renderiza cada item en el listado
  const renderClientItem = ({ item }: { item: Client }) => (
    <TouchableOpacity style={styles.clientItem}>
      <View style={styles.clientInfo}>
        <Text style={styles.clientName}>
          {item.name} {item.lastName}
        </Text>
        {item.email ? <Text style={styles.clientDetails}>{item.email}</Text> : null}
        {item.celular ? <Text style={styles.clientDetails}>{item.celular}</Text> : null}
      </View>
      <MaterialCommunityIcons name="pencil-circle-outline" size={24} color={color.primary} />
    </TouchableOpacity>
  );
  

  // Función que se llama cuando se llega al final de la lista
  const loadMoreData = () => {
    if (!loadingMore && data?.clients?.length) {
      setLoadingMore(true);
      setPage((prevPage) => prevPage + 1); // Aumentamos la página para cargar más
    }
  };

  // Refrescar la lista cuando el usuario hace pull down
  const onRefresh = useCallback(() => {
    setClients([]); // Limpiamos la lista de clientes
    setPage(1); // Reiniciamos la paginación
    refetch(); // Refrescamos los datos
  }, [refetch]);
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{loading ? 'Cargando clientes...' : 'No se encontraron clientes'}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar cliente..."
        value={search || ''}
        onChangeText={handleSearch}
      />
      {/* Botón de Crear Cliente */}
      <TouchableOpacity style={styles.createButton} onPress={() => alert('Crear nuevo cliente')}>
        <Text style={styles.createButtonText}>Crear Cliente</Text>
      </TouchableOpacity>

      <FlatList
        data={clients} // Usamos los clientes acumulados
        keyExtractor={(item) => item.id}
        renderItem={renderClientItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmptyList}
        // ListHeaderComponent={
        //   loading ? (
        //     <View style={styles.loaderContainer}>
        //       <ActivityIndicator size="large" color={color.primary} />
        //     </View>
        //   ) : null
        // }
        onEndReached={loadMoreData} // Cargar más datos cuando llegue al final
        onEndReachedThreshold={0.5} // Activar a los 50% de la lista
        onRefresh={onRefresh} // Refrescar la lista
        refreshing={loading} // Mostrar indicador de carga cuando se refresca
        ListFooterComponent={
          Platform.OS === 'ios' && (loadingMore ||loading)  ?
          (<ActivityIndicator size="large" color={color.primary} />)
          :
          <></>
        }
        // ListFooterComponent={loadingMore && <ActivityIndicator size="large" color={color.primary} />} // Indicador de carga al final
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.lightBeige,
    padding: 20,
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
  },
  searchInput: {
    height: 50,
    borderColor: color.lightPink,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingBottom: 50, // Asegúrate de que haya espacio si usas un scroll
  },
  clientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: color.primary, // Usamos el color primario para destacar el nombre
  },
  clientDetails: {
    fontSize: 14,
    color: color.darkGray, // Un color más claro para detalles
    marginTop: 5,
  },
  createButton: {
    backgroundColor: color.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ClientList;
