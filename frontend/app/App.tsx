import React, {Component, useState} from 'react';
import {Text, TouchableOpacity, Button, View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#555',
  },
  center: {
    alignItems: 'center',
  },
  background: {
    width:'50%',
  },
  text: {
    textAlign: 'center',
    color: '#fff',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
  },
});

type GreetingProps = {
  name: string;
};

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
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.onPress}>
          <Text>Click me</Text>
        </TouchableOpacity>
        <View>
          <Text>You clicked {this.state.count} times</Text>
        </View>
      </View>
    );
  }
}

const Greeting = (props: GreetingProps) => {
  return (
    <View style={styles.center, styles.background}>
      <Text style={styles.text}>Hello {props.name}!</Text>
    </View>
  );
};

const App = () => {
  const [count, setCount] = useState(0);
  
  return (
    <View style={[styles.root, styles.center]}>
        <View style={[styles.container]}>
          <Greeting name="Player 1" />
          <Greeting name="Player 2" />
          <Greeting name="Player 3" />
        </View>
        <Ticker/>
    </View>
  );
};

export default App;
