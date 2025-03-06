import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator, Platform } from 'react-native';
import { useColor } from '../../Constants/Color';
import ClientForm from './CreateClient';
import RepairDetailsForm from './RepairDetailsForm';
import GenerateQR from './Genert';
import { CreateOrderRepairFullInput, useCreateOrderRepairFullMutation, UserDocumentTypes } from '../../graphql/generated/graphql';
import { ToastyErrorGraph } from '../../graphql';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import uploadFile from '../../Lib/uptloadFile';
import UploadProgressModal from './updload';

const { color } = useColor();

const StepProgress = ({navigation}) => {
  const [createRepair] = useCreateOrderRepairFullMutation()
  const [step, setStep] = useState(1);
  const [nextDisabled, setnextDisabled] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const totalSteps = 3;
  const [clientData, setClientData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    numberDocumento: '',
    typeNumberDocument: UserDocumentTypes.CitizenshipCard,
    address: ''
  });
  const [repairData, setRepairData] = useState<any>(null);
  const [qr, setQr] = useState<string>();

  const repairDetailsRef = useRef<any>(null);
  const [loading, setLoading] = useState(false); // Estado para cargar
  
  useEffect(()=>{
    if (clientData.telefono){
      setnextDisabled(true)
    }else {
      setnextDisabled(false)
    }
  }, [clientData])
  const handleNext = () => {
    if (repairDetailsRef.current) {
        Alert.alert('ALERTA', '¿ESTAS SEGURO QUE QUIERES TERMINAR?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => {
          repairDetailsRef.current.handleSubmit()
        }},
      ]);
      return
    }
    setStep(prevStep => Math.min(prevStep + 1, totalSteps));
  };
  const handleFinishCreate = async (data: any) => {
    setLoading(true);
    try {
    const fieldFile = await Promise.all(data.fieldValues.map(async(x) => {
      if(x.valorFotoId){
        const file = {
          uri: Platform.OS === 'ios' ? x.valorFotoId.uri.replace('file://', '') : x.valorFotoId.uri,
          name: `test-file.jpeg`,
          type: x.valorFotoId.mimeType,
        }
        setIsUploading(true);
        setUploadProgress(0);
        const data = await uploadFile(file,setUploadProgress);
        setIsUploading(false);
        setUploadProgress(0);

        if(data?.error){
          throw Error('Hubo un error al subir de archivo')
        }
        return {
          fieldId: x.fieldId,
          valorFotoId: data?.id
        }
      }
      return {
        ...x
      }
    }))
    const dataSend: CreateOrderRepairFullInput = {
      client: {
        name: clientData.nombre,
        lastName: clientData.apellido,
        numberDocument: clientData.numberDocumento,
        celular: clientData.telefono,
        email: clientData.email,
        identificationType: clientData.typeNumberDocument || UserDocumentTypes.CitizenshipCard as UserDocumentTypes,
        address: clientData.address
      },
      repairTypeId: data.repairTypeId,
      fieldValues: fieldFile
    }

    const res = await createRepair({
      variables: {
        createOrderRepairFullInput: dataSend
      }
      })
      if(res.errors){
        Alert.alert("HUBO UN ERROR", res.errors[0].message, [ {text: 'ACEPTAR', style: 'default'}]);
        return
      }
      setQr(res.data?.createOrderRepairFull)
      Alert.alert("¡Muy bien!", 'El proceso termino con éxito', [ {text: 'ACEPTAR', style: 'default'}]);
      setStep(prevStep => Math.min(prevStep + 1, totalSteps));
    } catch (err) {
      const menssage = ToastyErrorGraph(err as any);
      Alert.alert("HUBO UN ERROR", menssage, [ {text: 'ACEPTAR', style: 'default'},])
    } finally {
      setLoading(false);
    }
    // setStep(prevStep => Math.min(prevStep + 1, totalSteps));
  }

  const handlePrevious = () => {
    setStep(prevStep => Math.max(prevStep - 1, 1));
  };
  const handleRepairDataSubmit = (data: any) => {
    setRepairData(data);
    handleFinishCreate(data)
  };
  const renderStepIndicator = () => {
    const indicators = [];
    const stepNames = ['Cliente', 'Reparación', 'QR']; // Nombre de las etapas
    for (let i = 1; i <= totalSteps; i++) {
      indicators.push(
        <View key={i} style={styles.stepContainer}>
          <View style={[styles.stepIndicator, i <= step ? styles.activeStep : null]}>
            <Text style={[styles.stepText, i <= step ? styles.activeStepText : null]}>
              {i.toString()}
            </Text>
          </View>
          <Text style={styles.stepName}>{stepNames[i - 1] || 'Paso'}</Text> 
          { i < totalSteps ? <View style={[styles.line, i < step ? styles.activeLine : null]} /> : null }
        </View>
      );
    }
    return <View style={styles.indicatorContainer}>{indicators}</View>;
  };
  
  

  return (
    <KeyboardAwareScrollView style={styles.container}>
      {renderStepIndicator()}
      {step === 1 && <ClientForm clientData={clientData} setClientData={setClientData} />}
      {step === 2 && <RepairDetailsForm onSubmit={handleRepairDataSubmit} ref={repairDetailsRef}/>}
      {step === 3 && <GenerateQR base64QR={qr}/>}
      <UploadProgressModal visible={isUploading} progress={uploadProgress} />
      <View style={styles.buttonContainer}>
        {step > 1 && step < 3 && (
          <TouchableOpacity onPress={handlePrevious} style={[styles.button, styles.backButton]}>
            <Text style={styles.backButtonText}>Atras</Text>
          </TouchableOpacity>
        )}
        {step < totalSteps ? (
          <TouchableOpacity disabled={!nextDisabled || loading} onPress={handleNext} style={[styles.button, styles.nextButton]}>
            {
              loading
              ?
              <ActivityIndicator color="#fff" />
              :
              <Text style={styles.nextButtonText}>Siguiente</Text>
            }
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={[styles.button, styles.nextButton]}>
            <Text style={styles.nextButtonText}>Terminar</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: color.lightBeige,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '90%',
  },
  stepContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginLeft: 20,
  },
  stepIndicator: {
    width: 35,
    height: 35,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: color.lightPink,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  activeStep: {
    borderColor: color.primary,
    backgroundColor: color.primary,
  },
  stepText: {
    color: '#E7E7E7',
    fontWeight: 'bold',
    fontSize: 16,
  },
  activeStepText: {
    color: 'white',
  },
  stepName: {
    color: color.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  line: {
    width: 20,
    height: 2,
    backgroundColor: '#E7E7E7',
    marginHorizontal: 10,
  },
  activeLine: {
    backgroundColor: color.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 50,
    justifyContent: 'center',
    // width: '90%',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  backButton: {
    backgroundColor: color.lightBeige,
    marginRight: 10,
  },
  backButtonText: {
    color: 'gray',
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: color.primary,
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default StepProgress;
