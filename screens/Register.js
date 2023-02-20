import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, Text, Dimensions, TextInput } from 'react-native'
import Textinput from '../components/Textinput'
import Button from '../components/Button'
import Icon from 'react-native-vector-icons/Ionicons';
import {firebase} from '../Firebase/firebase';

const windowHeight = Dimensions.get('window').height

export default function Login({navigation}) {

    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [confPassword, setConfPassword] = useState('');

    function sendEmail(email) {console.log(email);}
    function sendPass(password) {console.log(password);}
    function sendConfPass(confPassword) {console.log(confPassword);}
    
    function createUser(){
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
        })
    }

    return(
        <ScrollView style={styles.main} softwareKeyboardLayoutMode={'pan'}>
            <View style={styles.container}>
                <Icon name={'people'} size={140} color={'#e84c5c'}/>
                <Text style={styles.title}>Find perfection!</Text>
                <Textinput value={email} setter={setEmail}  placeholder={"Email"} />
                <Textinput value={password} setter={setPassword}  placeholder={"Password"} />
                <Textinput value={confPassword} setter={setConfPassword} placeholder={"Confirm Password"} />  
                <Button text={'Create account'} background={true} 
                onPress={() => {
                        sendEmail(email);
                        sendPass(password);
                        sendConfPass(confPassword);
                        createUser();
                        navigation.navigate('Main');
                    }}
                /> 
                
            </View>
            <View style={styles.textContainer}>
                    <Text style={styles.message}>Already have an account ?</Text>
                    <Text onPress={() => {navigation.navigate('Login')}} style={styles.register}> Log in!</Text>
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
        top: '10%',
    },
    title:{
        fontSize: 35,
        fontWeight: '800',
        color: '#171417',
        marginTop: '4%',
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
    },
    input:{
        height:68,
        width:'100%',
        borderRadius:15,
        color:'black',
        paddingTop:18,
        paddingBottom:4,
        paddingHorizontal:20,
        pointerEvents: 'auto',
        fontSize: 17,
        fontWeight: '500',
    }
})
