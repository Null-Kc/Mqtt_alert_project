import init from 'react_native_mqtt'; // Importa a biblioteca React Native MQTT 
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa a biblioteca do AsyncStore que e Necessaria para usar o MQTT

const GLOBAL = require('../Variables/Secrets');

init({ 
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  reconnect: true,
  sync : {}
}); // Inicia um BackEnd para armazenar os dados do MQTT

var ip = (Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255));

var ClienT_ID = "React_App" + ip.toString();

function onConnect() { // Criar a funcao que Mostrara quando a conexão e feita
  console.log("Conectado"); // Mostra no Console o texto Conectado
  client.publish("Null/project","React Native"); // Publica no topico project
  client.subscribe('Null/Nivel'); // Se increve no topico Nivel
  client.subscribe('Null/NivelPorcentagem'); // Se increve no topico NivelPorcentagem
  client.subscribe('Null/NivelAlert'); // Se increve no topico NivelAlert
  client.subscribe('Null/Umidade'); // Se increve no topico Umidade
  client.subscribe('Null/Temperatura'); // Se increve no topico Temperatura
}

function onConnectionLost(responseObject) { // Criar a funcao de encontrar o Erro caso nao consiga uma conexão com o mqtt
  if (responseObject.errorCode !== 0) { // Espera uma resposta do Codigo de erro Diferente de zero
    console.log("Conexão perdida erro:"+responseObject.errorMessage); // Mostar na tela a Mensagem de erro
  }
}

const client = new Paho.MQTT.Client(GLOBAL.Mqtt_Url, 8080,  ClienT_ID); // Criar a constante que sera usada na conexão com o MQTT

client.onConnectionLost = onConnectionLost; // Caso Tenha algom erro na conexão Inicia a funcao onConnectionLost
client.connect({ onSuccess:onConnect, useSSL: false, userName: GLOBAL.Mqtt_userName, password: GLOBAL.Mqtt_password }); // Inicia a conexão usando Username e o Password do MQTT


export default client; // exporta a constante cliente