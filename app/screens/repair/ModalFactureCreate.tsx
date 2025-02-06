import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import { OrderRepairty, PaymentMethodEnum, StatusInvoice, useCreateInvoiceMutation } from "../../graphql/generated/graphql";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Select, { OptionsSelect } from "../../components/input/Select";
import { useColor } from "../../Constants/Color";
import { useState, useEffect } from "react";
import { formatCurrency } from "../../Lib/convertMoney";
import DatePickerComponent from "../../components/input/FormDate";
import { ToastyErrorGraph } from "../../graphql";

const { color } = useColor();

interface ModalInvoiceCreateType {
    isVisible: boolean;
    closeModal: () => void;
    orderReapair: OrderRepairty;
    onRefresh: () => void;
}

export const ModalInvoiceCreate = ({
    orderReapair,
    closeModal,
    isVisible,
    onRefresh
}: ModalInvoiceCreateType) => {
    if(!orderReapair) return
    const optionsMethod: OptionsSelect[] = [
        { key: PaymentMethodEnum.Transferencia, value: 'TRANSFERENCIA' },
        { key: PaymentMethodEnum.Efectivo, value: 'EFECTIVO' },
        { key: PaymentMethodEnum.Tarjeta, value: 'TARJETA' }
    ];
    // const optionsStatus: OptionsSelect[] = [
    //     { key: StatusInvoice.Pagada, value: 'PAGADA' },
    //     { key: StatusInvoice.Pendiente, value: 'PENDIENTE' }
    // ];
    const subTotalPrice = orderReapair.repairType.costEstimate || 0;
    const [showDate, setShowDate] = useState(false);
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethodEnum>();
    const [status, setStatus] = useState<StatusInvoice>();
    const [subtotal, setSubtotal] = useState(subTotalPrice);
    const [discount, setDiscount] = useState(0);
    const [tax, setTax] = useState(0);
    const [total, setTotal] = useState(0);
    const [description, setDescription] = useState('');
    const [createInvoice] = useCreateInvoiceMutation()
    const [loading, setLoading] = useState(false); // Estado para cargar
    // Función para calcular el total
    const calculateTotal = () => {
        const discountAmount = (subtotal * (discount / 100)); // Calcular descuento
        const taxAmount = (subtotal * (tax / 100)); // Calcular impuesto
        const calculatedTotal = subtotal - discountAmount + taxAmount; // Total = subtotal - descuento + impuesto
        setTotal(calculatedTotal); // Actualizar el estado total
    };
    const handleSelectMethod = (selectedOption: PaymentMethodEnum) => {
        setPaymentMethod(selectedOption);
    };

    const create = () => {
        Alert.alert('ALERTA', '¿Estas seguro que quieres crear el recibo de pago?', [
            {
              text: 'ACEPTAR',
              onPress: async () => {
                await handleCreate()
              },
              style: 'default',
            },
            {text: 'CANCELAR', style: 'destructive'},
          ]);
    }
    // Función para validar datos y crear la factura
    const handleCreate = async () => {
        if (!paymentMethod) {
            Alert.alert("Error", "Por favor, selecciona un método de pago.");
            return;
        }
        if (discount < 0 || discount > 100) {
            Alert.alert("Error", "El descuento debe estar entre 0 y 100.");
            return;
        }
        if (tax < 0 || tax > 100) {
            Alert.alert("Error", "El impuesto debe estar entre 0 y 100.");
            return;
        }
        setLoading(true);
        try {
            const res = await createInvoice({
                variables: {
                    createInput:{
                        dueDate,
                        paymentMethod,
                        subtotal,
                        discount,
                        tax,
                        total,
                        description,
                        status: StatusInvoice.Elaborada,
                        orderRepairId: orderReapair.id,
                        clienteId: orderReapair.client.id,
                        issueDate: new Date()
                    }
                }
            })
            if(res.errors){
                Alert.alert("HUBO UN ERROR", res.errors[0].message, [ {text: 'ACEPTAR', style: 'default'}]);
                return
            }
            await onRefresh()
            Alert.alert("¡Muy bien!", 'El proceso termino con éxito', [ {text: 'ACEPTAR', style: 'default'}]);
        }catch(err){
            const menssage = ToastyErrorGraph(err as any);
            Alert.alert("HUBO UN ERROR", menssage, [ {text: 'ACEPTAR', style: 'default'},])
        }finally {
            setLoading(false); // Establecer carga en falso al finalizar
            closeModal(); // Cerrar el modal después de crear la factura
        }

    };

    // Efecto para recalcular el total cada vez que cambie el subtotal, impuesto o descuento
    useEffect(() => {
        calculateTotal();
    }, [subtotal, discount, tax]); // Dependencias que causan el recalculo

    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={closeModal}
        >
            <View style={styles.modalBackground}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.modalContent}
                >
                    <ScrollView
                        contentContainerStyle={{ paddingBottom: 20 }}
                        showsVerticalScrollIndicator={false}
                    >
                        <MaterialCommunityIcons name="cash-check" size={40} color={color.primary} style={styles.modalIcon} />
                        <Text style={styles.modalTitle}>Crear recibo de pago</Text>

                        <Text style={styles.label}>Sub Total</Text>
                        <TextInput editable={false} value={formatCurrency(subtotal)} style={styles.input} />

                        <Text style={styles.label}>% Impuesto</Text>
                        <TextInput 
                            style={styles.input} 
                            value={tax.toString()} 
                            onChangeText={text => setTax(Number(text))} // Convertir texto a número
                            placeholderTextColor={color.lightBeige} 
                            keyboardType="numeric" 
                        />

                        <Text style={styles.label}>- Descuento</Text>
                        <TextInput 
                            style={styles.input} 
                            value={discount.toString()} 
                            onChangeText={text => setDiscount(Number(text))} // Convertir texto a número
                            placeholderTextColor={color.lightBeige} 
                            keyboardType="numeric" 
                        />

                        <Text style={styles.label}>Total a pagar</Text>
                        <TextInput 
                            editable={false} 
                            value={formatCurrency(total)} // Mostrar el total calculado
                            style={styles.input} 
                            keyboardType="numeric" 
                        />

                        <Select
                            options={optionsMethod}
                            placeholder="Método de pago"
                            onSelect={(e)=> handleSelectMethod(e as PaymentMethodEnum)}
                            selectedOption={paymentMethod}
                        />
                        <View style={{paddingBottom: 10}}></View>

                        {/* <Select
                            options={optionsStatus}
                            placeholder="Estado del pago"
                            onSelect={handleSelectStatus}
                        /> */}
                        {
                            showDate 
                            ? <DatePickerComponent
                                mode="day"
                                label="Fecha máxima a pagar"
                                onDateChange={(value) => { setDueDate(value); }}
                            />
                            : null
                        }

                        <Text style={styles.label}>Descripción</Text>
                        <TextInput
                            placeholderTextColor={color.lightBeige} 
                            style={styles.textArea}
                            multiline
                            numberOfLines={4}
                            placeholder="Ej: De"
                            blurOnSubmit={true}
                            returnKeyType="next"
                            value={description}
                            onChangeText={setDescription}
                        />

                        <TouchableOpacity style={styles.saveButton} onPress={create}>
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.saveButtonText}>Guardar</Text>
                            )}
                        </TouchableOpacity>            
                        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                            <Text style={styles.saveButtonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    modalIcon: {
        alignSelf: 'center',
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: color.primary,
        marginBottom: 15,
        textAlign: 'center',
    },
    label: {
        fontWeight: 'bold',
        color: color.primary,
        marginTop: 10,
    },
    input: {
        height: 45,
        borderColor: color.primary,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    saveButton: {
        backgroundColor: color.primary,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: color.lightPink,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    textArea: {
        height: 100,
        borderColor: color.primary,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
});
