import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { useColor } from '../../Constants/Color';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment'; 
import { OrderRepairty, OrderStatusEnum, OrderTypes, useOrderRepairsQuery } from '../../graphql/generated/graphql';

const { color } = useColor();

const ServiceListScreen = ({navigation}) => {
  const [searchDate, setSearchDate] = useState('');
  const [page, setPage] = useState(1); // Controla la paginación
  const [loadingMore, setLoadingMore] = useState(false); // Controla si estamos cargando más datos
  const [services, setServices] = useState<OrderRepairty[]>([]); // Estado para los servicios acumulados

  const { data, loading, refetch } = useOrderRepairsQuery({
    variables: {
      where: {},
      pagination: {
        skip: (page - 1) * 10, // Calculamos el "skip" según la página actual
        take: 10, // Tomamos 10 elementos por cada petición
      },
      orderBy: {
        createdAt: OrderTypes.Desc
      }
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

  const handleSearch = (date: string) => {
    setSearchDate(date);
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
          <Text style={[styles.serviceText, { color: statusColor }]} >
            <Text style={styles.label}>Estado: </Text>{item.status}
          </Text>
        </View>
        <TouchableOpacity style={styles.iconContainer} onPress={()=>    navigation.navigate('RepairDetailScreen', {orderRepairId: item.id})}>
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
    refetch(); // Refrescamos los datos
    setPage(1); // Resetear la paginación
    setServices([]); // Limpiamos la lista de servicios al hacer refresh
  }, [refetch]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por fecha (YYYY-MM-DD)"
        placeholderTextColor={color.lightPink}
        value={searchDate}
        onChangeText={handleSearch}
      />
      <FlatList
        data={services} // Ahora estamos usando los datos acumulados
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderServiceItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={renderEmptyList}
        // ListHeaderComponent={
        //   loading && Platform.OS === 'ios' ? (
        //     <View style={styles.loaderContainer}>
        //       <ActivityIndicator size="large" color={color.primary} />
        //     </View>
        //   ) : null
        // }
        onEndReached={loadMoreData} // Cuando el usuario llega al final de la lista
        onEndReachedThreshold={0.5} // Activar a los 50% de la lista
        onRefresh={onRefresh} // Al hacer pull down
        refreshing={loading} // Mostrar el indicador de carga mientras se refresca
        contentContainerStyle={services.length === 0 && styles.emptyList}
      />
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
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
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
