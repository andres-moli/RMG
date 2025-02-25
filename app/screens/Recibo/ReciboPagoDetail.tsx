import React, { useState } from 'react';
import { View, Text, ScrollView, Button, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import moment from 'moment';
import { ProductOutflow } from '../../graphql/generated/graphql';
import { handleSendWhastapp } from '../../Lib/sendWhastapp';
import { handleSendEmail } from '../../Lib/sendMail';
import { formatCurrency } from '../../Lib/convertMoney';

const ReciboDetailScreen = ({route}) => {
 const { selectedReciboJson } = route.params;
  if (!selectedReciboJson) return null; // Si no hay recibo seleccionado, no mostrar nada
  const  selectedRecibo = JSON.parse(selectedReciboJson)
  const [loadingEmail, setloadingEmail] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
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
        <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginVertical: 10 }} />

        {/* Detalles de la factura */}
        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
          Detalles del recibo:
        </Text>
        <Text>Número de Factura: {selectedRecibo.invoiceNumber}</Text>
        <Text>Fecha: {moment(selectedRecibo.inflowDate).format("DD/MM/YYYY HH:mm")}</Text>
        <Text>Método de Pago: {selectedRecibo.paymentMethod}</Text>
        <Text>Estado: {selectedRecibo.status}</Text>

        {/* Línea divisoria */}
        <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginVertical: 10 }} />

        {/* Productos */}
        {selectedRecibo.invoiceProducts.length > 0 && (
          <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
            Productos:
          </Text>
        )}
        {selectedRecibo.invoiceProducts.map((product, index) => (
          <View key={product.id} style={{ marginBottom: 10 }}>
            <Text style={{ fontWeight: "bold", color: 'green' }}>{index + 1}. {product.product.name}</Text>
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
            <Text style={{ fontWeight: "bold", color: 'green' }}>{index + 1}. {service.service.name}</Text>
            <Text><Text style={{ fontWeight: "bold" }}>Cantidad:</Text> {service.quantity}</Text>
            <Text><Text style={{ fontWeight: "bold" }}>Precio Unitario:</Text> {formatCurrency(service.unitPrice)}</Text>
            <Text><Text style={{ fontWeight: "bold" }}>Subtotal:</Text> {formatCurrency(service.subtotal)}</Text>
            <Text><Text style={{ fontWeight: "bold" }}>Total:</Text> {formatCurrency(service.total)}</Text>
          </View>
        ))}

        {/* Línea divisoria */}
        <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginVertical: 10 }} />

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
            <MaterialCommunityIcons name="whatsapp" size={24} color="white" />
            {loadingEmail ? (
              <Text style={{ color: 'white', marginLeft: 5 }}>Enviando...</Text>
            ) : (
              <Text style={{ color: 'white', marginLeft: 5 }}>WhatsApp</Text>
            )}
          </TouchableOpacity>

          {/* Botón de Email */}
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center", backgroundColor: 'blue', padding: 10, borderRadius: 5 }}
            onPress={() => {
              handleSendEmail(selectedRecibo.client.email || '', selectedRecibo, 'RECIBO_PAGO_PRODUCTO_SERVICIO', setloadingEmail);
            }}
          >
            <MaterialCommunityIcons name="email" size={24} color="white" />
            {loadingEmail ? (
              <Text style={{ color: 'white', marginLeft: 5 }}>Enviando...</Text>
            ) : (
              <Text style={{ color: 'white', marginLeft: 5 }}>Email</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Botón para cerrar el screen */}
        <Button title="Cerrar" onPress={() => {/* Aquí pones la lógica para navegar hacia atrás o cerrar el screen */}} />
      </ScrollView>
    </View>
  );
};

export default ReciboDetailScreen;
