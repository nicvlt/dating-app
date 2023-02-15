import React from 'react'
import { StyleSheet, View, ScrollView, Text, Dimensions } from 'react-native'
import Textinput from '../components/Textinput'
import Button from '../components/Button'
import Icon from 'react-native-vector-icons/Ionicons';

const windowHeight = Dimensions.get('window').height

export default function Login({navigation}) {
  


    return(
        <ScrollView style={styles.main} softwareKeyboardLayoutMode={'pan'}>
            <View style={styles.container}>
                <Icon name={'people'} size={140} color={'#e84c5c'}/>
                <Text style={styles.title}>Welcome back!</Text>
                <Textinput placeholder={"Email"} />
                <Textinput placeholder={"Password"} />  
                <Button text={'Log into account'} background={true}/> 
                
            </View>
            <View style={styles.textContainer}>
                    <Text style={styles.message}>Don't have an account ?</Text>
                    <Text onPress={() => {navigation.navigate('Register')}} style={styles.register}> Register!</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    main:{
        backgroundColor: '#f3f2f2',
    },
    container:{
        alignItems: 'center',
        height: windowHeight,
        top: '15%',
    },
    title:{
        fontSize: 35,
        fontWeight: '800',
        color: '#171417',
        marginTop: '6%',
        marginBottom: '2%',
        padding:25,
    },
    textContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    message:{
        fontSize: 17,
        fontWeight: '500',
        color: '#666666',
    },
    register:{
        fontSize: 17,
        fontWeight: '500',
        color: '#e84c5c',
    }
})
