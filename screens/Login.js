import React, {useState} from 'react'
import { StyleSheet, View, ScrollView, Text, Dimensions, Image } from 'react-native'
import Textinput from '../components/Textinput'
import Button from '../components/Button'
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '../scripts/firebase'
import Toast from 'react-native-toast-message'

const windowHeight = Dimensions.get('window').height

export default function Login({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleShowToast = () => {
        Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Error',
            text2: 'Wrong email or password',
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 50,
        })
    }
  
    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            navigation.navigate('Main')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            handleShowToast()
        })
    }

    return(
        <ScrollView style={styles.main} softwareKeyboardLayoutMode={'pan'} scrollEnabled={false}>
            <View style={styles.container}>
                <Image style={styles.logo} source={require('../assets/logo.png')}></Image>
                <Text style={styles.title}>Welcome back !</Text>
                <Textinput placeholder={"Email"} setter={setEmail}/>
                <Textinput placeholder={"Password"} setter={setPassword} isPassword/>  
                <Button text={'Log into account'} background={true} onPress={handleLogin}/> 
                
            </View>
            <View style={styles.textContainer}>
                    <Text style={styles.message}>Don't have an account ?</Text>
                    <Text onPress={() => {navigation.navigate('Register')}} style={styles.register}> Register !</Text>
            </View>
            <Toast/>
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
    logo:{
        top:-70,
        position: 'absolute',
        userSelect: 'none',
        height: 250,
        resizeMode: 'contain',
        width: 250,
        marginBottom:'20%',
        left: 95,
        
    },
    title:{
        fontSize: 35,
        fontWeight: '600',
        color: '#171417',
        marginTop: '40%',
        marginBottom: '2%',
        padding:25,
        letterSpacing:1,
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