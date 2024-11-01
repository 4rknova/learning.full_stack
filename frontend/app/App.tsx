import React, {Component, useState, useEffect} from 'react';
import {Text, TextInput, TouchableOpacity, Button, View, BackHandler, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BouncyCheckbox from "react-native-bouncy-checkbox";

import ImageLoader from './src/component/ImageLoader.js';
import FilterCheckbox from './src/component/FilterCheckbox.tsx';


const uri_logo = require('./public/images/logo-light.png');

const Stack = createNativeStackNavigator();

const ScreenSplash = ({navigation}) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Main', {})
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
      <View style={[styles.container_root]}>
        <View style={[styles.container_logo]}>
          <ImageLoader style={styles.logo} source={uri_logo} />
        </View>
        <View style={[styles.container_ticker]}>
        </View>
      </View>
  );
};

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={ScreenSplash}
            options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={ScreenMain}
            options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


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
  const [text, onChangeText] = React.useState('');

  const backAction = () => {
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );

  const onPressSubmit = () => {
    let newEntry = {id:checkBoxes.length, label:text, isChecked:false, value:text}
    setCheckBoxes([...checkBoxes, newEntry])
    console.log('You tapped the button! Added entry ID: ' + checkBoxes[checkBoxes.length-1].id)
  }
  
  const handleCheckboxPress = (checked: boolean, id: number) => {
    setCheckBoxes(
      checkBoxes.map(item =>
        item.id === id ? {...item, isChecked: checked} : item,
      ),
    );
  };

  return (
    <View style={styles.container_root}>
      <View style={styles.container_list}>
        {checkBoxes.map(item => (
            <FilterCheckbox
              id={item.id}
              text={item.label}
              key={`${item.id}`}
              isChecked={item.isChecked}
              onCheckboxPress={handleCheckboxPress}
            />
        ))}
      </View>
      <View style={styles.container_editor}>
        <SafeAreaProvider>
          <SafeAreaView>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
            />
          </SafeAreaView>
        </SafeAreaProvider>
        <Button
          title="Submit"
          onPress={onPressSubmit}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container_root:
  {
    flex: 1,
    backgroundColor: "#fff",
  },
  container_list:
  {
    flex: 5,
  },
  container_editor:
  {
    backgroundColor: "#fff",
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
    margin: 5,
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  logo: {
    width: '75%',
    resizeMode: 'contain',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default MyStack;
