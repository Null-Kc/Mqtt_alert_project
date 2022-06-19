import React, { Component } from 'react'; // Importa o React e o React components
import { View, StyleSheet, Text } from 'react-native'; // importa os componentes do react native
import { StackedBarChart } from 'react-native-svg-charts'; // importa a biblioteca react-native-svg-charts

import client from "../services/Mqtt"; // importa A constante cliente usada pelo mqtt

export default class LevelAlert extends Component { // Cria o Componente App
  constructor(props) { // Começa a Construção dos props
    super(props); // Define os Props como Super
    this.state={ // Define os Estados iniciais dos Props
      Nivel: 0, // cria o state Nivel e define ele como 0
      NivelZero: 0, // cria o state NivelZero e define ele como 0
      PorcetagemNivel: 0 // Cria a porcentagem de agua no copo
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

    if(message.topic == "Null/Nivel"){ // Verifica se a mensagem foi publicada no tipico Null/Nivel
      var Response = message.payloadString; // define a variavel response como o valor enviado pelo sensor
      var reponsezero = 700 - Response; // define a variavel reponsezero como 700 - o valor enviado pelo sensor
      this.setState({NivelZero:reponsezero}); // Seta o state nivelzeto como valor da variavel reponsezero
      this.setState({Nivel:Response}); // Seta o state Nivel como valor da variavel Response
    }

    else if (message.topic == "Null/NivelPorcentagem"){ // Verifica se a mensagem foi publicada no tipico Null/NivelPorcentagem
      var Response = message.payloadString; // define a variavel response como o valor enviado pelo topico PorcetagemNivel
      this.setState({PorcetagemNivel:Response}); // Seta o state PorcetagemNivel como valor da variavel Response
    }

  }

  render() { // Rederiza as Funçoes e
    const data = [ // cria a constante com os dados usados para fazer o copo
      {
        Nivelum: this.state.Nivel, // define o Nivelum como o valor do state Nivel
        Nivelzero: this.state.NivelZero // define o Nivelzero como o valor do state NivelZero
      }
    ]

    const colors = ['#0008ff', '#666666'] // cria a constante com as cores
    const keys = ['Nivelum', 'Nivelzero'] // cria a variavel com as keys

    return ( // Retorna ao Usuario todos os itens do App
      <View style={styles.container}>
        <View style={styles.body}>
          <Text style={styles.title}>Nivel da Agua: {this.state.PorcetagemNivel}%</Text>
          <View style={styles.bodycopo}>
            <StackedBarChart
              style={styles.Copo}
              keys={keys}
              colors={colors}
              data={data}
              showGrid={false}
              contentInset={{ top: 0, bottom: 10 }}
            /> 
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
    justifyContent:'center',
    backgroundColor: "#666666",

  },
  body: {
    margin: 20,
    alignItems: 'center',
    justifyContent:'center'
  },
  bodycopo: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent:'center'
  },
  Copo: {
    height: 650,
    width: 300,
    margin: 0,
    borderWidth: 5,
    borderColor: "#ffffff"
  },
  title: {
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "bold"
  },
});