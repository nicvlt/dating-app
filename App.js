import React from 'react'
import Home from './screens/Home'
import Login from './screens/Login'
import Register from './screens/Register'
import Main from './screens/Main'
import Forget from './screens/Forget'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator()

export default function App() {


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
            name="Forget"
            component={Forget}
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