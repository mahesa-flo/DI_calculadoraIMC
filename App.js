import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import { CalculadoraIMC } from './components/CalculadoraIMC';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

class App extends Component {
  render() {
    return (
      <View style={styles.movil}>
        <View style={styles.ventana}>
          <View>
            <Text
              style={{
                color: 'red',
                fontSize: 30,
                textAlign: 'center',
                marginBottom: 10,
              }}>
              Calculadora IMC
            </Text>
          </View>
          <View>
            <CalculadoraIMC></CalculadoraIMC>
          </View>
          <View>
            <Text style={{ color: 'grey', marginTop: 15 }}>
              Created for 2n DAM
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  movil: { flex: 1, backgroundColor: 'grey', color: 'white' },
  ventana: {
    marginTop: 25,
    flex: 1,
    backgroundColor: 'purple',
    padding: 10,
    alignContent: 'center',
  },
});

export default App;
