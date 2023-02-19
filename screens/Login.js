import React, {useState} from 'react'
import { StyleSheet, View, ScrollView, Text, Dimensions } from 'react-native'
import Textinput from '../components/Textinput'
import Button from '../components/Button'
import Icon from 'react-native-vector-icons/Ionicons'
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '../scripts/firebase'

const windowHeight = Dimensions.get('window').height

export default function Login({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  
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
        })
    }

    return(
        <ScrollView style={styles.main} softwareKeyboardLayoutMode={'pan'} scrollEnabled={false}>
            <View style={styles.container}>
                <Icon name={'people'} size={140} color={'#e84c5c'}/>
                <Text style={styles.title}>Welcome back!</Text>
                <Textinput placeholder={"Email"} setter={setEmail}/>
                <Textinput placeholder={"Password"} setter={setPassword}/>  
                <Button text={'Log into account'} background={true} onPress={handleLogin}/> 
                
            </View>
            <View style={styles.textContainer}>
                    <Text style={styles.message}>Don't have an account ?</Text>
                    <Text onPress={() => {navigation.navigate('Register')}} style={styles.register}> Register !</Text>
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