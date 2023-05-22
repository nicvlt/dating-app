import { StyleSheet, Text, View, Image, StatusBar } from 'react-native'
import React, { useState } from 'react'
import Button from '../components/Button'
import Icon from 'react-native-vector-icons/Ionicons'


export default function Home({ navigation }) {
    return(
        <View style={styles.container}>
                <Image style={styles.logo} source={require('../assets/logo.png')}></Image>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    Maate
                </Text>
                <Text style={styles.subtitle}>
                    Neque porro quisquam est qui dolorem
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button text="Log In" background={false} 
                onPress={() => {navigation.navigate('Login')}}/>
                <Button text="Sign Up" background={true}
                onPress={() => {navigation.navigate('RegisterEmail', {email: ''})}}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f3f2f2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo:{
        userSelect: 'none',
        height: 300,
        resizeMode: 'contain',
        width: 300,
        marginBottom:'10%',
        marginLeft: 9,
    },
    status:{
        backgroundColor: 'black',
        height: StatusBar.currentHeight,
        width: '100%',
        position: 'absolute',
    },
    titleContainer:{
        width: '90%',
        alignItems: 'center',
        color: '#171417',
        marginBottom:'20%'
    },
    title:{
        width: '85%',
        fontSize: 44,
        fontWeight: '800',
        marginBottom:12,
        textAlign:'center',
    },
    subtitle:{
        width: '85%',
        fontSize: 17,
        fontWeight:'500',
        textAlign:'justify',
        textAlign:'center',
        color:'#666666'
    },
    buttonContainer:{
        position: 'absolute',
        bottom: 80,
        flexDirection: 'row',
    }
})