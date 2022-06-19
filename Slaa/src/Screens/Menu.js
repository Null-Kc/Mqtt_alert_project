import * as Notifications from 'expo-notifications'; // importa a biblioteca expo notificarions
import React, { Component } from 'react'; // Importa o React e o React components 
import { StatusBar, View, Image, StyleSheet, TouchableOpacity } from 'react-native'; // importa os componentes do react native

import client from "../services/Mqtt" // importa A constante cliente usada pelo mqtt

const False = "False"; // cria a constante False a atribui a ela False
const True = "True"; // cria a constante True a atribui a ela True

Notifications.setNotificationHandler({ // cria a funcao de mostrar a notificação 
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


export default class Menu extends Component {
  constructor(props) { // Começa a Construção dos props
    super(props); // Define os Props como Super
    this.state={ // Define os Estados iniciais dos Props
      LoopAlert: "False", // cria o state LoopAlert e define ele como false
      LoopWindow: "False", // cria o state LoopWindow e define ele como false
    }
  }

  componentDidMount() { // Cria a função que mostrara no Console a mensagem que foi enviad
    client.onMessageArrived=(message)=>this.onMessageArrived(message); // Mostra a Mensagem enviada
  }
  
  onMessageArrived  = (message) =>  // Criar a função que recebera as mensagens do Mqtt
  {
    let x = "\nTopic : "+message.topic+"\nMessage : "+message.payloadString; // Armazena na variavel x a String com Topic e a Mensagem recebida
    console.log(x); // Mostra a String armazenada na variavel X
    

    if(message.payloadString == "Aviso"){ // Verifica se a mensagem recebida foi Aviso
      var LoopChecker = this.state.LoopAlert; // pega o estado atual do lopp

      if(LoopChecker == "False"){  // verifica se estado esta false
        floodingNotification(); // ativa a notificao de alagamento
      }
      this.setState({LoopAlert:True}); // Seta o loop para TRUE
    }

    else if (message.payloadString == "Janela Aberta"){ // Verifica se a mensagem recebida foi Janela Aberta
      var LoopChecker = this.state.LoopWindow; // pega o estado atual do lopp

      if(LoopChecker == "False"){ // verifica se estado esta false
        WindowsNotification(); // ativa a notificao da janela
      }
      this.setState({LoopWindow:True}); // Seta o loop para TRUE
    }
  }

  click  = () => // Cria a Funcao de Clicar no Botao
  {
    this.setState({LoopWindow:False}); // Seta o o state LoopWindow para false
    this.setState({LoopAlert:False}); // Seta o o state LoopAlert para false
  }


  render() {
    return ( // retorna pro usuario a tela
      <View style={styles.Container}>
        <StatusBar backgroundColor="#ff0000" barStyle="light-content"/>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Levelviewer')} style={styles.buttonStyle}>
          <Image source={require('../../assets/copo.png')} style={styles.ImageIconStylecopo}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Thermometer')} style={styles.buttonStyle}>
          <Image source={require('../../assets/termometro.png')} style={styles.ImageIconStyle}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.click()} style={styles.Button}>
        </TouchableOpacity>
      </View>
    )
  }
}

async function floodingNotification() { // Cria a notificação do aviso de alagamento
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Perigo ⚠️",
      body: 'Nivel de Agua Perigoso ⚠️',
      data: { data: 'Aviso' },
    },
    trigger: { seconds: 2 },
  });
}

async function WindowsNotification() { // Cria a notificação da jenela aberta
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Chuva 🌧️",
      body: 'A Janela esta Aberta 🌧️',
      data: { data: 'Aviso' },
    },
    trigger: { seconds: 2 },
  });
}


const styles = StyleSheet.create({ // Cria os estilos usados pelo codigo
  Container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#666666'
  },
  ImageIconStylecopo: {
    padding: 10,
    margin: 5,
    height: 70,
    width: 70,
    resizeMode: 'stretch',
  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 90,
    width: 90,
    resizeMode: 'stretch',
  },
  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: '#a10010',
    backgroundColor: '#a10010',
    height: 100,
    width: 100,
    borderRadius: 5,
    margin: 10,
  },
  Button: {
    backgroundColor: "#666666",
    textAlign: 'center',
    position: 'absolute',
    top: 5,
    left: 10,
    width: 100,
    height: 100,
  }
});