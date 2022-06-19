#include <ESP8266WiFi.h> // Adciona a Biblioteca que permite que o ESP Conecte a o WIFI
#include <PubSubClient.h> // Adciona a Biblioteca que Permite que o ESP conecte a o MQTT
#include <DHT.h> //Biblioteca para funcionamento do sensor de temperatura e umidade DHT11
#include "Secrets.h" // importa as variaveis de senha e login do broker MQTT e do WiFI
#include "Mqtt.h" // importa os topicos usados pelo programa

#define sensorvcc 5 //Define o pino de energia que sera usado pelo sensor de nivel de agua   
#define sensorsinal 17  //Define o pino de leitura do do sensor de nivel de agua    

#define Led 4 //Define o pino do Led

const int buzzer = 0; 

#define DHTPIN 2 //Pino digital D2 (GPIO5) conectado ao DHT11
#define DHTTYPE DHT11 //Tipo do sensor DHT11

DHT dht(DHTPIN, DHTTYPE); //Inicializando o objeto dht do tipo DHT passando como parâmetro o pino (DHTPIN) e o tipo do sensor (DHTTYPE)

float temperatura; //variável para armazenar a temperatura
float umidade; //Variável para armazenar a umidade

int val = 0; // Cria a variavel Val que armazena o valor lido pelo sensor de nivel de agua

String msg; // Criar a variavel do tipo String msg

WiFiClient espClient; // Criar a variavel que sera usada para conectar no WIFI
PubSubClient client(espClient); // Criar a variavel que sera usada para conectar no Broker

void setup() {
  pinMode(sensorvcc, OUTPUT); // Define o pino vcc do sensor de nivel de agua como um output
 
  digitalWrite(sensorvcc, LOW); // Deixa o pino vcc do sendor de nivel de agua em LOW

  pinMode(buzzer,OUTPUT); // Define o buzzer como um output
  
  pinMode(Led, OUTPUT); // Define o led como um output

  Serial.begin(9600); // Define que o monitor serial sera iniciado na Configuração 115200

  dht.begin(); // inicia o sensor de umidade e temperatura
  
  //Inicia a Conexão com o WIFI
  WiFi.begin(ssid, password); // Inicia a conexão com o WIFI 
  while (WiFi.status() != WL_CONNECTED) { // Aguarda ate o Wifi estar conectado 
      delay(500); // Espera 500 milisegundo
      Serial.println("Iniciado conexão..."); // Mostrar no monitor serial o texto Iniciado conexão.
  }
  Serial.println("WIFI Conectado"); // Quando o WIFI conectar mostrar no monitor serial o texto WIFI Conectado
  // Termina de Conectar com o WIFI

  //Inicia a Conexão com o MQTT
  client.setServer(mqtt_broker, mqtt_port); // Inicia a conexão com o Broker
  client.setCallback(callback); // Verifica a resposta 
  while (!client.connected()) { // Aguarda ate o Broker estar conectado  
      String client_id = "esp8266-client-dw"; // Define o ID que o ESP usara no Broker
      client_id += String(WiFi.macAddress()); // Criar um ID usando o MAC address para que nao aja conflito de ids
      Serial.printf("Conectando a Broker\n", client_id.c_str());
      if (client.connect(client_id.c_str(), mqtt_username, mqtt_password)) { // coloca o mqtt_username e o mqtt_password para que seja feito o login no Broker
           Serial.println("Broker Conectado"); // Mostrar no monitor serial o texto Broker Conectado
      } else { // Caso nao consiga se conectar a o Broker
          Serial.print("Falha na conexão"); // Mostrar no monitor serial o texto Falha na conexão
          Serial.print(client.state()); // Mostrar no monitor serial o Status da conexão
          delay(2000); // Aguarda dois segundos para uma nova conexão
      }
  }
  //Termina de conectar com MQTT
  
  
  client.subscribe(topicProject); // Se inscreve no Topico para receber futuras mensagem de resposta
  client.publish(topicProject, "Null/ESP"); // Publica no topico defino A mesagem Null/ESP
  client.subscribe(topicNivelAlert); // Se inscreve no Topico para pode enviar mensagem do nivel do sensor
  client.subscribe(topicUmidade); // Se inscreve no Topico para pode enviar mensagem do nivel do Umidade
  client.subscribe(topicTemperatura); // Se inscreve no Topico para pode enviar mensagem do nivel do Temperatura
}

void callback(char *topic, byte *payload, unsigned int length) { // Caso tenha uma mensagem do broker 
  Serial.print("Mensagem publica no Topico: "); // Mostrar no monitor serial o texto Mensagem publica no Topico:
  Serial.println(topic); // Mostrar no monitor serial o Topico
  Serial.print("Mesagem:"); // Mostrar no monitor serial o texto Mensagem:

  String msg; // Reseta a messagem para que nao haja erro
  
  for (int i = 0; i < length; i++) { // Cria um For para receber a messagem
      Serial.print((char) payload[i]); // Mostra no monitor seril cada letra da mesagem
      char c = ((char) payload[i]); // Amarzena as letras na variavel c
      msg += c; // Armazena as letras para criar a mesagem
  }
  
  Serial.println(); // Pula uma linha
}

void loop() {
  client.loop(); //Inicia o loop de conexão
  umidade = dht.readHumidity(); // le a umidade e armazena no sensor de umidade
   
  int level = readSensor(); // exuta a funcao de leitura do sensor e armazena o valor de val na variavel level
  
  if (umidade >= 40 and level > 400) { // verifica se o as condicoes sao atendidas
   client.publish(topicNivelAlert, "Aviso"); // publica no topico NivelAlert a mensagem Aviso
   digitalWrite(Led, HIGH); // Liga o Led
   tone(buzzer, 500); // Liga o Buzzer
   delay(1000); // espera 1 segundo
  }
  digitalWrite(Led, LOW); // Desliga o led

  noTone(buzzer); // Desliga o Buzzer
}

int readSensor() {  // Funcao que le os dados do sensor 
digitalWrite(sensorvcc, HIGH); // Deixa o pino ligado a vcc do sensor de nivel de agua HIGH 
delay(10); // Espera 10 milisegundos              
val = analogRead(sensorsinal); // faz a leitura do sensor
digitalWrite(sensorvcc, LOW);  // Deixa o pino ligado a vcc do sensor de nivel de agua LOW
return val; // Retorna a variavel com valor lido no sensor           
}
