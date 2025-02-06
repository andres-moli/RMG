import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Select2 from 'react-native-select-two';
import { useColor } from '../../Constants/Color';
const { color } = useColor();

interface SelectorProps {
  selectedValue: string;
  onValueChange: (itemValue: string) => void;
  options: { name: string; id: string }[];
  placeholder?: string;
  style?: object;
}

const FormSelector: React.FC<SelectorProps> = ({ selectedValue, onValueChange, placeholder, options, style }) => {
  const [selected, setSelected] = useState(selectedValue);

  const handleSelection = (value: string) => {
    setSelected(value);
    onValueChange(value);
  };

  return (
    <View style={[styles.container, style]}>
         <Select2
          isSelectSingle
          style={{ borderRadius: 5 }}
          colorTheme={color.primary}
          popupTitle={placeholder}
          title={placeholder}
          data={options}
          onSelect={(value)=> {
            onValueChange(value?.toString())
          }}
          cancelButtonText={'Cancelar'}
          selectButtonText={'Selecionar'}
          searchPlaceHolderText={'Buscar...'}
          listEmptyTitle={'No se encontro resultados'}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  select: {
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
  },
});

export default FormSelector;
