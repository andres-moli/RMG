import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import GenerateQR from "../Add/Genert";
import { useGenrateQrByRepairQuery } from "../../graphql/generated/graphql";
import { useColor } from "../../Constants/Color";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const { color } = useColor();

interface ModalQrType {
    isVisible: boolean;
    closeModal: () => void;
    idRepair: string;
}
const ModalQr = ({
    closeModal,
    isVisible,
    idRepair
}:ModalQrType ) => {
    const {data, loading} = useGenrateQrByRepairQuery({
        variables: {
            idRepair: idRepair
        }
    })
    return (
        <Modal
        visible={isVisible}
        animationType="slide"
        // transparent={true}
        onRequestClose={closeModal}
        >
        <TouchableOpacity 
                style={styles.modalBackground} 
                activeOpacity={1} 
                onPress={closeModal}
            >
            <TouchableOpacity style={{}} onPress={closeModal}>
                <MaterialCommunityIcons name="close" size={24} color={color.primary} />
            </TouchableOpacity>
            {
                loading 
                ?
                <Text>Cargando</Text>
                :
                <View>
                    <GenerateQR base64QR={data?.genrateQrByRepair}/>
                </View>
            }
        </TouchableOpacity>
        </Modal>
    )
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
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 5,
    }
})
export default ModalQr