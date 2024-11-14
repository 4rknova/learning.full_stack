import React, {useState, useEffect, useRef} from 'react';
import {StatusBar, StyleSheet, ActivityIndicator, Text, TextInput, Image, Button, View, BackHandler, ScrollView, Pressable} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ApolloClient, InMemoryCache, ApolloProvider, useMutation} from '@apollo/client';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import LogoScreen from './src/component/LogoScreen.tsx';
import FilterCheckbox from './src/component/FilterCheckbox.tsx';
import {logo_light, ui_bin} from './src/images.ts';

const color_background: string = '#006699';
const color_border: string = '#dedede';

// noinspection GraphQLUnresolvedReference
const GET_TASKS = gql`
  {
    tasks {
        id
        text
        isDone
    }
  }
`;

// noinspection GraphQLUnresolvedReference
const ADD_TASK = gql`
    mutation CreateTask($input: String!) {
        createTask(input: { text:$input userId:"1"}) {
            id
        }
    }
`;

// noinspection GraphQLUnresolvedReference
const UPD_TASK = gql`
    mutation UpdateTask($input_id: String!, $input_status: Boolean!) {
        updateTask(input: { id:$input_id isDone:$input_status}) {
            isSuccessful
        }
    }
`;


// noinspection GraphQLUnresolvedReference
const DEL_TASK = gql`
    mutation DeleteTask($input: String!) {
        deleteTask(input:$input) {
            isSuccessful
        }
    }
`;


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

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://192.168.0.52:4000/api',
  cache: new InMemoryCache(),
});

const ScreenStack : React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Splash" component={ScreenSplash}
              options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={ScreenMain}
              options={{
                headerShown: true,
                title: 'Tasks',
                headerStyle: {
                  backgroundColor: color_background,
                },
                headerTitleStyle:{
                  fontWeight:'bold',
                },
                headerBackVisible:false,
                headerTintColor: '#fff',
          }} />
        </Stack.Navigator>
    </NavigationContainer>
    </ApolloProvider>
  );
};

const ScreenMain = () => {

  const {loading, error, data} = useQuery(GET_TASKS, {});

  const backAction = () => {
    return true;
  };
  BackHandler.addEventListener('hardwareBackPress', backAction);

  const [input, setInput] = useState('');
  const [selectedTaskToUpdate, setSelectedTaskToUpdate] = useState({id:-1, isDone:false});
  const [selectedTaskToDelete, setSelectedTaskToDelete] = useState(-1);
  const editBox = useRef(null);
  const [createTask] = useMutation(ADD_TASK, {
    variables: { input: input },
    refetchQueries: [GET_TASKS] ,
    onCompleted: (dat) => {
      console.log(dat);
      setInput('');
      if (editBox != null && editBox.current != null){
        editBox.current.clear();
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const [updateTask] = useMutation(UPD_TASK, {
    variables: { input_id: selectedTaskToUpdate.id, input_status: selectedTaskToUpdate.isDone},
    refetchQueries: [GET_TASKS] ,
    onCompleted: (dat) => {
      console.log(dat);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const [deleteTask] = useMutation(DEL_TASK, {
    variables: { input: selectedTaskToDelete },
    refetchQueries: [GET_TASKS] ,
    onCompleted: (dat) => {
      console.log(dat);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    if (selectedTaskToDelete !== -1) {
      console.log('[client] Deleting task: ', selectedTaskToDelete);
      deleteTask().then();
    }
  }, [selectedTaskToDelete, deleteTask]);

  useEffect(() => {
    if (selectedTaskToUpdate.id !== -1) {
      console.log('[client] Setting task state [', selectedTaskToUpdate.id, ', ', selectedTaskToUpdate.isDone, ']');
      updateTask().then();
    }
  }, [selectedTaskToUpdate, updateTask]);

  const handleSubmit = () => {
    if (input !== '') {
      console.log('[client] Adding task: ', input);
      createTask().then();
    }
  };

  const handleCheckboxPress = (checked: boolean, id: number) => {
    setSelectedTaskToUpdate({id, isDone:checked});
  };

  if (error) {
    return <Text>{`${error}`}</Text>;
  }

  if (loading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={[styles.container_loader, styles.horizontal]}>
          <ActivityIndicator size="large" />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  } else {
    return (
      <View style={styles.container_root}>
        <StatusBar backgroundColor={color_background} />
        <View style={styles.container_list}>
          <ScrollView>
            {data.tasks.map((item : any) => (
              <View key={`view_${item.id}`} style={styles.container_entry}>
                <FilterCheckbox
                  id={item.id}
                  text={item.text}
                  key={`${item.id}`}
                  isDone={item.isDone}
                  onCheckboxPress={handleCheckboxPress}
                />
                <Pressable style={styles.button} key={`delete_button_${item.id}`} onPress={()=>setSelectedTaskToDelete(item.id)}>
                  {/*
                  <Text key={`delete_button_text_${item.id}`} style={styles.button_text}>Delete</Text>
                  */}
                  <Image  key={`delete_button_img_${item.id}`} source={{ uri: ui_bin }}  style={styles.button_img}/>
                </Pressable>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.container_editor}>
            <TextInput
              ref={editBox}
              style={styles.input}
              onChangeText={node => {
                setInput(node);
              }}
            />
            <Button title="Add" onPress={e => {
                e.preventDefault();
                handleSubmit();
              }}
            />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container_loader: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  container_entry: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  button: {
    flex: 1,
    height: 32,
    marginHorizontal: '2%',
    marginTop: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2eaea',
    borderColor: color_border,
    borderWidth: 1,
    borderRadius: 50,
  },
  button_text: {
    textAlign: 'center',
  },
  button_img: {
    width: 12,
    height: 12,
  },
  container_root: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  container_list: {
    flex: 10,
  },
  container_editor: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingVertical: '2%',
  },
  input: {
    color: '#333',
    width: '80%',
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 5,
    borderColor: color_border,
  },
});

export default ScreenStack;
