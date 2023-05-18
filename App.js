import React from 'react'
import Home from './screens/Home'
import Login from './screens/Login'
import RegisterName from './screens/RegisterName'
import RegisterOrientation from './screens/RegisterOrientation'
import RegisterPicture from './screens/RegisterPicture'
import RegisterEmail from './screens/RegisterEmail'
import RegisterDate from './screens/RegisterDate'
import RegisterGender from './screens/RegisterGender'
import RegisterInterest from './screens/RegisterInterest'
import Main from './screens/Main'
import Settings from './screens/Settings'
import Forget from './screens/Forget'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'





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
            name="RegisterName"
            component={RegisterName}
            options={{ header: () => null }}
          />
          <Stack.Screen
            name="RegisterOrientation"
            component={RegisterOrientation}
            options={{ header: () => null }}
          />
          <Stack.Screen
            name="RegisterEmail"
            component={RegisterEmail}
            options={{ header: () => null }}
          />
          <Stack.Screen
            name="Main"
            component={Main}
            options={{ header: () => null }}
          />
          <Stack.Screen
            name="RegisterPicture"
            component={RegisterPicture}
            options={{ header: () => null }}
          />
          <Stack.Screen
            name="RegisterDate"
            component={RegisterDate}
            options={{ header: () => null }}
          />
          <Stack.Screen
            name="RegisterInterest"
            component={RegisterInterest}
            options={{ header: () => null }}
          />
          <Stack.Screen
            name="RegisterGender"
            component={RegisterGender}
            options={{ header: () => null }}
          />
        </Stack.Navigator>
    </NavigationContainer>
  );
}