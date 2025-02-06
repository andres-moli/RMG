import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { useColor } from '../../Constants/Color';
import { CustomFieldValue, FieldTypeEnum, OrderTypes, RepairField, useOrderRepairsTypeQuery } from '../../graphql/generated/graphql';
import Select, { OptionsSelect } from '../../components/input/Select';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
// import DatePickerComponent from '../../components/input/FormDate';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import mime from 'mime';
const { color } = useColor();

const RepairDetailsForm = forwardRef(({ onSubmit }: { onSubmit: (data: any) => void }, ref: any) => {
  const [selectTypeReaip, setselectTypeReaip] = useState<string | undefined>();
  const [fields, setFields] = useState<RepairField[]>([]); // Almacenar los campos dinámicos
  const [formValues, setFormValues] = useState<any>({}); // Valores del formulario
  const [errors, setErrors] = useState<any>({}); // Errores del formulario
  const [refreshing, setRefreshing] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const handleChange = (fieldId: string, value: string | any, isFile = false) => {
    if(isFile){
      setFormValues((prev) => ({
        ...prev,
        [fieldId]: value,
      }));
      return
    }
    
    setFormValues((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const { data, loading, refetch } = useOrderRepairsTypeQuery({
    variables: {
      orderBy: {
        createdAt: OrderTypes.Desc,
      },
    },
  });

  const repairsType = data?.orderRepairsType || [];
  const option: OptionsSelect[] = repairsType.map((re) => {
    return {
      key: re.id,
      value: re.name,
    };
  });

  // Manejar la selección del tipo de reparación
  useEffect(() => {
    if (selectTypeReaip) {
      const selectedRepair = repairsType.find((repair) => repair.id === selectTypeReaip);
      if (selectedRepair) {
        setFields(selectedRepair.fields || []);
      }
    }
  }, [selectTypeReaip, repairsType]);

  // Función para renderizar el componente adecuado según el tipo de campo
  const renderField = (field: RepairField) => {
    const value = formValues[field.id] || '';
    const error = errors[field.id];
    switch (field.type) {
      case FieldTypeEnum.Text:
        return (
          <View key={field.id} style={styles.inputContainer}>
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
            <TextInput
              style={[styles.input, error ? styles.inputError : null]}
              placeholder={field.name}
              value={value}
              onChangeText={(text) => handleChange(field.id, text)}
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
        return (
          <View key={field.id} style={styles.inputContainer}>
            <DatePickerComponent 
              label={field.name} 
              onDateChange={(date)=> {
                handleChange(field.id, date.toISOString());
                // setDatePickerVisibility(false);
              }}
              mode='day'
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>
        );
      case FieldTypeEnum.Image:

      const MAX_FILE_SIZE_MB = 3; // Tamaño máximo en MB
      const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024; // Convertir MB a bytes
      
      const isValidFileSize = (size?: number) => size !== undefined && size <= MAX_FILE_SIZE_BYTES;
      const isValidImage = (mimeType: string) => mimeType.startsWith('image/');
      
      const handleImagePicker = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      
        if (!result.canceled) {
          const file = result.assets[0];
          
          if (!isValidFileSize(file.fileSize)) {
            alert(`El archivo no debe superar los ${MAX_FILE_SIZE_MB}MB.`);
            return;
          }
      
          handleChange(field.id, file, true);
        }
      };
      
      const handleDocumentPicker = async () => {
        const result = await DocumentPicker.getDocumentAsync({});
        if (!result.canceled) {
          const mimeType = mime.getType(result.uri) || "";
          if (!isValidImage(mimeType)) {
            alert("Solo se permiten imágenes.");
            return;
          }
      
          if (!isValidFileSize(result.size)) {
            alert(`El archivo no debe superar los ${MAX_FILE_SIZE_MB}MB.`);
            return;
          }
      
          handleChange(field.id, result, true);
        }
      };
      
      const handleCameraPicker = async () => {
        const result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      
        if (!result.canceled) {
          const file = result.assets[0];
      
          if (!isValidFileSize(file.fileSize)) {
            alert(`El archivo no debe superar los ${MAX_FILE_SIZE_MB}MB.`);
            return;
          }
      
          handleChange(field.id, file, true);
        }
      };
  
        return (
          <View key={field.id} style={styles.inputContainer}>
            <View style={styles.imageButtons}>
              <TouchableOpacity onPress={handleImagePicker} style={styles.iconButton}>
                <MaterialCommunityIcons name="image-plus" color={color.primary} size={28} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCameraPicker} style={styles.iconButton}>
                <MaterialCommunityIcons name="camera" color={color.primary} size={28} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDocumentPicker} style={styles.iconButton}>
                <MaterialCommunityIcons name="file-plus" color={color.primary} size={28} />
              </TouchableOpacity>
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>
        );
      default:
        return null;
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors: any = {};

    fields.forEach((field) => {
      if (field.isRequired && !formValues[field.id]) {
        valid = false;
        newErrors[field.id] = `${field.name} es obligatorio.`;
      } else if (field.minLength && formValues[field.id]?.length < field.minLength) {
        valid = false;
        newErrors[field.id] = `${field.name} debe tener al menos ${field.minLength} caracteres.`;
      } else if (field.maxLength && formValues[field.id]?.length > field.maxLength) {
        valid = false;
        newErrors[field.id] = `${field.name} no puede exceder los ${field.maxLength} caracteres.`;
      }
    });
    console.log(newErrors)

    setErrors(newErrors);
    return valid;
  };

  // Exponer la función handleSubmit al componente padre
  useImperativeHandle(ref, () => ({
    handleSubmit: () => {
      if (validateForm()) {
        console.log("hola")
        const fieldValues = fields.map((field) => {
          const value = formValues[field.id];

          // Crear el objeto de fieldValue según el tipo
          if (field.type === FieldTypeEnum.Number) {
            return {
              fieldId: field.id,
              valorNumerico: value ? parseInt(value, 10) : undefined,
            };
          }
          if(field.type === FieldTypeEnum.Date){
            return {
              fieldId: field.id,
              valorFecha: value ? value : undefined,
            };
          }
          if(field.type === FieldTypeEnum.LongText){
            return {
              fieldId: field.id,
              valorTextoLargo: value ? value : undefined,
            };
          }
          if(field.type === FieldTypeEnum.Image){
            return {
              fieldId: field.id,
              valorFotoId: value ? value : undefined,
            };
          }
          return {
            fieldId: field.id,
            valorTexto: value,
          };
        });

        // Crear el objeto para enviar
        const formData = {
          repairTypeId: selectTypeReaip,
          fieldValues: fieldValues, // Filtrar valores vacíos
        };

        // Llamamos a la función onSubmit pasada desde el padre
        onSubmit(formData);  // Llamamos a la función del padre para enviar los datos
      }
    },
  }));
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      // Simula una llamada asíncrona o actualización
      await refetch()
    } finally {
      setRefreshing(false);
    }
  };
  return (
    <KeyboardAwareScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={styles.formContainer}>
      {loading && <ActivityIndicator size="small" color={color.primary} />}
      <Select
        onSelect={(text) => setselectTypeReaip(text)}
        options={option}
        selectedOption={selectTypeReaip}
        placeholder="Seleccione un tipo de reparación"
      />
      {fields.length > 0 && (
        <View>
          {fields.map((field) => renderField(field))}
        </View>
      )}
    </KeyboardAwareScrollView>
  );
});

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 20,
    width: '100%',
    borderRadius: 10,
  },
  placeholderText: {
    textAlign: 'center',
    color: '#aaa',
  },
  inputError: {
    borderColor: color.lightPink,
  },
  inputContainer: {
    marginBottom: 15,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  iconButton: {
    padding: 10,
  },
  imageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  imageButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  imageButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 5,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  datePicker: {
    justifyContent: 'center',
  },
  input: {
    height: 50,
    borderColor: color.primary,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 15,
    fontSize: 16,
    color: color.primary,
    width: '100%',
  },
});

export default RepairDetailsForm;
