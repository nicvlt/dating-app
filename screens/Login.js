import React, {useState} from 'react'
import { StyleSheet, View, ScrollView, Text, Dimensions, StatusBar } from 'react-native'
import Textinput from '../components/Textinput'
import Button from '../components/Button'
import { signInWithEmailAndPassword } from "firebase/auth"
import {auth, db } from '../scripts/firebase'
import Toast from 'react-native-toast-message'
import { doc, getDoc } from "firebase/firestore"; 


/// Jumper vers register name si pas de compte

const windowHeight = Dimensions.get('window').height

export default function Login({navigation}) {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');

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
  
    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // Signed in 
            const user = userCredential.user;
            const isVerified = user.emailVerified;
            if(!isVerified){
                setError("Please verify your email")
                handleShowToast()
                return
            }
            else {
                const docRef = doc(db, "users", email);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    navigation.navigate("Main", {email: email, uuid: auth.currentUser.uid })
                } 
                else {
                    navigation.navigate("RegisterName", {email: email, uuid: auth.currentUser.uid })
                }
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            setError("Wrong email or password")
            handleShowToast()
        })
    }
    // Forget Password
    const forgetPassword = () => {
        firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            alert("Password reset email sent")
        }).catch((error) => {
            alert(error)
        })
    }

    return(
        <ScrollView style={styles.main} softwareKeyboardLayoutMode={'pan'} scrollEnabled={false}>
            <StatusBar style={styles.status}/>
            <View style={styles.container}>
                <Text style={styles.title}>Welcome back !</Text>
                <Textinput placeholder={"Email"} setter={setEmail}/>
                <Textinput placeholder={"Password"} setter={setPassword} isPassword/>
                <View style={styles.textContainer}>
                    <Text style={styles.message}>Don't have an account ?</Text>
                    <Text onPress={() => {navigation.navigate('RegisterEmail', {email: ''})}} style={styles.register}> Register !</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.message}>Forget password ?</Text>
                    <Text onPress={() => {navigation.navigate('Forget')}} style={styles.register}> Reset password</Text>
                </View>
                <View style={styles.button}>
                <Button text={'Log in'} background={true} onPress={handleLogin}/>  
                </View>
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
        width: '100%',
        windowHeight: windowHeight,
    },
    status:{
        backgroundColor: 'black',
        height: StatusBar.currentHeight,
        width: '100%',
        position: 'absolute',
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
    textContainer:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '75%',
        marginTop: 5,
    },
    message:{
        fontSize: 12,
        fontWeight: '500',
        color: '#666666',
    },
    register:{
        fontSize: 12,
        fontWeight: '500',
        color: '#e84c5c',
    },
    button:{
        marginTop: '20%',
    }
})