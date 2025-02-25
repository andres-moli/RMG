import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Modal, Button, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importar iconos
import SearchUserComponent from '../../components/search/user-input-search';
import { Client, PaymentMethodEnum, StatusInvoice, useCreateProductOutflowMutation } from '../../graphql/generated/graphql';
import Select, { OptionsSelect } from '../../components/input/Select';
import { useProductsQuery, useOrderRepairsTypeQuery } from '../../graphql/generated/graphql'; // Importa tus queries
import { ToastyErrorGraph } from '../../graphql';
import { useColor } from '../../Constants/Color';
import { formatCurrency } from '../../Lib/convertMoney';
const {color} = useColor()
interface ProductoService {
  id: number;
  tipo: 'producto' | 'servicio'; // Nuevo campo para el tipo
  cantidad: number;
  valorUnitario: number;
  descuento: number;
  impuesto: number;
  descripcion: string;
  productoId?: string; // ID del producto seleccionado
  servicioId?: string; // ID del servicio seleccionado
  nombre?: string; // Nombre del producto o servicio
}
const optionsMethod: OptionsSelect[] = [
    { key: PaymentMethodEnum.Transferencia, value: 'TRANSFERENCIA' },
    { key: PaymentMethodEnum.Efectivo, value: 'EFECTIVO' },
    { key: PaymentMethodEnum.Tarjeta, value: 'TARJETA' }
];
const ReciboPagoScreen = () => {
  const [cliente, setCliente] = useState<Client | null>(null); // Estado para almacenar el cliente seleccionado
  const [productosServicios, setProductosServicios] = useState<ProductoService[]>([]); // Estado para almacenar los productos/servicios
  const [createModalVisible, setCreateModalVisible] = useState(false); // Estado para el modal de creación
  const [editModalVisible, setEditModalVisible] = useState(false); // Estado para el modal de edición
  const [currentProducto, setCurrentProducto] = useState<ProductoService | null>(null); // Estado para almacenar el producto/servicio actual (edición)
  const [create] = useCreateProductOutflowMutation()
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodEnum>();
  const [loading, setLoading] = useState(false); // Estado para cargar

  // Queries para productos y servicios
  const { data: productsData, loading: productsLoading } = useProductsQuery({
    variables: {
      where: { isActive: { _eq: 'true' } },
      pagination: { skip: 0, take: 99999999 },
    },
  });

  const { data: serviceData, loading: serviceLoading } = useOrderRepairsTypeQuery({
    variables: {
      where: {},
    },
  });

  // Opciones para productos y servicios
  const optionProductList =
    productsData?.Products.map((p) => ({
      key: p.id,
      value: p.name + ' - ' + formatCurrency(p.salePrice || 0),
      precio: p.salePrice, // Guardar el precio del producto
    })) || [];

  const optionServiceList =
    serviceData?.orderRepairsType
      .filter((s) => s.status)
      .map((p) => ({
        key: p.id,
        value: p.name + ' - ' + formatCurrency(p.costEstimate || 0),
        precio: p.costEstimate, // Guardar el precio del servicio
      })) || [];

  // Función para manejar la selección de un cliente
  const handleSelectClient = (cliente: Client) => {
    setCliente(cliente);
  };

  // Función para abrir el modal de creación
  const openCreateModal = () => {
    setCurrentProducto({
      id: Date.now(),
      tipo: 'producto', // Por defecto, selecciona producto
      cantidad: 1,
      valorUnitario: 0,
      descuento: 0,
      impuesto: 0,
      descripcion: '',
    });
    setCreateModalVisible(true);
  };

  // Función para abrir el modal de edición
  const openEditModal = (producto: ProductoService) => {
    setCurrentProducto(producto);
    setEditModalVisible(true);
  };

  // Función para cerrar los modales
  const closeModal = () => {
    setCreateModalVisible(false);
    setEditModalVisible(false);
    setCurrentProducto(null);
  };

  // Función para guardar el producto/servicio (agregar o actualizar)
  const saveProducto = () => {
    if (currentProducto) {
      if (productosServicios.some((item) => item.id === currentProducto.id)) {
        // Actualizar producto existente
        setProductosServicios((prev) =>
          prev.map((item) => (item.id === currentProducto.id ? currentProducto : item))
        );
      } else {
        // Agregar nuevo producto
        setProductosServicios((prev) => [...prev, currentProducto]);
      }
      closeModal();
    }
  };

  // Función para eliminar un producto/servicio
  const deleteProducto = (id: number) => {
    setProductosServicios((prev) => prev.filter((item) => item.id !== id));
  };

  // Función para calcular el total de una fila
  const calcularTotalFila = (item: ProductoService) => {
    const subtotal = item.cantidad * item.valorUnitario;
    const descuento = (subtotal * item.descuento) / 100;
    const impuesto = (subtotal * item.impuesto) / 100;
    return subtotal - descuento + impuesto;
  };

  // Función para calcular el total general
  const calcularTotalGeneral = () => {
    return productosServicios.reduce((total, item) => total + calcularTotalFila(item), 0);
  };

  // Función para manejar la selección de un producto o servicio
  const handleSelectProductoService = (key: string) => {
    if (currentProducto?.tipo === 'producto') {
      const productoSeleccionado = optionProductList.find((p) => p.key === key);
      if (productoSeleccionado) {
        setCurrentProducto((prev) => ({
          ...prev!,
          productoId: key,
          valorUnitario: productoSeleccionado.precio,
          descripcion: productoSeleccionado.value,
        }));
      }
    } else {
      const servicioSeleccionado = optionServiceList.find((s) => s.key === key);
      if (servicioSeleccionado) {
        setCurrentProducto((prev) => ({
          ...prev!,
          servicioId: key,
          valorUnitario: servicioSeleccionado.precio,
          descripcion: servicioSeleccionado.value,
        }));
      }
    }
  };

  const handleSave = () => {
    if(!paymentMethod){
      Alert.alert('Alerta', 'Por favor selecione un metodo de pago', [
        {
          style: 'default',
          text: 'Aceptar'
        }
      ])
      return
    }
    if(!cliente){
      Alert.alert('Alerta', 'Por favor selecione un cliente', [
        {
          style: 'default',
          text: 'Aceptar'
        }
      ])
      return
    }
    const services = productosServicios.filter((x) => x.tipo == 'servicio').map((v) => {
      return {
        serviceId: v.servicioId || '',
        quantity: v.cantidad,
        discount: v.descuento,
        tax: v.impuesto,
        unitPrice: v.valorUnitario
      }
    })
    const productos = productosServicios.filter((x) => x.tipo == 'producto').map((v) => {
      return {
        productId: v.productoId || '',
        quantity: v.cantidad,
        discount: v.descuento,
        tax: v.impuesto,
        unitPrice: v.valorUnitario
      }
    })
    Alert.alert('ALERTA', '¿Estas seguro que quieres crear el recibo de pago?', [
      {
        text: 'ACEPTAR',
        onPress: async () => {
        console.log({
          clientId: cliente?.id || '',
          inflowDate: new Date(),
          invoiceProducts: productos,
          invoiceServices: services,
          paymentMethod: paymentMethod as PaymentMethodEnum,
          status: StatusInvoice.Pagada,
        })

        setLoading(true);
          try {
            const res = await create({
              variables:{
                createInput: {
                  clientId: cliente?.id || '',
                  inflowDate: new Date(),
                  invoiceProducts: productos,
                  invoiceServices: services,
                  paymentMethod: paymentMethod as PaymentMethodEnum,
                  status: StatusInvoice.Pagada,
                }
              }
            })
            if(res.errors){
              Alert.alert("HUBO UN ERROR", res.errors[0].message, [ {text: 'ACEPTAR', style: 'default'}]);
              return
            }
            Alert.alert("¡Muy bien!", 'El proceso termino con éxito', [ {text: 'ACEPTAR', style: 'default'}]);
          }catch (err) {
            const menssage = ToastyErrorGraph(err as any);
            Alert.alert("HUBO UN ERROR", menssage, [ {text: 'ACEPTAR', style: 'default'},])
          } finally {
            setLoading(false); // Establecer carga en falso al finalizar
          }
        },
        style: 'default',
      },
      {text: 'CANCELAR', style: 'destructive'},
    ]);
  }
  const handleSelectMethod = (selectedOption: PaymentMethodEnum) => {
    setPaymentMethod(selectedOption);
  };
  return (
    <ScrollView style={styles.container}>
      {/* Buscador de clientes */}
      <SearchUserComponent
        onSelectClient={handleSelectClient}
        placeholder="Buscar cliente..."
      />

      {/* Mostrar información del cliente seleccionado */}
      {cliente && (
        <View style={styles.clienteContainer}>
          <Text style={styles.clienteText}>Cliente: {cliente.name} {cliente.lastName}</Text>
        </View>
      )}

      {/* Lista de productos/servicios */}
      {productosServicios.map((item) => (
        <View key={item.id} style={styles.productoContainer}>
          <View style={styles.productoHeader}>
            <Text style={styles.productoDescripcion}>
              {item.tipo === 'producto' ? 'Producto' : 'Servicio'}: {item.descripcion}
            </Text>
            <View style={styles.actionsContainer}>
              <TouchableOpacity onPress={() => openEditModal(item)}>
                <Ionicons name="pencil" size={20} color="#007bff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteProducto(item.id)}>
                <Ionicons name="trash" size={20} color="#dc3545" />
              </TouchableOpacity>
            </View>
          </View>
          <Text>Cantidad: {item.cantidad}</Text>
          <Text>Valor Unitario: {formatCurrency(item.valorUnitario)}</Text>
          <Text>Descuento: {item.descuento}%</Text>
          <Text>Impuesto: {item.impuesto}%</Text>
          <Text style={styles.totalFila}>Total: {formatCurrency(calcularTotalFila(item))}</Text>
        </View>
      ))}
      <Select
          options={optionsMethod}
          placeholder="Método de pago"
          onSelect={(e)=> handleSelectMethod(e as PaymentMethodEnum)}
          selectedOption={paymentMethod}
      />
      {/* Botón para agregar una nueva fila */}
      <TouchableOpacity style={styles.agregarButton} onPress={openCreateModal}>
        <Ionicons name="add" size={20} color={color.white} />
        <Text style={styles.agregarButtonText}>Agregar Producto/Servicio</Text>
      </TouchableOpacity>
      <TouchableOpacity disabled={loading} style={styles.agregarButton} onPress={handleSave}>
        <Ionicons name="save" size={20} color={color.white} />
        {
          loading
          ?
          <ActivityIndicator/>
          :
          <Text style={styles.agregarButtonText}>Guardar recibo</Text>
        }
      </TouchableOpacity>

      {/* Total general */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total General: {formatCurrency(calcularTotalGeneral())}</Text>
      </View>

      {/* Modal de creación */}
      <Modal visible={createModalVisible} animationType="slide" transparent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
           style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Agregar Producto/Servicio</Text>
              <TouchableOpacity onPress={closeModal}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalContent}>
              {/* Selección de tipo (Producto o Servicio) */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Tipo</Text>
                <View style={styles.tipoContainer}>
                  <TouchableOpacity
                    style={[styles.tipoButton, currentProducto?.tipo === 'producto' && styles.tipoButtonActive]}
                    onPress={() =>
                      setCurrentProducto((prev) => ({ ...prev!, tipo: 'producto' }))
                    }
                  >
                    <Text style={styles.tipoButtonText}>Producto</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.tipoButton, currentProducto?.tipo === 'servicio' && styles.tipoButtonActive]}
                    onPress={() =>
                      setCurrentProducto((prev) => ({ ...prev!, tipo: 'servicio' }))
                    }
                  >
                    <Text style={styles.tipoButtonText}>Servicio</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Selección de producto o servicio */}
              <View style={styles.inputGroup}>
                {/* <Text style={styles.label}>
                  {currentProducto?.tipo === 'producto' ? 'Producto' : 'Servicio'}
                </Text> */}
                <Select
                  options={currentProducto?.tipo === 'producto' ? optionProductList : optionServiceList}
                  onSelect={handleSelectProductoService}
                  selectedOption={currentProducto?.tipo === 'producto' ? currentProducto?.productoId : currentProducto?.servicioId}
                  placeholder={`Selecciona un ${currentProducto?.tipo}`}
                />
              </View>

              {/* Campos adicionales */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Cantidad</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Cantidad"
                  keyboardType="numeric"
                  value={currentProducto?.cantidad.toString() || ''}
                  onChangeText={(value) =>
                    setCurrentProducto((prev) => ({ ...prev!, cantidad: Number(value) }))
                  }
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Valor Unitario</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: '#f0f0f0' }]}  // Cambiar el color de fondo para que se vea deshabilitado
                  placeholder="Valor Unitario"
                  editable={false}  // Deshabilitar la edición
                  selectTextOnFocus={false}  // Evitar la selección de texto
                  keyboardType="numeric"
                  value={currentProducto ? formatCurrency(currentProducto?.valorUnitario || 0).toString() : ''}
                  pointerEvents="none"  // Impide cualquier interacción con el campo
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Descuento (%)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Descuento"
                  keyboardType="numeric"
                  value={currentProducto?.descuento.toString() || ''}
                  onChangeText={(value) =>
                    setCurrentProducto((prev) => ({ ...prev!, descuento: Number(value) }))
                  }
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Impuesto (%)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Impuesto"
                  keyboardType="numeric"
                  value={currentProducto?.impuesto.toString() || ''}
                  onChangeText={(value) =>
                    setCurrentProducto((prev) => ({ ...prev!, impuesto: Number(value) }))
                  }
                />
              </View>
            </ScrollView>
            <View style={styles.modalFooter}>
              <Button title="Cancelar" onPress={closeModal} color={color.lightPink} />
              <Button title="Guardar" onPress={saveProducto} color={color.primary}/>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Modal de edición */}
      <Modal visible={editModalVisible} animationType="slide" transparent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Editar Producto/Servicio</Text>
              <TouchableOpacity onPress={closeModal}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalContent}>
              <Text style={styles.label}>
                {currentProducto?.tipo === 'producto' ? 'Producto' : 'Servicio'}: {currentProducto?.descripcion}
              </Text>

              {/* Campos de edición */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Cantidad</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Cantidad"
                  keyboardType="numeric"
                  value={currentProducto?.cantidad.toString() || ''}
                  onChangeText={(value) =>
                    setCurrentProducto((prev) => ({ ...prev!, cantidad: Number(value) }))
                  }
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Valor Unitario</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: '#f0f0f0' }]}  // Cambiar el color de fondo para que se vea deshabilitado
                  placeholder="Valor Unitario"
                  editable={false}  // Deshabilitar la edición
                  selectTextOnFocus={false}  // Evitar la selección de texto
                  keyboardType="numeric"
                  value={currentProducto ? formatCurrency(currentProducto?.valorUnitario || 0).toString() : ''}
                  pointerEvents="none"  // Impide cualquier interacción con el campo
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Descuento (%)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Descuento"
                  keyboardType="numeric"
                  value={currentProducto?.descuento.toString() || ''}
                  onChangeText={(value) =>
                    setCurrentProducto((prev) => ({ ...prev!, descuento: Number(value) }))
                  }
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Impuesto (%)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Impuesto"
                  keyboardType="numeric"
                  value={currentProducto?.impuesto.toString() || ''}
                  onChangeText={(value) =>
                    setCurrentProducto((prev) => ({ ...prev!, impuesto: Number(value) }))
                  }
                />
              </View>
            </ScrollView>
            <View style={styles.modalFooter}>
              <Button title="Cancelar" onPress={closeModal} color="#dc3545" />
              <Button title="Guardar" onPress={saveProducto} color="#007bff" />
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </ScrollView>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  clienteContainer: {
    marginBottom: 10,
  },
  clienteText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productoContainer: {
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  productoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  productoDescripcion: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  agregarButton: {
    backgroundColor: color.primary,
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  agregarButtonText: {
    color: '#fff',
    marginLeft: 10,
  },
  totalContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    paddingTop: 10,
    borderColor: '#ddd',
    alignItems: 'flex-end',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalContent: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  inputGroup: {
    marginBottom: 15,
  },
  tipoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tipoButton: {
    backgroundColor: color.lightBeige,
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  tipoButtonActive: {
    backgroundColor: color.primary,
    color: color.darkGray,
    textShadowColor: color.darkGray
  },
  tipoButtonText: {
    color: color.darkGray,
  },
  tipoButtonTextActive: {
    color: color.darkGray,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalFila: {
    fontWeight: 'bold',
  },
});

export default ReciboPagoScreen;