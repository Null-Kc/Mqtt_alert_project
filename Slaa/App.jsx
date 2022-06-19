import * as React from 'react'; // Importa o react 
import { NavigationContainer } from '@react-navigation/native'; // IMporta a biblioteca react native navigation
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'; // importa da biblioteca react native navigation o navigation stack

import Menu from './src/Screens/Menu'; // importa a tela de MENU
import Levelviewer from './src/Screens/Levelviewer'; // importa a tela de Levelviewer
import Thermometer from './src/Screens/Thermometer'; // importa a tela de Thermometer

const TransitionScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS, // Define como vai ser a transicao entre as telas
};

const Stack = createStackNavigator(); // Cria a contante stack

function MyStack() { // cria as rotaS do aplicativo
  return (
    <Stack.Navigator screenOptions={TransitionScreenOptions} initialRouteName="Menu">  
      <Stack.Screen name="Menu" component={Menu}  options={{
        title: 'Menu',
          headerStyle: {
            backgroundColor: '#ff0000',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
       <Stack.Screen name="Levelviewer" component={Levelviewer} options={{
        title: 'Level viewer',
          headerStyle: {
            backgroundColor: '#ff0000',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
        <Stack.Screen name="Thermometer" component={Thermometer} options={{
        title: 'Thermometer',
          headerStyle: {
            backgroundColor: '#ff0000',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
    </Stack.Navigator>
  );
}

export default function App() { // expota essa rodas como uma funcao
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}