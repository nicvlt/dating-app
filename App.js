import React from 'react';
import Home from './screens/Home';
import Login from './screens/Login';
import RegisterName from './screens/RegisterName';
import RegisterOrientation from './screens/RegisterOrientation';
import RegisterPicture from './screens/RegisterPicture';
import RegisterEmail from './screens/RegisterEmail';
import RegisterDate from './screens/RegisterDate';
import RegisterGender from './screens/RegisterGender';
import RegisterInterest from './screens/RegisterInterest';
import RegisterVideo from './screens/RegisterVideo';
import Forget from './screens/Forget';
import Account from './screens/Account';
import Chat from './screens/Chat';
import EditInterest from './screens/EditInterest';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MatchScroll from './screens/MatchScroll';
import { Ionicons } from '@expo/vector-icons';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Account" component={Account} options={{ header: () => null }} />
      <Stack.Screen name="EditInterest" component={EditInterest} options={{ header: () => null, tabBarVisible: false, tabBarStyle: { display: 'none' } }} />
    </Stack.Navigator>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, "tabBarActiveTintColor": "#e84c5c", 
                                    "tabBarInactiveTintColor": "black", "tabBarStyle": [{ "display": "flex"}, null ]
                                    }}>
      <Tab.Screen name="MatchScroll" component={MatchScroll} options={{header: () => null, tabBarShowLabel: false, tabBarIcon: ({ color, focused }) => (
                                <Ionicons name={focused ? 'home' : 'home-outline'} size={30} color={focused ? color : 'black'} />
                                )}}  />
      <Tab.Screen name="Chat" component={Chat} options={{header: () => null, tabBarShowLabel: false, tabBarIcon: ({ color, focused }) => (
                                <Ionicons name={focused ? 'chatbox' : 'chatbox-outline'} size={30} color={focused ? color : 'black'} />
                                ) }} />
      <Tab.Screen name="AccountStack" component={AccountStack} options={{header: () => null, tabBarShowLabel: false, tabBarIcon: ({ color, focused }) => (
                                <Ionicons name={focused ? 'person' : 'person-outline'} size={30} color={focused ? color : 'black'} />
                                ) }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ header: () => null }} />
        <Stack.Screen name="Login" component={Login} options={{ header: () => null }} />
        <Stack.Screen name="Forget" component={Forget} options={{ header: () => null }} />
        <Stack.Screen name="RegisterName" component={RegisterName} options={{ header: () => null }} />
        <Stack.Screen name="RegisterOrientation" component={RegisterOrientation} options={{ header: () => null }} />
        <Stack.Screen name="RegisterEmail" component={RegisterEmail} options={{ header: () => null }} />
        <Stack.Screen name="RegisterPicture" component={RegisterPicture} options={{ header: () => null }} />
        <Stack.Screen name="RegisterDate" component={RegisterDate} options={{ header: () => null }} />
        <Stack.Screen name="RegisterInterest" component={RegisterInterest} options={{ header: () => null }} />
        <Stack.Screen name="RegisterGender" component={RegisterGender} options={{ header: () => null }} />
        <Stack.Screen name="RegisterVideo" component={RegisterVideo} options={{ header: () => null }} />
        <Stack.Screen name="Main" component={MainTabNavigator} options={{ header: () => null }} />
        <Stack.Screen name="EditInterest" component={EditInterest} options={{ header: () => null, tabBarVisible: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
