import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, Text } from 'react-native';
import GreetingCard from './GreetingCard';
import { useColor } from '../../Constants/Color';
import StatisticsDashboard from './Statistict';
import FloatingButton from '../../components/Amination/ButtonFlotan';
import DailyReminders from './RimenderDailys';
import { OrderStatusEnum } from '../../graphql/generated/graphql';
const { color } = useColor();

const HomeScreen = ({ route, navigation }) => {
  const getGreeting = (): string => {
    const hours = new Date().getHours();
    if (hours < 12) {
      return 'Buenos días';
    } else if (hours < 18) {
      return 'Buenas tardes';
    } else {
      return 'Buenas noches';
    }
  };

  const name = 'Nombre'; // Aquí puedes reemplazarlo por el nombre real del usuario.
  const [refreshing, setRefreshing] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0); // Estado para el desplazamiento del scroll

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      // Simula una llamada asíncrona o actualización
      await new Promise((resolve) => setTimeout(resolve, 500));
    } finally {
      setRefreshing(false);
      navigation.setParams({ isRefesh: false });
    }
  };

  // Función para manejar el desplazamiento del scroll
  const handleScroll = (event: any) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    setScrollOffset(contentOffsetY); // Guardamos la posición actual del scroll
  };

  return (
    <View style={styles.container}>
      <GreetingCard greeting={getGreeting()} name={name} scrollOffset={scrollOffset} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        onScroll={handleScroll} // Escucha el evento de scroll
        scrollEventThrottle={16} // Controla la frecuencia con la que se dispara el evento de scroll
      >
        <StatisticsDashboard />
        <Text style={styles.title}>Pendientes</Text>
        <DailyReminders refetchControl={refreshing} status={OrderStatusEnum.Pending}/>
        <Text style={styles.title}>Realizadas</Text>
        <DailyReminders refetchControl={refreshing} status={OrderStatusEnum.Completed}/>
        <Text style={styles.title}>Canceladas</Text>
        <DailyReminders refetchControl={refreshing} status={OrderStatusEnum.Canceled}/>
      </ScrollView>
      <FloatingButton onPress={()=> navigation.navigate('StepProgress')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.lightBeige,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: color.lightPink,
    textAlign: 'center'
  },
  scrollContainer: {
    paddingBottom: 10, // Espacio en la parte inferior
  },
});

export default HomeScreen;
