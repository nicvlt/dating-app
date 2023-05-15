import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, Text, Dimensions, Image, StatusBar } from 'react-native'
import Textinput from '../components/Textinput'
import Button from '../components/Button'
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"
import {auth, storageRef, db } from '../scripts/firebase'
import Toast from 'react-native-toast-message'
import { useRoute } from '@react-navigation/native';
import { doc, setDoc } from "firebase/firestore";

const windowHeight = Dimensions.get('window').height

export default function RegisterEmail({navigation}, props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('');
    const route = useRoute();
    const emailFromRoute = route.params.email;

    if (emailFromRoute != ""){
        setEmail(emailFromRoute)
    }

    const handleShowToast = () => {
        Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Error',
            text2: error,
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 10,
        })
    }

    const handleRegister = () => {

        if (password !== confirmPassword){
            setError('Passwords do not match')
            handleShowToast()
            return;
        }
        
        createUserWithEmailAndPassword(auth, email, password)
        .then(async () => {
            sendEmailVerification(auth.currentUser)
            navigation.navigate("RegisterName", {email: email, uuid: auth.currentUser.uid})
        })
        .catch((e) => {
            const errorCode = e.code;
            const errorMessage = e.message;
            console.log(errorCode, errorMessage)
            switch(errorCode){
                case 'auth/invalid-email':
                    setError('Please enter a valid email')
                    break;
                case 'auth/weak-password':
                    setError('Password must be at least 6 characters')
                    break;
                case 'auth/email-already-in-use':
                    setError('Email already in use')
                    break;
                
                default:
                    setError('Please enter a valid email and password')
            }
            handleShowToast()
        });
    }

    return(
        <ScrollView style={styles.main} softwareKeyboardLayoutMode={'pan'} scrollEnabled={false}>
            <View style={styles.progressionBar}>
                <View style={styles.progressionBarFull}></View>
            </View>
            <StatusBar style={styles.status}/>
            <View style={styles.container}>
                <Text style={styles.title}>Email Address</Text>
                <Textinput placeholder={"Email"} setter={setEmail}/>
                <Textinput placeholder={"Password"} setter={setPassword} isPassword/>  
                <Textinput placeholder={"Confirm password"} setter={setConfirmPassword} isPassword/>  
                <Button text={'Next'} background={true} onPress={handleRegister}/> 
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
        height: windowHeight,
        alignItems: 'center',
        width: '100%',
    },
    title:{
        fontSize: 55,
        fontWeight: '400',
        color: '#171417',
        marginTop: '10%',
        padding:25,
        letterSpacing:1,
        width: '86%',
    },
    status:{
        backgroundColor: 'black',
        height: StatusBar.currentHeight,
        width: '100%',
        position: 'absolute',
    },
    progressionBar:{
        backgroundColor: '#CCCCCC',
        height: 8,
        width: '100%',
        position: 'absolute',
    },
    progressionBarFull:{
        backgroundColor: '#e84c5c',
        height: 8,
        width: '14%',
        position: 'absolute',
    },
})