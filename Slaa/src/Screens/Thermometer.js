import React, { Component } from 'react'; // Importa o React e o React components
import { View, StyleSheet, Text } from 'react-native'; // importa os componentes do react native
import { StackedBarChart } from 'react-native-svg-charts'; // importa a biblioteca react-native-svg-charts

import client from "../services/Mqtt"; // importa A constante cliente usada pelo mqtt

export default class Thermometer extends Component { // Cria o Componente App
  constructor(props) { // Começa a Construção dos props
    super(props); // Define os Props como Super
    this.state={ // Define os Estados iniciais dos Props
      Temperatura: 0, // cria o state Temperatura e define ele como 0
      TemperaturaZero: 0,// cria o state TemperaturaZero e define ele como 0
      Umidade: 0, // cria o state Umidade e define ele como 0
      UmidadeZero: 0 // cria o state UmidadeZero e define ele como 0
    }
  }

  componentDidMount() { // Cria a função que mostrara no Console a mensagem que foi enviad
    client.onMessageArrived=(message)=>this.onMessageArrived(message); // Mostra a Mensagem enviada
    client.publish("Null/project","Receber/Dados"); // Publica no topico project
  }
  
  onMessageArrived  = (message) =>  // Criar a função que recebera as mensagens do Mqtt
  {
    let x = "\nTopic : "+message.topic+"\nMessage : "+message.payloadString; // Armazena na variavel x a String com Topic e a Mensagem recebida
    console.log(x); // Mostra a String armazenada na variavel X

    if(message.topic == "Null/Temperatura"){ // Verifica se a mensagem foi publicada no tipico Null/Temperatura
      var Response = message.payloadString; // define a variavel response como o valor enviado pelo sensor
      var reponsezero = 100 - Response; // define a variavel reponsezero como 100 menos o valor enviado pelo sensor
      this.setState({TemperaturaZero:reponsezero}); // Seta o state TemperaturaZero como valor da variavel reponsezero
      this.setState({Temperatura:Response}); // Seta o state Temperatura como valor da variavel Response
    }

    else if(message.topic == "Null/Umidade"){ // Verifica se a mensagem foi publicada no tipico Null/Umidade
      var Response = message.payloadString; // define a variavel response como o valor enviado pelo sensor
      var reponsezero = 100 - Response; // define a variavel reponsezero como 100 menos o valor enviado pelo sensor
      this.setState({UmidadeZero:reponsezero}); // Seta o state UmidadeZero como valor da variavel reponsezero
      this.setState({Umidade:Response}); // Seta o state Umidade como valor da variavel Response
    }

  }

  render() { // Rederiza as Funçoes e
    const UmidadeData = [ // cria a constante com os dados usados para fazer o copo
      {
        Umidadeum: this.state.Umidade, // define o Umidadeum como o valor do state Umidade
        Umidadezero: this.state.UmidadeZero // define o Umidadezero como o valor do state UmidadeZero
      }
    ]

    const TemperaturaData = [ // cria a constante com os dados usados para fazer o copo
    {
      Temperaturaum: this.state.Temperatura, // define o Temperaturaum como o valor do state Temperatura
      Temperaturazero: this.state.TemperaturaZero // define o Temperaturazero como o valor do state Temperaturazero
    }
  ]

    const Temperaturacolors = ['#a10010', '#666666'] // cria as cores de Temperatura
    const Umidadecolors = ['#0008ff', '#666666'] // cria as cores de Umidade
    const Umidadekeys = ['Umidadeum', 'Umidadezero'] // cria as keys de Umidade
    const Temperaturakeys = ['Temperaturaum', 'Temperaturazero'] // cria as keys de Temperatura

    return ( // Retorna ao Usuario todos os itens do App
      <View style={styles.container}>
        <View style={styles.thermometers}>
          <View style={styles.bodyTemperatura}>
            <StackedBarChart
              style={styles.Temperatura}
              keys={Temperaturakeys}
              colors={Temperaturacolors}
              data={TemperaturaData}
              showGrid={false}
              contentInset={{ top: 0, bottom: 0 }}
            /> 
            <Text style={styles.title}>Temperatura: {this.state.Temperatura}°C</Text>
          </View> 
          <View style={styles.bodyUmidade}>
            <StackedBarChart
              style={styles.Umidade}
              keys={Umidadekeys}
              colors={Umidadecolors}
              data={UmidadeData}
              showGrid={false}
              contentInset={{ top: 0, bottom: 0 }}
            /> 
            <Text style={styles.title}>Umidade: {this.state.Umidade}%</Text>
          </View> 
        </View>        
      </View> 
    );
  }
}

const styles = StyleSheet.create({ // Cria os estilos usados pelo codigo
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#666666",

  },
  thermometers: {
    margin: 20,
    width: 500,
    flexDirection: "row",
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  bodyUmidade: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent:'center'
  },
  Umidade: {
    height: 650,
    width: 100,
    margin: 0,
    borderWidth: 5,
    borderColor: "#ffffff"
  },
  bodyTemperatura: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent:'center'
  },
  Temperatura: {
    height: 650,
    width: 100,
    margin: 0,
    borderWidth: 5,
    borderColor: "#ffffff"
  },
  title: {
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 24,
    fontSize: 15,
    fontWeight: "bold"
  },
});