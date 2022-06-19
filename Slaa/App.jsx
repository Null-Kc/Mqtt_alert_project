import * as React from 'react';
import { StatusBar  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import Menu from './src/Screens/Menu';
import Levelviewer from './src/Screens/Levelviewer';
import Thermometer from './src/Screens/Thermometer';

const TransitionScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
};

const Stack = createStackNavigator();

function MyStack() {
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

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}