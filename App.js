import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from './screens/Home'
import Login from './screens/Login'
import Register from './screens/Register'
import Main from './screens/Main'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export default function App() {

  React.useEffect(() => {
    console.log(process.env.apiKey)
  }, [])
  return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ header: () => null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
