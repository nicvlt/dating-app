import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, Text, Dimensions, Image, StatusBar, TextInput } from 'react-native'
import Button from '../components/Button'
import Toast from 'react-native-toast-message'
import { useRoute } from '@react-navigation/native';
import { MaskedTextInput } from "react-native-mask-text";
import moment from 'moment';

const windowHeight = Dimensions.get('window').height 

export default function RegisterDate({navigation}) {
    const route = useRoute();
    const email = route.params.email;
    const name = route.params.name;
    const [error, setError] = useState('');
    const [date, setDate] = useState(null)
    const uuid = route.params.uuid

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
    const isValidBirthdate = (birthdate) => {
        var dateFormat = "YYYY-MM-DD";
        return moment(birthdate, dateFormat, true).isValid();
    };

    function age(birthday) {
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    const handleDate = () => {
        const user_age = age(date)
        const isValidBirthdateBool = isValidBirthdate(date)
        if(!isValidBirthdateBool || user_age > 100 || user_age === NaN){
            setError('Please enter a valid date')
            handleShowToast()
        } 
        else if(user_age < 18){
            setError('You must be at least 18 years old to use this app')
            handleShowToast()
        } 
        else {
            navigation.navigate('RegisterGender', {email: email, name: name, 
                date: date.toISOString().split('T')[0], age: user_age, uuid: uuid})

        }
    }
            

    return(
        <ScrollView style={styles.main} softwareKeyboardLayoutMode={'pan'} scrollEnabled={false}>
            <StatusBar style={styles.status}/>
            <View style={styles.progressionBar}>
                <View style={styles.progressionBarFull}></View>
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>My birthdate</Text>
                <Text style={styles.subtitle}></Text>
                <MaskedTextInput
                    placeholder='YYYY-MM-DD'
                    keyboardType='numeric'
                    mask="9999-99-99"
                    onChangeText={(text, rawText) => {
                        setDate(new Date(text));
                    }}
                    style={styles.textInput}
                />
                <Button text={'Next'} background={true} onPress={handleDate}/> 
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
        width: '36%',
        position: 'absolute',
    },
    textInput: {
        letterSpacing: 3,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        margin: 5,
        borderRadius: 5,
        width:'75%',
        height: 60,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
      },
})
