import React, { useState, useEffect } from "react";
import { Client, OrderTypes, ProductOutflow, useProductsOutflowsQuery } from "../../graphql/generated/graphql";
import { useColor } from "../../Constants/Color";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Platform, ActivityIndicator, ScrollView, RefreshControl } from "react-native";
import moment from "moment"; // Para formatear fechas
import { Modal, Button } from "react-native"; // Para el modal
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Para los iconos
import { formatCurrency } from "../../Lib/convertMoney";
import { handleSendEmail } from "../../Lib/sendMail";
import { handleSendWhastapp } from "../../Lib/sendWhastapp";
import SearchUserComponent from "../../components/search/user-input-search";

const { color } = useColor();

const ListReciboScreen = ({navigation}) => {
  const [skip, setSkip] = useState(0);
  const [dateRange, setDateRange] = useState([]); // Estado para el rango de fechas
  const [selectedRecibo, setSelectedRecibo] = useState<ProductOutflow>(); // Estado para el recibo seleccionado
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadingEmail, setloadingEmail] = useState(false);
  const [recibos, setRecibos] = useState<ProductOutflow[]>([]); // Estado para almacenar todos los recibos
  const [showDatePicker, setShowDatePicker] = useState(false); // Para mostrar el selector de fecha
  const [refreshing, setRefreshing] = useState(false); // Estado para el scroll refresh
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null); // Estado para el cliente seleccionado

  const { data, loading, refetch } = useProductsOutflowsQuery({
    variables: {
      pagination: {
        skip: skip,
        take: 10,
      },
      orderBy: {
        createdAt: OrderTypes.Desc,
      },
    },
  });

  // Función para manejar el scroll refresh
  const onRefresh = async () => {
    setRefreshing(true); // Activar el indicador de refresh
    setSkip(0); // Reiniciar el skip
    await refetch(); // Refrescar los datos
    setRefreshing(false); // Desactivar el indicador de refresh
  };

  const handleDateRangeChange = (date, type) => {
    let newDateRange = [...dateRange];
    if (type === "start") {
      newDateRange[0] = date.toISOString();
    } else if (type === "end") {
      newDateRange[1] = date.toISOString();
    }
    setDateRange(newDateRange);
    setSkip(0); // Reiniciar la paginación al cambiar el rango de fechas
    setRecibos([]); // Reiniciar los recibos
    setShowDatePicker(false); // Cerrar el selector de fecha
  };

  const loadMoreData = () => {
    if (loading || loadingMore) return; // Si ya está cargando, no hacer nada
    setSkip((prevSkip) => prevSkip + 10); // Incrementar el skip para cargar la siguiente página
    setLoadingMore(true); // Mostrar "Cargando más..." mientras carga
  };

  useEffect(() => {
    if (skip === 0) {
      refetch(); // Refrescar datos al cambiar el skip
    }
  }, [skip, refetch]);

  // Cada vez que los datos se actualizan, los concatenamos a los datos existentes
  useEffect(() => {
    if (data?.ProductsOutflows) {
      setRecibos((prevRecibos) => {
        if (skip === 0) {
          return data.ProductsOutflows;
        } else {
          return [...prevRecibos, ...data.ProductsOutflows];
        }
      });
      setLoadingMore(false); // Detener el indicador de carga
    }
  }, [data,selectedClientId]);

  const openModal = (recibo: ProductOutflow) => {
    // setSelectedRecibo(recibo);
    navigation.navigate('ReciboPagoDetailScreen', {
      selectedReciboJson: JSON.stringify(recibo), // El objeto completo de selectedRecibo
    });
  };

  const closeModal = () => {
    setSelectedRecibo(undefined);
  };

  const renderItem = ({ item }: { item: ProductOutflow }) => {
    const styles = StyleSheet.create({
      notificationItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: color.white,
        borderRadius: 8,
        marginBottom: 15,
        elevation: 3,
        shadowColor: color.darkGray,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      iconContainer: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        marginRight: 15,
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
        marginBottom: 5,
      },
      notificationSubMessage: {
        fontSize: 14,
        color: color.darkGray,
        marginBottom: 5,
      },
      seeMore: {
        color: color.primary,
        fontWeight: "bold",
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
        onPress={() => openModal(item)}
      >
        <View
          style={[
            styles.iconContainer,
            styles.notification,
            {
              backgroundColor: color.primary, // Puedes agregar una lógica de color aquí
            },
          ]}
        >
          <MaterialCommunityIcons
            name={"receipt"}
            size={24}
            color={color.lightPink}
          />
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.notificationMessage}>
            {item.client.name + " " + item.client.lastName}
          </Text>
          <Text style={styles.notificationSubMessage}>
            {item.invoiceNumber}
          </Text>
          <Text style={styles.date}>
            {moment(item.inflowDate).format("DD/MM/YYYY")}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const handleSelectClient = (client: Client) => {
    setSelectedClientId(client.id); // Actualiza el estado con el ID del cliente seleccionado
    setSkip(0); // Reinicia la paginación
    setRecibos([]); // Reiniciar los recibos
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
  const onRefreshClient = async () => {
    setRefreshing(true); // Activar el indicador de refresh
    setSkip(0); // Reinicia la paginación
    setRecibos([]); // Reiniciar los recibos
    setSelectedClientId(null)
    const res = await refetch(
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
    setRecibos(res.data?.ProductsOutflows || [])
    setRefreshing(false); // Activar el indicador de refresh
  }
  // Calcular el total de los recibos
  const totalRecibos = recibos.length;

  return (
    <View style={{ padding: 20, flex: 1 }}>
      {/* Total de los recibos */}
      <View style={
          {
            height: 50,
            borderColor: color.primary,
            marginBottom: 20,
            // color: color.primary,
          }
      }>
        <SearchUserComponent
          placeholder="Buscar por cliente"
          onSelectClient={handleSelectClient}
          onClear={async ()=>
            {
              onRefreshClient()
            }}
        />
      </View>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20 }}>
        Total Readacibos: {totalRecibos}
      </Text>

      {/* Lista de recibos con Scroll Refresh */}
      <FlatList
        data={recibos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[color.primary]} // Color del indicador de refresh
          />
        }
        ListFooterComponent={
          <>
            {/* Botón "Ver más" */}
            {data?.ProductsOutflows?.length === 10 && (
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: color.primary,
                  borderRadius: 5,
                  alignItems: "center",
                  marginVertical: 10,
                }}
                onPress={loadMoreData}
                disabled={loadingMore}
              >
                {loadingMore ? (
                  <ActivityIndicator color={color.white} />
                ) : (
                  <Text style={{ color: color.white, fontWeight: "bold" }}>
                    Ver más
                  </Text>
                )}
              </TouchableOpacity>
            )}
          </>
        }
      />

      {/* Modal para detalles del recibo */}
      {selectedRecibo && (
  <Modal
    visible={!!selectedRecibo}
    onRequestClose={closeModal}
    transparent={true}
    animationType="slide"
  >
    {/* Contenedor principal del modal */}
    <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
      {/* Contenido del modal */}
      <View style={{ width: "100%", backgroundColor: color.white, padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
        <ScrollView >
          {/* Encabezado del recibo */}
          <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 15 }}>
            Recibo de Pago
          </Text>

          {/* Información del cliente */}
          <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
            Detalles del Cliente:
          </Text>
          <Text>{selectedRecibo.client.name} {selectedRecibo.client.lastName}</Text>
          <Text>Documento: {selectedRecibo.client.numberDocument}</Text>
          <Text>Dirección: {selectedRecibo.client.address}</Text>
          <Text>Teléfono: {selectedRecibo.client.celular}</Text>
          <Text>Email: {selectedRecibo.client.email}</Text>

          {/* Línea divisoria */}
          <View style={{ borderBottomColor: color.darkGray, borderBottomWidth: 1, marginVertical: 10 }} />

          {/* Detalles de la factura */}
          <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
            Detalles del recibo:
          </Text>
          <Text>Número de Factura: {selectedRecibo.invoiceNumber}</Text>
          <Text>Fecha: {moment(selectedRecibo.inflowDate).format("DD/MM/YYYY HH:mm")}</Text>
          <Text>Método de Pago: {selectedRecibo.paymentMethod}</Text>
          <Text>Estado: {selectedRecibo.status}</Text>

          {/* Línea divisoria */}
          <View style={{ borderBottomColor: color.darkGray, borderBottomWidth: 1, marginVertical: 10 }} />

          {/* Productos */}
          {selectedRecibo.invoiceProducts.length > 0 && (
            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
              Productos:
            </Text>
          )}
          {selectedRecibo.invoiceProducts.map((product, index) => (
            <View key={product.id} style={{ marginBottom: 10 }}>
              <Text style={{ fontWeight: "bold", color: color.primary }}>{index + 1}. {product.product.name}</Text>
              <Text><Text style={{ fontWeight: "bold" }}>Cantidad:</Text> {product.quantity}</Text>
              <Text><Text style={{ fontWeight: "bold" }}>Precio Unitario:</Text> {formatCurrency(product.unitPrice)}</Text>
              <Text><Text style={{ fontWeight: "bold" }}>Descuento:</Text> {product.discount}%</Text>
              <Text><Text style={{ fontWeight: "bold" }}>Subtotal:</Text> {formatCurrency(product.subtotal)}</Text>
              <Text><Text style={{ fontWeight: "bold" }}>Total:</Text> {formatCurrency(product.total)}</Text>
            </View>
          ))}

          {/* Servicios */}
          {selectedRecibo.invoiceServices.length > 0 && (
            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
              Servicios:
            </Text>
          )}
          {selectedRecibo.invoiceServices.map((service, index) => (
            <View key={service.id} style={{ marginBottom: 10 }}>
              <Text style={{ fontWeight: "bold", color: color.primary }}>{index + 1}. {service.service.name}</Text>
              <Text><Text style={{ fontWeight: "bold" }}>Cantidad:</Text> {service.quantity}</Text>
              <Text><Text style={{ fontWeight: "bold" }}>Precio Unitario:</Text> {formatCurrency(service.unitPrice)}</Text>
              <Text><Text style={{ fontWeight: "bold" }}>Subtotal:</Text> {formatCurrency(service.subtotal)}</Text>
              <Text><Text style={{ fontWeight: "bold" }}>Total:</Text> {formatCurrency(service.total)}</Text>
            </View>
          ))}

          {/* Línea divisoria */}
          <View style={{ borderBottomColor: color.darkGray, borderBottomWidth: 1, marginVertical: 10 }} />

          {/* Totales */}
          <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
            Totales:
          </Text>
          <Text style={{ fontWeight: "bold" }}>
            Total General: {formatCurrency(
              selectedRecibo.invoiceProducts.reduce((acc, product) => acc + product.total, 0) +
              selectedRecibo.invoiceServices.reduce((acc, service) => acc + service.total, 0)
            )}
          </Text>

          {/* Botones de acción */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
            {/* Botón de WhatsApp */}
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#25D366", padding: 10, borderRadius: 5 }}
              disabled={loadingEmail}
              onPress={async () => {
                handleSendWhastapp(selectedRecibo.client.celular || '', selectedRecibo, 'RECIBO_PAGO_PRODUCTO_SERVICIO', setloadingEmail);
              }}
            >
              <MaterialCommunityIcons name="whatsapp" size={24} color={color.white} />
              {loadingEmail ? (
                <Text style={{ color: color.white, marginLeft: 5 }}>Enviando...</Text>
              ) : (
                <Text style={{ color: color.white, marginLeft: 5 }}>WhatsApp</Text>
              )}
            </TouchableOpacity>

            {/* Botón de Email */}
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", backgroundColor: color.primary, padding: 10, borderRadius: 5 }}
              onPress={() => {
                handleSendEmail(selectedRecibo.client.email || '', selectedRecibo, 'RECIBO_PAGO_PRODUCTO_SERVICIO', setloadingEmail);
              }}
            >
              <MaterialCommunityIcons name="email" size={24} color={color.white} />
              {loadingEmail ? (
                <Text style={{ color: color.white, marginLeft: 5 }}>Enviando...</Text>
              ) : (
                <Text style={{ color: color.white, marginLeft: 5 }}>Email</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Botón para cerrar el modal */}
          <Button onPress={closeModal} title="Cerrar" />
        </ScrollView>
      </View>
    </View>
  </Modal>
)}

    </View>
  );
};

export default ListReciboScreen;