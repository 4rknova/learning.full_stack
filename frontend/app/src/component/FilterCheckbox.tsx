import React from 'react';
import {StyleProp, View, ViewStyle, StyleSheet} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

interface FilterCheckboxProps {
  id: number;
  text: string;
  isDone: boolean;
  style?: StyleProp<ViewStyle>;
  onCheckboxPress: (checked: boolean, id: number) => void;
}

const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
  id,
  text,
  isDone,
  style,
  onCheckboxPress,
}) => {
  const handleCheckboxPress = () => {
    onCheckboxPress(!isDone, id);
  };

  return (
    <View style={styles.container}>
    <BouncyCheckbox
      style={[styles.checkbox, isDone ? styles.checkbox_checked : styles.checkbox_unchecked, style]}
      textStyle={styles.checkbox_text}
      text={text}
      isChecked={isDone}
      onPress={handleCheckboxPress}
      size={24}
      fillColor="#0f0"
    />
    </View>
  );
};

const styles : any = StyleSheet.create({
  container: {
    flex: 11,
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checkbox_text: {
    textDecorationLine: 'none',
  },
  checkbox_checked: {
    backgroundColor: '#f2eaea',
  },
  checkbox_unchecked: {
    backgroundColor: 'transparent',
  },
  checkbox: {
    width: '100%',
    paddingLeft: 4,
    height: 32,
    borderWidth: 1,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    borderColor: '#dedede',
    margin: 0,
    marginTop: 5,
    marginLeft: 5,
  },
});

export default FilterCheckbox;
