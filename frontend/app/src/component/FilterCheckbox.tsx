import React from 'react';
import {StyleProp, View, Style, StyleSheet} from 'react-native';
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
      size={25}
      fillColor="#0f0"
      unFillColor="#fff"
      text={text}
      iconStyle={{ borderColor: "#ccc" }}
      innerIconStyle={{ borderWidth: 2 }}
      textStyle={{ fontFamily: "JosefinSans-Regular" }}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 1,
  },
  checkbox: {
    width: "98%",
    paddingLeft: 4,
    height: 32,
    backgroundColor: "#fefefefe",
    borderWidth: 1,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 0,
    borderRadius: "72px",
    borderStyle: "none",
    borderColor: "#ccc",
    margin: 0,
    marginTop: 5,
    marginLeft: 5,
  },
});

export default FilterCheckbox;
