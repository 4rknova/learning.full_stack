import React, {useState, useEffect} from 'react';
import {TextInput, Button, View, BackHandler, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ImageLoader from './src/component/ImageLoader.js';
import FilterCheckbox from './src/component/FilterCheckbox.tsx';
import {image_logo_light} from './src/images.ts';

const Stack = createNativeStackNavigator();

const ScreenSplash : React.FC<NavigationContainer> = ({navigation}) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Main', {});
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
      <View style={[styles.container_root]}>
        <View style={[styles.container_logo]}>
          <ImageLoader style={styles.logo} source={{uri: `data:image/png;base64,${image_logo_light}`}} />
        </View>
      </View>
  );
};

const MyStack : React.FC = () => {
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
];

const ScreenMain = () => {
  const [checkBoxes, setCheckBoxes] = useState(data);
  const [text, onChangeText] = React.useState('');

  const backAction = () => {
    return true;
  };
  BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );
  const onPressSubmit = () => {
    let newEntry = {id:checkBoxes.length, label:text, isChecked:false, value:text};
    setCheckBoxes([...checkBoxes, newEntry]);
    console.log('You tapped the button! Added entry ID: ' + checkBoxes[checkBoxes.length - 1].id);
  };

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
};

const styles = StyleSheet.create({
  container_root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container_list: {
    flex: 5,
  },
  container_editor: {
    backgroundColor: '#fff',
    flex: 1,
  },
  container_logo: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
    backgroundColor: 'blue',
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    cursor: 'pointer',
    margin: 5,
    padding: '10px 20px',
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
