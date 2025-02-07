import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Keyboard, ActivityIndicator } from 'react-native';
import { useColor } from '../../Constants/Color';
import Select, { OptionsSelect } from '../../components/input/Select';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFindOneByDocumentNumberLazyQuery, useFindOneByNumberPhoneLazyQuery, UserDocumentTypes } from '../../graphql/generated/graphql';

const { color } = useColor();

const typeDocumentsOptions: OptionsSelect[] = [
  {
    key: UserDocumentTypes.CitizenshipCard,
    value: "Cedula de ciudadania"
  },
  {
    key: UserDocumentTypes.IdentityCard,
    value: "Tarjeta de identidad"
  },
  {
    key: UserDocumentTypes.Nit,
    value: "Nit"
  },
  {
    key: UserDocumentTypes.SpecialPermissionToStay,
    value: "Permiso de permanencia espacial"
  },
]
interface ClientData {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  numberDocumento: string;
  typeNumberDocument: string;
  address: string;
}

interface ClientFormProps {
  clientData: ClientData;
  setClientData: React.Dispatch<React.SetStateAction<ClientData>>;
}
const ClientForm: React.FC<ClientFormProps> = ({ clientData, setClientData }) => {
  const [findOneClient, { loading }] = useFindOneByDocumentNumberLazyQuery();
  const [findOneClientByNumberQuery, { loading: loadingPhone }] = useFindOneByNumberPhoneLazyQuery();


  const handleInputChange = (name: string, value: string) => {
    setClientData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const findOneClientHandle = async () => {
    if (!clientData.numberDocumento.trim()) return;

    try {
      const { data } = await findOneClient({
        variables: { numberDocument: clientData.numberDocumento },
        fetchPolicy: 'no-cache'
      });

      if (data?.findOneByDocumentNumber) {
        const client = data.findOneByDocumentNumber;
        setClientData({
          nombre: client.name,
          apellido: client.lastName || '',
          email: client.email,
          telefono: client.celular,
          numberDocumento: client.numberDocument,
          typeNumberDocument: client.identificationType || '',
          address: client.address || ''
        });
      } else {
        setClientData((prev) => ({
          nombre: '',
          apellido: '',
          email: '',
          telefono: prev.telefono,
          numberDocumento: prev.numberDocumento, // Mantener solo el número de documento
          typeNumberDocument: '',
          address: ''
        }));
      }
    } catch (error) {
      console.error('Error fetching client:', error);
    }
  };
  const findOneClientByNumber = async () => {
    if (!clientData.telefono.trim()) return;

    try {
      const { data } = await findOneClientByNumberQuery({
        variables: { numberPhone: clientData.telefono },
        fetchPolicy: 'no-cache'
      });

      if (data?.findOneByNumberPhone) {
        const client = data.findOneByNumberPhone;
        setClientData({
          nombre: client.name,
          apellido: client.lastName || '',
          email: client.email,
          telefono: client.celular,
          numberDocumento: client.numberDocument,
          typeNumberDocument: client.identificationType || '',
          address: client.address || ''
        });
      } else {
        setClientData((prev) => ({
          nombre: '',
          apellido: '',
          email: '',
          telefono: prev.telefono,
          numberDocumento: prev.numberDocumento, // Mantener solo el número de documento
          typeNumberDocument: '',
          address: ''
        }));
      }
    } catch (error) {
      console.error('Error fetching client:', error);
    }
  };
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollViewContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.formContainer}>
        <Text style={styles.textPlaceholder}>Número de documento</Text>
        <TextInput
          style={[styles.input]}
          value={clientData.numberDocumento}
          placeholder="Número de documento"
          onChangeText={(text) => handleInputChange('numberDocumento', text)}
          onBlur={() => {
            Keyboard.dismiss();
            findOneClientHandle();
          }}
          keyboardType="numeric"
        />
        <Text style={styles.textPlaceholder}>Celular</Text>
        <TextInput
          style={[styles.input]}
          value={clientData.telefono || ''}
          placeholder="Celular"
          onChangeText={(text) => 
            {
              handleInputChange('telefono', text)
            }}
          onBlur={() => {
            Keyboard.dismiss();
            findOneClientByNumber();
          }}
          keyboardType="phone-pad"
        />
        {loading  || loadingPhone && <ActivityIndicator size="small" color={color.primary} />}

        <Select
          onSelect={(text) => handleInputChange('typeNumberDocument', text)}
          options={typeDocumentsOptions}
          selectedOption={clientData.typeNumberDocument || ''}
          placeholder="Seleccione un tipo de documento"
        />


        <Text style={styles.textPlaceholder}>Nombres</Text>
        <TextInput
          style={[styles.input]}
          value={clientData.nombre || ''}
          placeholder="Nombres"
          onChangeText={(text) => handleInputChange('nombre', text)}
        />

        <Text style={styles.textPlaceholder}>Apellidos</Text>
        <TextInput
          style={[styles.input]}
          value={clientData.apellido || ''}
          placeholder="Apellidos"
          onChangeText={(text) => handleInputChange('apellido', text)}
        />

        <Text style={styles.textPlaceholder}>Correo</Text>
        <TextInput
          style={[styles.input]}
          value={clientData.email || ''}
          placeholder="Correo"
          onChangeText={(text) => handleInputChange('email', text)}
          keyboardType="email-address"
        />

        <Text style={styles.textPlaceholder}>Dirreción</Text>
        <TextInput
          style={[styles.input]}
          value={clientData.address || ''}
          placeholder="Dirreción"
          onChangeText={(text) => handleInputChange('address', text)}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.lightBeige,
  },
  scrollViewContainer: {
    padding: 20,
    flexGrow: 1,
  },
  formContainer: {
    width: '100%',
    borderRadius: 10,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: color.primary,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  textPlaceholder: {
    fontSize: 16,
    color: color.primary,
    fontWeight: 'bold',
  },
});

export default ClientForm;
