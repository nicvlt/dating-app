import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import Button from '../components/Button'
import Icon from 'react-native-vector-icons/Ionicons';

export default function Home({ navigation }) {

    return(
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Icon name={'people'} size={160} color={'#e84c5c'}/>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    Lorem Ipsum
                </Text>
                <Text style={styles.subtitle}>
                    Neque porro quisquam est qui dolorem
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button text="Log In" background={false} 
                onPress={() => {navigation.navigate('Login')}}/>
                <Button text="Sign Up" background={true}
                onPress={() => {navigation.navigate('Register')}}/>
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
    iconContainer:{
        
    },
    titleContainer:{
        marginTop:'38%',
        width: '90%',
        alignItems: 'center',
        color: '#171417',
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
        bottom: 50,
        flexDirection: 'row',
    }
})