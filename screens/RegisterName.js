import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, Text, Dimensions, StatusBar } from 'react-native'
import Textinput from '../components/Textinput'
import Button from '../components/Button'
import Toast from 'react-native-toast-message'
import { useRoute } from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height 

export default function RegisterName({navigation}) {
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const route = useRoute()
    const email = route.params.email
    const uuid = route.params.uuid

    function validateName(name) {
        const pattern = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        return pattern.test(name);
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

    const handleName = () => {
        const name_trim = name.trim()
        if (name_trim == '' || !validateName(name_trim)) {
            setError("Please enter a valid name")
            handleShowToast()
        }
        else {
            navigation.navigate('RegisterDate', {name: name_trim, email: email, uuid: uuid})
        }
    }

    return (
        <ScrollView style={styles.main} softwareKeyboardLayoutMode={'pan'} scrollEnabled={false}>
            <StatusBar style={styles.status}/>
            <View style={styles.progressionBar}>
                <View style={styles.progressionBarFull}></View>
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>Welcome</Text>
                <Text style={styles.subtitle}>Tell the world your name. Be careful, you won't be able to change it afterwards.</Text>
                <Textinput placeholder={"Name"} setter={setName} issurname/>  
                <Button text={'Next'} background={true} onPress={handleName}/> 
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
    subtitle: {
        fontSize: 15,
        fontWeight: '400',
        marginBottom: '20%',
        color: '#AAAAAA',
        width: '74%',
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
        width: '24%',
        position: 'absolute',
    },
})