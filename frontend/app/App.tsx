import React, {Component, useState} from 'react';
import {Text, TouchableOpacity, Button, View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BouncyCheckbox from "react-native-bouncy-checkbox";

import ImageLoader from './src/component/ImageLoader.js';
import FilterCheckbox from './src/component/FilterCheckbox.tsx';


const uri_logo = require('./public/images/logo-light.png');

const Stack = createNativeStackNavigator();

const ScreenSplash = ({navigation}) => {
  return (
      <View style={[styles.container_root]}>
        <View style={[styles.container_logo]}>
          <ImageLoader style={styles.logo} source={uri_logo} />
        </View>
        <View style={[styles.container_ticker]}>
          <Button
            title="Continue"
            onPress={() =>
              navigation.navigate('Main', {})
            }
          />
        </View>
      </View>
  );
};

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={ScreenSplash} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={ScreenMain} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

interface AppProps {}

const data = [
  {
    id: 0,
    label: 'All',
    isChecked: false,
    value: '',
  },
  {
    id: 1,
    label: 'Pre-Listing',
    isChecked: false,
    value: 'PreListing',
  },
  {
    id: 2,
    label: 'Offer Exclusive',
    isChecked: false,
    value: 'OfferExclusive',
  },
  {
    id: 3,
    label: 'Coming Soon',
    isChecked: false,
    value: 'ComingSoon',
  },
  {
    id: 4,
    label: 'Active Listings',
    isChecked: false,
    value: 'ActiveListing',
  },
  {
    id: 5,
    label: 'TNAS',
    isChecked: false,
    value: 'TNAS',
  },
  {
    id: 6,
    label: 'Under Contract',
    isChecked: false,
    value: 'Under contract',
  },
  {
    id: 7,
    label: 'Clear to Close',
    isChecked: false,
    value: 'Clear to close',
  },
  {
    id: 8,
    label: 'Closed',
    isChecked: false,
    value: 'Closed',
  },
  {
    id: 9,
    label: 'Cancelled',
    isChecked: false,
    value: 'Cancelled',
  },
];

const ScreenMain = ({navigation, route}) => {

  const [checkBoxes, setCheckBoxes] = useState(data);

  const handleCheckboxPress = (checked: boolean, id: number) => {
    setCheckBoxes(
      checkBoxes.map(item =>
        item.id === id ? {...item, isChecked: checked} : item,
      ),
    );
  };

  return (
    <View style="container_root">
      <React.Fragment>
      {checkBoxes.map(item => (
          <FilterCheckbox
            id={item.id}
            text={item.label}
            key={`${item.id}`}
            isChecked={item.isChecked}
            onCheckboxPress={handleCheckboxPress}
          />
      ))}
      </React.Fragment>
    </View>
  );
}

const styles = StyleSheet.create({
  container_root:
  {
    flex: 1,
  },
  container_logo:
  {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  container_ticker: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    color: '#555',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    padding: 10,
  },
  logo: {
    width: '75%',
    resizeMode: 'contain',
  }
});

export default MyStack;
