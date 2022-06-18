const char *mqtt_broker = "mqtt.internetecoisas.com.br"; // Cria a variavel mqtt_broker onde fica armazenado o URL do Broker
const char *topicProject = "Null/project"; // Cria a variavel topicProject usada para sabermos se a Conexão foi bem sucedida
const char *topicNivelAlert = "Null/NivelAlert"; // Cria a variavel topicNivelAlert onde sera publicado a Mensagem de aviso
const char *topicNivel = "Null/Nivel"; // Cria a variavel topicNivel onde sera publicado os valores lidos pelo sensor de nivel de agua
const char *topicUmidade = "Null/Umidade"; // Cria a variavel topicUmidade onde sera publicado os valores lidos pelo sensor de Umidade
const char *topicTemperatura = "Null/Temperatura"; // Cria a variavel topicTemperatura  onde sera publicado os valores lidos pelo sensor de Temperatura
const int mqtt_port = 1883; // Criar a variavel mqtt_port onde ficara a armazenado a porta onde o Broker estar localizada
