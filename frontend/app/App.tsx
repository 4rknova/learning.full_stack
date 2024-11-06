import React, {useState, useEffect} from 'react';
import {TextInput, StyleSheet, Button, View, BackHandler, ScrollView} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LogoScreen from './src/component/LogoScreen.tsx';
import FilterCheckbox from './src/component/FilterCheckbox.tsx';
import {logo_light} from './src/images.ts';

const Stack = createNativeStackNavigator();

const ScreenSplash : React.FC<any> = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Main', {});
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LogoScreen source={{ uri: logo_light }} />
  );
};

const ScreenStack : React.FC = () => {
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

interface TaskEntry {
  id: number;
  label: string;
  isChecked: boolean;
  value: string;
}

const data : TaskEntry[] = [];

const ScreenMain = () => {
  const [checkBoxes, setCheckBoxes] = useState(data);
  const [text, setText] = React.useState('');

  const backAction = () => {
    return true;
  };
  BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );
  const onPressSubmit = () => {
    if (text === '')
    {
      return;
    }

    let newEntry = {id:checkBoxes.length, label:text, isChecked:false, value:text};
    setCheckBoxes([...checkBoxes, newEntry]);
    setText('');
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
        <ScrollView>
        {checkBoxes.map(item => (
            <FilterCheckbox
              id={item.id}
              text={item.label}
              key={`${item.id}`}
              isChecked={item.isChecked}
              onCheckboxPress={handleCheckboxPress}
            />
        ))}
        </ScrollView>
      </View>
      <View style={styles.container_editor}>
        <SafeAreaProvider>
          <SafeAreaView>
            <TextInput
              style={styles.input}
              onChangeText={setText}
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
  button: {
    backgroundColor: 'blue',
    borderRadius: '5px',
    color: 'white',
    cursor: 'pointer',
    margin: 5,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default ScreenStack;
