import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, ActivityIndicator, TouchableOpacity, RefreshControl, Alert, Platform } from 'react-native';
import { useColor } from '../../Constants/Color';
import { RepairField, FieldTypeEnum, OrderRepairty, useOrderRepairQuery, OrderStatusEnum, useUpdateOrderRepairMutation } from '../../graphql/generated/graphql';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ModalQr from './modalQr';
// import DatePickerComponent from '../../components/input/FormDate';
import dayjs from 'dayjs';
import ImageField from './imageComponente';
import { ToastyErrorGraph } from '../../graphql';
import * as Progress from 'react-native-progress'; 
import { makePhoneCall } from '../../Lib/MarquetCell';
import { ModalInvoiceCreate } from './ModalFactureCreate';
import InvoiceModal from './ModalInvoice';
const { color } = useColor();
type BotonesHabilitados = {
  finalizar: boolean;
  cancelar: boolean;
  facturar: boolean;
};
const obtenerHabilitacionBotones = (estado: OrderStatusEnum | undefined): BotonesHabilitados => {
  switch (estado) {
    case OrderStatusEnum.Canceled:
      return {  finalizar: false, cancelar: false, facturar: false };

    case OrderStatusEnum.InProgress:
      return {  finalizar: true, cancelar: false, facturar: false };

    case OrderStatusEnum.Completed:
      return {  finalizar: false, cancelar: false, facturar: true };
    case OrderStatusEnum.Pending:
      return { finalizar: true, cancelar: true, facturar: false };

      default:
      return { finalizar: false, cancelar: false, facturar: false };
  }
};
const RepairDetailScreen = ({ route }: any) => {
  // Desestructuramos los datos pasados por el padre (supongo que los pasas por route params)
  const { orderRepairId } = route.params;
  const [loadingU, setLoading] = useState(false); // Estado para cargar
  
  const { data, loading, refetch } = useOrderRepairQuery({
    variables: {
      orderRepairId: orderRepairId,
    },
    fetchPolicy: 'no-cache'
  });
  const orderRepair = data?.orderRepair || {} as OrderRepairty;
  const [openModal, setOpenModal] = useState(false);
  const [modalVisibleFactura, setModalVisibleFactura] = useState(false);
  const [modalVisibleFacturaEmiter, setmodalVisibleFacturaEmiter] = useState(false);

  const [formValues, setFormValues] = useState<any>({}); // Valores del formulario
  const [errors, setErrors] = useState<any>({}); // Errores del formulario
  const [successMessage, setSuccessMessage] = useState<string>(''); // Mensaje de éxito
  const [updateStatus] = useUpdateOrderRepairMutation()
  useEffect(() => {
    if (orderRepair?.fieldValues) {
      // Inicializar los valores del formulario con los valores existentes
      const initialValues: any = {};
      orderRepair.fieldValues.forEach((fieldValue) => {
        let value
        switch (fieldValue.field.type) {
          case FieldTypeEnum.Text:
            value = fieldValue.valorTexto
            break;
          case FieldTypeEnum.Number:
            value = fieldValue.valorNumerico
            break;
          case FieldTypeEnum.LongText:
            value = fieldValue.valorTextoLargo
            break;
          case FieldTypeEnum.Date:
            value = fieldValue.valorFecha
            break;
          case FieldTypeEnum.Image:
            value = fieldValue.valorFoto
            break;
          // case FieldTypeEnum.Select:
          //   break;
          // case FieldTypeEnum.Checkbox:
          //   break;
          // case FieldTypeEnum.Radio:
          //   break;
          // case FieldTypeEnum.Signature:
          //   break;
          default:
            break;
        }        
        initialValues[fieldValue.field.id] = value
      });
      setFormValues(initialValues);
    }
  }, [orderRepair]);

  const handleChange = (fieldId: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };
  const { finalizar, cancelar, facturar } = obtenerHabilitacionBotones(orderRepair.status);
  const handleFinallyCita = () => {
    Alert.alert('ALERTA', '¿Estas seguro que quieres actualizar el estado a finalizada?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },

      {
        text: 'OK', onPress: () => {
          handleUpdateStatus(OrderStatusEnum.Completed)
      }},
    ])
  }

  const handleCancelCita = () => {
    Alert.alert('ALERTA', '¿Estas seguro que quieres actualizar el estado a cancelada?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },

      {
        text: 'OK', onPress: () => {
          handleUpdateStatus(OrderStatusEnum.Canceled)
      }},
    ])
  }
  const handleUpdateStatus = async (status: OrderStatusEnum) => {
    try {
      setLoading(true)
      const res = await updateStatus({
        variables: {
          updateInput: {
            id: orderRepairId,
            status
          }
        }
      })
      if(res.errors){
        Alert.alert("HUBO UN ERROR", res.errors[0].message, [ {text: 'ACEPTAR', style: 'default'}]);
        return
      }
      if(status === OrderStatusEnum.Completed){
        Alert.alert("¡Muy bien!", 'El proceso termino con éxito, desea crear Recibo de pago', 
          [ 
            {
              text: 'Crear Recibo de pago', 
              style: 'default',
              onPress: () => {
                setModalVisibleFactura(true)
              }
            },
            {
              text: 'No Crear', 
              style: 'cancel',
              onPress: async () => {
                await refetch()
              }
            }
          ]
        );
        return
      }
      Alert.alert("¡Muy bien!", 'El proceso termino con éxito', [ {text: 'ACEPTAR', style: 'default'}]);
      refetch()
    }catch (err){
      const menssage = ToastyErrorGraph(err as any);
      Alert.alert("HUBO UN ERROR", menssage, [ {text: 'ACEPTAR', style: 'default'},])
    }
    finally {
      setLoading(false)
    }
    
  }
  const renderField = (field: RepairField) => {
    const value = formValues[field.id] || '';
    const error = errors[field.id];
    switch (field.type) {
      case FieldTypeEnum.Text:
        return (
          <View key={field.id} style={styles.inputContainer}>
            <Text style={styles.label}>{field.name}</Text>
            <TextInput
              style={[styles.input, error ? styles.inputError : null]}
              placeholder={field.name}
              value={value}
              onChangeText={(text) => handleChange(field.id, text)}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>
        );
      case FieldTypeEnum.Number:
        return (
          <View key={field.id} style={styles.inputContainer}>
            <Text style={styles.label}>{field.name}</Text>
            <TextInput
              style={[styles.input, error ? styles.inputError : null]}
              placeholder={field.name}
              value={value ? value.toString() : ''}
              onChangeText={(text) => handleChange(field.id, text.replace(/\D/g, ''))} // Asegurarse de que solo se ingrese números
              keyboardType="numeric"
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>
        );
    case FieldTypeEnum.LongText:
      return (
        <View key={field.id} style={styles.inputContainer}>
          <TextInput
            style={[styles.input, styles.textArea, error ? styles.inputError : null]}
            placeholder={field.name}
            value={value}
            onChangeText={(text) => handleChange(field.id, text)}
            multiline={true}
            numberOfLines={4}
          />
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      );
    case FieldTypeEnum.Date:
      return null
      if(value){
        return (
          <View key={field.id} style={styles.inputContainer}>
            <DatePickerComponent 
              label={field.name} 
              onDateChange={(date)=> {
                handleChange(field.id, date.toISOString());
                // setDatePickerVisibility(false);
              }}
              mode='day'
              dateDefualt={dayjs(value).toDate()}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>
        );
      }
      return
      case FieldTypeEnum.Image:
        return (
          <ImageField 
            key={field.id} 
            field={field} 
            value={value.url} 
            onChange={(val) => handleChange(field.id, val)} 
          />
        );
      default:
        return null;
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors: any = {};

    orderRepair?.repairType?.fields?.forEach((field: RepairField) => {
      if (field.isRequired && !formValues[field.id]) {
        valid = false;
        newErrors[field.id] = `${field.name} es obligatorio.`;
      }
    });

    setErrors(newErrors);
    return valid;
  };
  const [refreshing, setRefreshing] = useState(false);

  const handleSubmit = () => {
    if (validateForm()) {
      setSuccessMessage('Formulario enviado correctamente.');
      console.log('Formulario válido, enviar datos:', formValues);
    }
  };
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch()
    setRefreshing(false);

  }
  return (
    <KeyboardAwareScrollView
     refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
     style={styles.container} keyboardShouldPersistTaps="handled">
      {loading ? (
        <ActivityIndicator size="large" color={color.primary} />
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Detalles de la Reparación</Text>
          </View>
          {
            loadingU && (
              <View style={styles.progressContainer}>
              <Progress.Bar
                progress={0.5} // Progreso de la barra
                width={null} // Se ajusta al 100% de la pantalla
                indeterminate={true} // La barra se muestra como indefinida mientras carga
                color={color.primary} // Color de la barra
                borderWidth={0} // Sin borde alrededor de la barra
              />
            </View>
            )
          }

          {/* Información del Cliente */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Información del Cliente</Text>
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>
                <MaterialIcons name="person" size={18} color={color.primary} />
                {' '}
                <Text style={styles.bold}>Cliente:</Text> {orderRepair.client.name} {orderRepair.client.lastName}
              </Text>
              <Text style={styles.cardText}>
                <MaterialIcons name="email" size={18} color={color.primary} />
                {' '}
                <Text style={styles.bold}>Email:</Text> {orderRepair.client.email}
              </Text>
              <Text style={styles.cardText}>
                <MaterialIcons name="phone" size={18} color={color.primary} />
                {' '}
                <Text style={styles.bold} onPress={() => makePhoneCall(orderRepair.client.celular)}>Celular: {orderRepair.client.celular}</Text> 
              </Text>
              <Text style={styles.cardText}>
                <MaterialIcons name="location-on" size={18} color={color.primary} />
                {' '}
                <Text style={styles.bold}>Dirección:</Text> {orderRepair.client.address}
              </Text>
            </View>
          </View>

          {/* Información de la Reparación */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Detalles de la Reparación</Text>
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>
                <MaterialIcons name="build" size={18} color={color.primary} />
                {' '}
                <Text style={styles.bold}>Tipo de Reparación:</Text> {orderRepair.repairType.name}
              </Text>
              <Text style={styles.cardText}>
                <MaterialIcons name="access-time" size={18} color={color.primary} />
                {' '}
                <Text style={styles.bold}>Fecha de Creación:</Text> {new Date(orderRepair.createdAt).toLocaleDateString()}
              </Text>
              <Text style={styles.cardText}>
                <MaterialIcons name="money" size={18} color={color.primary} />
                {' '}
                <Text style={styles.bold}>Costo Estimado:</Text> ${orderRepair.repairType.costEstimate}
              </Text>
              <Text style={styles.cardText}>
                <MaterialIcons name="settings" size={18} color={color.primary} />
                {' '}
                <Text style={styles.bold}>Esatado:</Text> {orderRepair.status}
              </Text>
            </View>
          </View>
            {/* Botones de acción */}
            <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => {setOpenModal(true)}} style={styles.iconButton}>
              <MaterialCommunityIcons name="qrcode" color={ color.primary} size={40} />
              <Text style={styles.textButton}>Ver QR</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={!finalizar} onPress={() => {handleFinallyCita()}} style={styles.iconButton}>
              <MaterialCommunityIcons name="play-pause" color={!finalizar ? color.darkGray : color.primary} size={40} />
              <Text style={styles.textButton}>FINALIZAR</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={!cancelar} onPress={() => {handleCancelCita()}} style={styles.iconButton}>
              <MaterialCommunityIcons name="close-circle" color={!cancelar ? color.darkGray : color.primary} size={40} />
              <Text style={styles.textButton}>CANCELAR</Text>
            </TouchableOpacity>
            {
              orderRepair.invoice ?
              <TouchableOpacity onPress={() => {setmodalVisibleFacturaEmiter(true)}} style={styles.iconButton}>
                <MaterialCommunityIcons name="cash-register" color={!facturar ? color.darkGray : color.primary}size={40} />
                <Text style={styles.textButton}>Ver recibo</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity disabled={!facturar} onPress={() => {setModalVisibleFactura(true)}} style={styles.iconButton}>
              <MaterialCommunityIcons name="cash-check" color={!facturar ? color.darkGray : color.primary}size={40} />
              <Text style={styles.textButton}>RECIBO DE PAGO</Text>
            </TouchableOpacity>
            }
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Formulario de Reparación</Text>
            {orderRepair?.repairType?.fields?.map((field: RepairField) => renderField(field))}
            {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}

            <View style={styles.buttonContainer}>
              <Text style={styles.submitButton} onPress={handleSubmit}>
                Enviar
              </Text>
            </View>
          </View>
        </>
      )}
      <ModalQr 
        isVisible={openModal}
        closeModal={()=> setOpenModal(false)}
        idRepair={orderRepairId}
      />
      <ModalInvoiceCreate
        orderReapair={data?.orderRepair}
        closeModal={()=> setModalVisibleFactura(false)}
        isVisible={modalVisibleFactura}
        onRefresh={onRefresh}
        key={data?.orderRepair.id}
      />
      <InvoiceModal
        key={data?.orderRepair.invoice?.id}
        invoice={data?.orderRepair.invoice}
        isVisible={modalVisibleFacturaEmiter}
        onClose={()=> {setmodalVisibleFacturaEmiter(false)}}
      />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.lightBeige,
    padding: 20,
  },
  scrollViewContainer: {
    padding: 20,
    flexGrow: 1,
  },
  header: {
    marginBottom: 20,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    backgroundColor: color.white,
    margin: 10,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    paddingVertical: 10,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1, // Asegura que la barra esté encima del WebView
    paddingTop: Platform.OS === 'ios' ? 20 : 0, // Espaciado superior para iOS
  },
  textButton: {
    fontSize: 14,
    color: color.darkGray,
    marginTop: 8,
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: color.primary,
    marginBottom: 10,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: color.primary,
    marginBottom: 10,
  },
  cardContent: {
    paddingLeft: 10,
  },
  cardText: {
    fontSize: 16,
    color: color.primary,
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: color.primary,
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: color.primary,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: color.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    fontSize: 16,
    color: color.primary,
    width: '100%',
  },
  inputError: {
    borderColor: color.lightPink,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 5,
  },
  successMessage: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  submitButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: color.primary,
    color: 'white',
    borderRadius: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RepairDetailScreen;
