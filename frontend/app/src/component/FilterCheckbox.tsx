import React from 'react';
import {StyleProp, View, ViewStyle, StyleSheet} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

interface FilterCheckboxProps {
  id: number;
  text: string;
  isChecked: boolean;
  style?: StyleProp<ViewStyle>;
  onCheckboxPress: (checked: boolean, id: number) => void;
}

const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
  id,
  text,
  isChecked,
  style,
  onCheckboxPress,
}) => {
  const handleCheckboxPress = () => {
    onCheckboxPress(!isChecked, id);
  };

  return (
    <View style={styles.container}>
    <BouncyCheckbox
      style={[styles.checkbox, style]}
      text={text}
      isChecked={isChecked}
      onPress={handleCheckboxPress}
      size={24}
      fillColor="#0f0"
    />
    </View>
  );
};

const styles : any = StyleSheet.create({
  container: {
    margin: 1,
    backgroundColor: '#fff',
  },
  checkbox: {
    width: '98%',
    paddingLeft: 4,
    height: 32,
    borderWidth: 1,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 0,
    borderRadius: '72px',
    borderColor: '#dedede',
    margin: 0,
    marginTop: 5,
    marginLeft: 5,
  },
});

export default FilterCheckbox;
