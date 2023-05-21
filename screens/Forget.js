import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, Text, Dimensions, Image, StatusBar } from 'react-native'
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
            <StatusBar style={styles.status}></StatusBar>
            <View style={styles.container}>
                <Text numberOfLines={2} style={styles.title}>Reset your password</Text>
                <Textinput placeholder={"Email"} setter={setEmail}/>
            </View>
            <View style={styles.button}>
                <Button text={'Change password'} background={true} onPress={handleChangePass}/>
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
        fontSize: 50,
        fontWeight: '400',
        color: '#171417',
        marginTop: '20%',
        marginBottom: '10%',
        padding:25,
        letterSpacing:1,
        width: '86%',
    },
    textContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:  5,
        justifyContent: 'flex-start',
        width: '75%',
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
        alignItems: 'center',
        width: '100%',
        windowHeight: windowHeight,
        marginTop: '15%',
    }
})