import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import {useColor} from '../../Constants/Color';
import { useStatictsByStatusRepairQuery } from '../../graphql/generated/graphql';
const { color } = useColor();

// Componente StatsCard
const StatsCard = ({ title, value }: { title: string; value: string | number | undefined }) => {
  return (
    <View style={stylesCard.card}>
      <Text style={stylesCard.title}>{title}</Text>
      <Text style={stylesCard.value}>{value}</Text>
    </View>
  );
};

const stylesCard = StyleSheet.create({
  card: {
    backgroundColor: color.white, // Color de fondo de la tarjeta individual
    padding: 10, // Padding interno
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    margin: 5, // Margen entre las tarjetas
    flex: 1,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: color.darkGray,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: color.primary, // Color del valor
  },
});

// Componente StatisticsDashboard
const StatisticsDashboard = () => {
  const {data, loading} = useStatictsByStatusRepairQuery()
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {
          loading
          ?
          <ActivityIndicator color="#fff" />
          :
          <>
            <View style={styles.row}>
              <StatsCard title="Total de reparaciones" value={data?.statictsByStatusRepair.total} />
              <StatsCard title="Total Realizadas" value={data?.statictsByStatusRepair.total_completa}/>
            </View>
            <View style={styles.row}>
              <StatsCard title="Total pendientes" value={data?.statictsByStatusRepair.total_pendiente} />
              <StatsCard title="Total Canceladas" value={data?.statictsByStatusRepair.total_cancelada} />
            </View>
          </>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  cardContainer: {
    backgroundColor: color.white, // Color de fondo para la tarjeta contenedora
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'column',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', // Asegura que las filas ocupen el 100% del ancho
    marginBottom: 10,
  },
});

export default StatisticsDashboard;
