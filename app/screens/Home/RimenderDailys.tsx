// src/components/DailyReminders.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import {useColor} from '../../Constants/Color';
import NotificationList, { INotification } from '../Notification/NotificationList';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import useUser from '../../context/useUser';
import { useNavigation } from '@react-navigation/native';
import { formatWithCommonFormats } from '../../Lib/MangerDate';
import { OrderRepairty, OrderStatusEnum, OrderTypes, useOrderRepairQuery, useOrderRepairsQuery } from '../../graphql/generated/graphql';
const { color } = useColor();

const GetColorByStatu = (status: OrderStatusEnum) => {
    let statusColor;
    switch (status) {
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
    return statusColor
}
const DailyReminders = ({refetchControl, status}: {refetchControl: boolean ,status: OrderStatusEnum}) => {
  const navigation = useNavigation();
  const renderItem = ({ item }: { item: OrderRepairty }) => {
    const styles = StyleSheet.create({
      notificationItem: {
        flexDirection: 'row', // Mantenerlo horizontal
        alignItems: 'center',
        paddingVertical: 10, // Menos espacio vertical
        paddingHorizontal: 15, // Espaciado horizontal más grande
        backgroundColor: color.white,
        borderRadius: 8,
        marginBottom: 30, // Espacio entre cada elemento de la lista
        elevation: 3, // Sombra para Android
        shadowColor: color.darkGray, // Sombra para iOS
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      iconContainer: {
        width: 40, // Un poco más grande para dar un mejor espacio
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20, // Asegura que el ícono esté centrado
        marginRight: 15, // Espacio entre ícono y mensaje
      },
      reminder: {
        backgroundColor: color.lightPink, 
      },
      notification: {
        backgroundColor: color.primary, 
      },
      messageContainer: {
        flex: 1,
      },
      notificationMessage: {
        fontSize: 16,
        color: color.darkGray,
        marginBottom: 5, // Espacio entre el nombre y el tipo de reparación
      },
      notificationSubMessage: {
        fontSize: 14,
        color: color.darkGray,
        marginBottom: 5, // Espacio entre el tipo de reparación y la fecha
      },
      seeMore: {
        color: color.primary,
        fontWeight: 'bold',
      },
      date: {
        fontSize: 12,
        color: color.darkGray,
      },
    });
  
    return (
      <TouchableOpacity
        style={styles.notificationItem}
        activeOpacity={0.8}
        onPress={() => { navigation.navigate('RepairDetailScreen', { orderRepairId: item.id }) }}
      >
        <View style={[styles.iconContainer, styles.notification, {backgroundColor: GetColorByStatu(item.status)}]}>
          <MaterialCommunityIcons
            name={'tools'}
            size={24}
            color={color.lightPink}
          />
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.notificationMessage}>
            {item.client.name + ' ' + item.client.lastName}
          </Text>
          <Text style={styles.notificationSubMessage}>
            {item.repairType.name}
          </Text>
          <Text style={styles.date}>{formatWithCommonFormats(item.createdAt, 'G')}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  const {user} = useUser()
  const [loadingRefesh, setLoadingRefesh] = useState(false)
  const {data, loading, refetch} = useOrderRepairsQuery({
    variables: {
      where: {
        createdAt: {
          _between: [dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss'),dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')]
        },
        status: {
            _eq: status
        }
      },
      pagination: {
        skip: 0,
        take: 5
      },
      orderBy: {
        createdAt: OrderTypes.Asc
      }
    }
  })
  useEffect(() => {
    const refesh = async () =>{
      if (refetchControl) {
        setLoadingRefesh(true)
        await refetch(); // Refrescar datos
        setLoadingRefesh(false)   
      }
    }
    refesh()
  }, [refetchControl, refetch]);
  const onRefesh = () => {
    refetch()
  }
  return (
    <View style={styles.container}>

      {/* <View style={styles.card}>
      </View> */}
      <FlatList
          refreshing
        //   refreshControl={
        //     <RefreshControl refreshing={loadingRefesh} onRefresh={onRefesh} />
        //   }
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={data?.orderRepairs || []}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false} 
          nestedScrollEnabled={true} // Habilita el scroll anidado
          ListEmptyComponent={<Text>No hay reparaciones</Text>}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: color.darkGray,
    marginBottom: 10,
  },
  card: {
    backgroundColor: color.white,
    borderRadius: 10,
    padding: 15,
    elevation: 3, // Sombra para Android
    shadowColor: color.darkGray, // Sombra para iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    maxHeight: 200, // Altura máxima para el desplazamiento
    marginBottom: 20
  },
});

export default DailyReminders;
