import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { useColor } from '../../Constants/Color';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';
import { Client, OrderRepairty, OrderStatusEnum, OrderTypes, useOrderRepairsQuery } from '../../graphql/generated/graphql';
import SearchUserComponent from '../../components/search/user-input-search';

const { color } = useColor();

const ServiceListScreen = ({ navigation }) => {
  const [searchDate, setSearchDate] = useState('');
  const [page, setPage] = useState(1); // Controla la paginación
  const [loadingMore, setLoadingMore] = useState(false); // Controla si estamos cargando más datos
  const [services, setServices] = useState<OrderRepairty[]>([]); // Estado para los servicios acumulados
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null); // Estado para el cliente seleccionado

  const { data, loading, refetch } = useOrderRepairsQuery({
    variables: {
      where: {
        client: selectedClientId ? { _eq: selectedClientId } : undefined, // Filtro por cliente.id
      },
      pagination: {
        skip: (page - 1) * 10, // Calculamos el "skip" según la página actual
        take: 10, // Tomamos 10 elementos por cada petición
      },
      orderBy: {
        createdAt: OrderTypes.Desc,
      },
    },
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      // Si ya hay servicios, los concatenamos con los nuevos
      if (data?.orderRepairs) {
        setServices((prevServices) => [...prevServices, ...data.orderRepairs]);
      }
      setLoadingMore(false); // Terminamos de cargar más datos
    },
  });

  // Función para manejar la selección de un cliente
  const handleSelectClient = (client: Client) => {
    setSelectedClientId(client.id); // Actualiza el estado con el ID del cliente seleccionado
    setPage(1); // Reinicia la paginación
    setServices([]); // Limpia los servicios anteriores
    refetch({
      where: {
        client: { _eq: client.id }, // Filtra por cliente.id
      },
      pagination: {
        skip: 0,
        take: 10,
      },
      orderBy: {
        createdAt: OrderTypes.Desc,
      },
    });
  };

  // Formatear la fecha a un formato más legible
  const formatDate = (date: string) => moment(date).format('DD/MM/YYYY');

  const renderServiceItem = ({ item }: { item: OrderRepairty }) => {
    let statusColor;
    switch (item.status) {
      case OrderStatusEnum.Completed:
        statusColor = 'green';
        break;
      case OrderStatusEnum.InProgress:
        statusColor = 'orange';
        break;
      case OrderStatusEnum.Pending:
        statusColor = 'orange';
        break;
      case OrderStatusEnum.Canceled:
        statusColor = 'red';
        break;
      default:
        statusColor = 'blue';
        break;
    }

    return (
      <View style={styles.serviceItem}>
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceText}>
            <Text style={styles.label}>Cliente: </Text>{item.client.name} {item.client.lastName}
          </Text>
          <Text style={styles.serviceText}>
            <Text style={styles.label}>Fecha: </Text>{formatDate(item.createdAt)}
          </Text>
          <Text style={styles.serviceText}>
            <Text style={styles.label}>Servicio: </Text>{item.repairType.name}
          </Text>
          <Text style={[styles.serviceText, { color: statusColor }]}>
            <Text style={styles.label}>Estado: </Text>{item.status}
          </Text>
        </View>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('RepairDetailScreen', { orderRepairId: item.id })}>
          <MaterialCommunityIcons name="tools" size={24} color={color.primary} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{loading ? 'Cargando reparaciones...' : 'No se encontraron reparaciones'}</Text>
    </View>
  );

  // Función que se llama al final de la lista (cuando se hace scroll)
  const loadMoreData = () => {
    if (!loadingMore && data?.orderRepairs.length) {
      setLoadingMore(true);
      setPage((prevPage) => prevPage + 1); // Aumentamos el número de la página
    }
  };

  // Refrescar la lista cuando el usuario hace pull down
  const onRefresh = useCallback(() => {
    setPage(1); // Resetear la paginación
    setServices([]); // Limpiamos la lista de servicios al hacer refresh
    refetch({
      where: {
        client: selectedClientId ? { _eq: selectedClientId } : undefined, // Mantén el filtro al refrescar
      },
      pagination: {
        skip: 0, // Calculamos el "skip" según la página actual
        take: 10, // Tomamos 10 elementos por cada petición
      },
      orderBy: {
        createdAt: OrderTypes.Desc,
      },
    }).then((response) => {
      if (response.data?.orderRepairs) {
        setServices(response.data.orderRepairs); // Actualizamos el estado con los nuevos datos
      }
    });
  }, [refetch, selectedClientId]);
  const onRefreshClient = () => {
    setPage(1); // Resetear la paginación
    setServices([]);
    setSelectedClientId(null)
    refetch(
      {
        pagination: {
          skip: 0, // Calculamos el "skip" según la página actual
          take: 10, // Tomamos 10 elementos por cada petición
        },
        orderBy: {
          createdAt: OrderTypes.Desc,
        },
      }
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.searchInput}>
        <SearchUserComponent
          placeholder="Buscar por cliente"
          onSelectClient={handleSelectClient}
          onClear={() => {
            onRefreshClient()
          }}
        />
      </View>
      <View style={styles.flatListContainer}>
        <FlatList
          data={services}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderServiceItem}
          // contentContainerStyle={styles.list}
          ListEmptyComponent={renderEmptyList}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
          onRefresh={onRefresh}
          refreshing={loading}
          style={styles.flatList}
          ListFooterComponent={
            Platform.OS === 'ios' && (loadingMore ||loading)  ?
            (<ActivityIndicator size="large" color={color.primary} />)
            :
            <></>
          }

        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.lightBeige,
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  searchContainer: {
    marginBottom: 20, // Espacio entre el buscador y la lista
  },
  flatList: {
    flex: 1, // Asegura que el FlatList ocupe el espacio restante
  },
  flatListContainer: {
    flex: 1, // Ocupa el espacio restante
  },
  emptyList: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
  },
  searchInput: {
    height: 50,
    borderColor: color.primary,
    // borderWidth: 1,
    // borderRadius: 8,
    // paddingLeft: 15,
    marginBottom: 20,
    fontSize: 16,
    color: color.primary,
  },
  list: {
    paddingBottom: 20,
  },
  serviceItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 15,
    padding: 15,
    borderRadius: 8,
    shadowColor: color.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceText: {
    fontSize: 16,
    color: color.primary,
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
  },
  iconContainer: {
    padding: 10,
    backgroundColor: color.lightPink,
    borderRadius: 50,
  },
});

export default ServiceListScreen;