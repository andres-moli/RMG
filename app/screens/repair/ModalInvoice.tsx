import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Modal, 
  Animated, 
  Dimensions, 
  ActivityIndicator 
} from "react-native";
import { Invoice, StatusInvoice } from "../../graphql/generated/graphql";
import { formatCurrency } from "../../Lib/convertMoney";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColor } from "../../Constants/Color";
import { downloadAndShareInvoice } from "../../Lib/genarteInvoicePdf";

const { height } = Dimensions.get("window");
const { color } = useColor();
interface InvoiceScreenProps {
  invoice: Invoice;
  isVisible: boolean;
  onClose: () => void;
}

const InvoiceModal: React.FC<InvoiceScreenProps> = ({ invoice, isVisible, onClose }) => {
  if(!invoice) return
  const slideAnim = React.useRef(new Animated.Value(height)).current;

  React.useEffect(() => {
    if (isVisible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);
  const [loadingGenrate, setModalVisibleFactura] = useState(false);
  const handleloadingGenrate = async () => {
    setModalVisibleFactura(true)
    await downloadAndShareInvoice(invoice)
    setModalVisibleFactura(false)

  }
  
  return (
    <Modal transparent visible={isVisible} animationType="fade">
      <View style={styles.modalBackground}>
        <Animated.View style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}>
          <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <>
                <View style={styles.header}>
                  <View style={styles.row}>
                    <Text style={styles.invoiceLabel}>Factura #</Text>
                    <Text style={styles.invoiceValue}>{invoice.invoiceNumber}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.invoiceLabel}>Fecha:</Text>
                    <Text style={styles.invoiceValue}>
                      {new Date(invoice.issueDate).toLocaleDateString()}
                    </Text>
                  </View>
                    {/* Estado de la factura */}
                    <View style={styles.row}>
                        <Text style={styles.invoiceLabel}>Estado:</Text>
                        <Text style={[styles.invoiceValue, 
                        { color:     color.primary }
                        ]}>
                        {invoice.status}
                        </Text>
                    </View>
                  </View>
                <Section title="Detalles del Cliente">
                  <LabelValue label="Nombre" value={invoice.cliente?.name + ' ' + invoice.cliente?.lastName} />
                  <LabelValue label="Email" value={invoice.cliente?.email} />
                  <LabelValue
                    label="Teléfono"
                    value={`${invoice.cliente?.celular || ""}`}
                  />
                </Section>

                <Section title="Servicio Principal">
                    <LabelValue label="Nombre" value={invoice.orrderReapirty?.repairType?.name} />
                    <LabelValue label="Precio" value={formatCurrency(invoice.orrderReapirty?.repairType?.costEstimate)} />
                </Section>
                <Section title="Descripción">
                    <Text style={styles.invoiceLabel}>{invoice.description}</Text>
                </Section>

                <View style={styles.totalsSection}>
                  <TotalRow label="Subtotal" value={invoice.subtotal || 0} />
                  <TotalRow label={`Impuesto (${invoice.tax}%)`} value={invoice.subtotal * (invoice.tax / 100)} />
                  <TotalRow label={`Descuento (${invoice.discount}%)`} value={-(invoice.subtotal * (invoice.discount / 100))} />
                  <TotalRow label="Total a Pagar" value={invoice.total || 0} />
                </View>
              </>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <MaterialCommunityIcons name="close-circle" size={24} color="#fff" />
                  <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
          <TouchableOpacity  disabled={loadingGenrate} style={styles.closeButton} onPress={handleloadingGenrate}>
              <MaterialCommunityIcons name="share-all" size={24} color="#fff" />
                {
                  loadingGenrate
                  ?
                  <ActivityIndicator color={'#fff'}/>
                  :
                  <Text style={styles.closeButtonText}>Compartir</Text>
                }
          </TouchableOpacity>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const Section: React.FC<{ title: string }> = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const LabelValue: React.FC<{ label: string; value?: string }> = ({ label, value }) => (
  <View style={styles.labelRow}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value || "N/A"}</Text>
  </View>
);

const TotalRow: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <View style={styles.totalRow}>
    <Text style={styles.totalLabel}>{label}:</Text>
    <Text style={styles.totalValue}>{formatCurrency(value)}</Text>
  </View>
);

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: color.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: height * 0.85,
  },
  container: {
    paddingBottom: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: color.darkGray,
  },
  errorText: {
    color: color.primary,
    textAlign: "center",
    marginTop: 20,
  },
  header: {
    marginBottom: 20,
  },
  companyName: {
    fontSize: 24,
    fontWeight: "bold",
    color: color.primary,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  invoiceLabel: {
    fontWeight: "600",
    color: color.darkGray,
  },
  invoiceValue: {
    color: color.darkGray,
  },
  section: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: color.lightBeige,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: color.primary,
    marginBottom: 10,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: {
    fontWeight: "600",
    color: color.darkGray,
  },
  value: {
    color: color.darkGray,
  },
  totalsSection: {
    marginTop: 20,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  totalLabel: {
    fontWeight: "600",
  },
  totalValue: {
    fontWeight: "600",
    color: color.primary,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: color.primary,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: color.white,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default InvoiceModal;
