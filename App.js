import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Soundboard from './src/container/Soundboard';

const Stack = createStackNavigator();

export default function App() {
  return (
     <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Soundboard" component={Soundboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
