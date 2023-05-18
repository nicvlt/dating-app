import React from 'react'
import InfiniteScroll from '../components/InfiniteScroll'
import Settings from './Settings'
import MyCamera from './Camera'
import Chat from './Chat'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

export default function Main({navigation}){
    const Tab = createBottomTabNavigator();

    return(
        <NavigationContainer independent={true} headerShown={true}>
        <Tab.Navigator     
            screenOptions={{
                headerShown: false,
                "tabBarActiveTintColor": "#e84c5c",
                "tabBarInactiveTintColor": "black",
                "tabBarStyle": [
                    {
                    "display": "flex"
                    },
                    null
                ]
            }} >
            <Tab.Screen
                name="Home" 
                component={InfiniteScroll}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'home' : 'home-outline'} size={30} color={focused ? color : 'black'} />
                    )
                }} 
            />
            <Tab.Screen 
                name="Camera" 
                component={MyCamera} 
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'camera' : 'camera-outline'}  size={30} color={focused ? color : 'black'} />
                    )
                }}
            />
            <Tab.Screen 
                name="Chat" 
                component={Chat} 
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'chatbox' : 'chatbox-outline'}  size={30} color={focused ? color : 'black'} />
                    )
                }}
            />
            <Tab.Screen 
                name="Settings" 
                component={Settings}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'person' : 'person-outline'} size={30} color={focused ? color : 'black'} />
                    )
                }}
            />
        </Tab.Navigator>
        </NavigationContainer>
    )
}