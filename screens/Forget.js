import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, Text, Dimensions, Image } from 'react-native'
import Textinput from '../components/Textinput'
import Button from '../components/Button'
import { sendPasswordResetEmail, fetchSignInMethodsForEmail } from "firebase/auth"
import { auth } from '../scripts/firebase'
import Toast from 'react-native-toast-message'

const windowHeight = Dimensions.get('window').height 

export default function Forget({navigation}) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleShowToastError = () => {
        Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Error',
            text2: error,
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 50,
        })
    };
    const handleShowToastSuccess = () => {
        Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Success',
            text2: "Password email reset sent",
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 50,
        })
    };

    const handleChangePass = () => {
        
        sendPasswordResetEmail(auth, email)
            .then(() => {
                fetchSignInMethodsForEmail(auth, email)
                    .then((signInMethods) => {
                        if (signInMethods.length === 0) {
                            setError("Email address not found");
                            handleShowToastError();
                        } else {
                        // Email address exists in Firebase Authentication
                        handleShowToastSuccess();
                        setTimeout(() => {
                            navigation.navigate('Home');
                          }, 2000);
                        }
                     })
                     .catch((error) => {
                        setError("Error occurred while fetching sign-in methods for email");
                        handleShowToastError();
                    });
            })
            .catch((e) => {
                const errorCode = e.code;
                const errorMessage = e.message;
                console.log(errorCode, errorMessage)
                switch(errorCode){
                    case 'auth/invalid-email':
                        setError('Please enter a valid email')
                        break;
                    case 'auth/user-not-found':
                        setError("Email address not found");
                        break;
                    default:
                        setError('Default Error');
                }
            handleShowToastError()
        });
    }
    

    return(
        <ScrollView style={styles.main} softwareKeyboardLayoutMode={'pan'} scrollEnabled={false}>
            <View style={styles.container}>
                <Image style={styles.logo} source={require('../assets/logo.png')}></Image>
                <Text style={styles.title}>Password forgotten ?</Text>
                <Textinput placeholder={"Email"} setter={setEmail}/>
                <Button text={'Change password'} background={true} onPress={handleChangePass}/> 
                
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.message}>Don't have an account ?</Text>
                <Text onPress={() => {navigation.navigate('Register')}} style={styles.register}> Register !</Text>
            </View>
            <View style={styles.textContainer}>
                    <Text style={styles.message}>Already have an account ?</Text>
                    <Text onPress={() => {navigation.navigate('Login')}} style={styles.register}> Log in !</Text>
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
        top: -50,
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