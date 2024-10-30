import React, {Component, useState} from 'react';
import {Text, TouchableOpacity, Image, Button, View, StyleSheet} from 'react-native';
import FadeIn from 'react-native-fade-in-image'

const uri_logo = require('./public/images/logo.png');

const styles = StyleSheet.create({
  container_root:
  {
    flex: 1,
  },
  container_logo:
  {
    flex: 2,
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

// ES6 class
class Ticker extends Component {
  state = {
    count: 0,
  };

  onPress = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  render() {
    return (
      <View style={styles.container_ticker}>
        <TouchableOpacity style={styles.button} onPress={this.onPress}>
          <Text>Enter</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

type GreetingProps = {
  message: string;
};

const Greeting = (props: GreetingProps) => {
  return (
    <View>
      <Text style={styles.text}>{props.message}</Text>
    </View>
  );
};

const App = () => {
  const [count, setCount] = useState(0);
  
  return (
    <View style={[styles.container_root]}>
      <View style={[styles.container_logo]}>
        <Image
          style={styles.logo}
          source={uri_logo}
        />
        <Greeting message="Organise Your Day!" />
      </View>
  
      <View style={[styles.container_ticker]}>
        <Ticker/>
      </View>
    </View>
  );
};

export default App;
