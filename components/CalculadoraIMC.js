import React, { Component, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';

const Separator = () => <View style={styles.separator} />;

const calcularIMC = (pesoUsuario, alturaUsuario) => {
  console.log('ejecuto calcularIMC');
  let resultadoUsuario = pesoUsuario / (alturaUsuario * alturaUsuario);
  return resultadoUsuario;
};

const clasificacion = (cifraC) => {
  //console.log('entra a clasificacion con cifraC: ', cifraC);
  let resultadoDef = '';
  console.log('entra a clasificacion con cifraC: ', cifraC);

  if (cifraC < 18.5) resultadoDef = 'Peso insuficiente';
  else if (cifraC >= 18.5 && cifraC < 25) resultadoDef = 'Normopeso';
  else if (cifraC >= 25 && cifraC < 27) resultadoDef = 'Sobrepeso grado I';
  ///----------verde
  else if (cifraC >= 27 && cifraC < 30)
    resultadoDef = 'Sobrepeso grado II (preobesidad)';
  ///-----------naranja
  else if (cifraC >= 30 && cifraC < 35) resultadoDef = 'Obesidad de tipo I';
  else if (cifraC >= 35 && cifraC < 40) resultadoDef = 'Obesidad de tipo II';
  ///-----------rojo
  else if (cifraC >= 40 && cifraC < 50)
    resultadoDef = 'Obesidad de tipo III (mórbida)';
  else if (cifraC >= 50) resultadoDef = 'Obesidad de tipo IV (extrema)';

  //console.log('el resultadoDef es: ', resultadoDef);

  return resultadoDef;
};

let estilo = '';
const formatoClasificaciones = (resultNum) => {
  //console.log("el num estilo es " , resultNum);
  if (resultNum < 27) estilo = 'menor27';
  else if (resultNum >= 40) estilo = 'mas40';
  else estilo = 'medio';
  console.log('en la funcion estilo es ', estilo);
  return estilo;
};

export class CalculadoraIMC extends Component {
  //para cambiar el cursor de peso a altura
  alturaInput = null;

  constructor(props) {
    super(props);
    this.state = {
      peso: '',
      altura: '',
      resultado: '',
      resultadoNum: '',
    };
  }

  render() {
    return (
      <>
        <View style={styles.cuadro}>
          <View>
            <Text style={styles.titulo}>Datos</Text>
          </View>
          <View>
            <Text style={styles.letraDatos}>PESO</Text>
            <TextInput
              style={{ marginLeft: 10, fontSize: 16 }}
              keyboardType="numeric"
              autoFocus
              maxLength={3}
              value={this.state.peso}
              onChangeText={(numero) => {
                this.setState({ peso: numero });
              }}
              //para que pase a altura con enter
              blurOnSubmit={false} // deja el teclado activo al pasar a altura
              onSubmitEditing={() => {
                this.alturaInput.focus();
              }}></TextInput>
            <Separator />

            <Text style={styles.letraDatos}>ALTURA</Text>
            <TextInput
              style={{ marginLeft: 10, fontSize: 16 }}
              keyboardType="numeric"
              maxLength={4}
              onChangeText={(numero) => {
                this.setState({ altura: numero });
              }}
              //para que "venga" desde peso el cursor
              ref={(el) => (this.alturaInput = el)}></TextInput>
          </View>
          <Separator />

          <TouchableOpacity
            disabled={!this.state.peso || !this.state.altura}
            style={styles.button}
            onPress={() => {
              let resCalculo = calcularIMC(this.state.peso, this.state.altura);
              console.log('el resCalculo es:', resCalculo);
              formatoClasificaciones(resCalculo);
              console.log('el estilo es: ' + estilo);
              this.setState({ resultadoNum: resCalculo });

              let resClasif = clasificacion(resCalculo);
              this.setState({ resultado: resClasif });
            }}>
            <Text style={{ color: 'blue' }}>Calcular IMG</Text>
          </TouchableOpacity>

          <View>
            <Text style={styles.resultado}>Resultado</Text>
            <Text
              style={
                estilo === 'menor27'
                  ? styles.menor27
                  : estilo === 'medio'
                  ? styles.medio
                  : styles.mas40
              }>
              {this.state.resultado}
            </Text>
          </View>
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  cuadro: { backgroundColor: 'white', padding: 2, paddingBottom: 40 },
  titulo: { fontSize: 28, color: 'red', marginLeft: 20, margin: 15 },
  letraDatos: {
    color: 'blue',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 16,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginLeft: 10,
    marginRight: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'blue',
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 8,
    padding: 10,
  },
  resultado: {
    marginLeft: 10,
    fontSize: 12,
  },
  menor27: {
    color: 'green',
  },
  medio: {
    color: 'orange',
  },
  mas40: {
    color: 'red',
  },
});
