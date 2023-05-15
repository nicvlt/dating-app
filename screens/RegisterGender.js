import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, Text, Dimensions, StatusBar } from 'react-native'
import Button from '../components/Button'
import Toast from 'react-native-toast-message'
import { useRoute } from '@react-navigation/native';
import RadioButton from '../components/RadioButton'

const windowHeight = Dimensions.get('window').height 

export default function RegisterGender({navigation}) {
    const route = useRoute();
    const email = route.params.email;
    const name = route.params.name;
    const date = route.params.date;
    const [gender, setGender] = useState(null);
    const [error, setError] = useState('');
    const uuid = route.params.uuid;
    const age = route.params.age;

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

    const options = [
        { value: 'Female' },
        { value: 'Male' },
        { value: 'Other' },
      ];

    const handleGender = () => {
        // Check if the user selected an option
        if (gender == null) {
            setError('Please select an option')
            handleShowToast()
        }
        else {
            navigation.navigate('RegisterOrientation', {email: email, name: name, date: date, gender: gender, 
                uuid: uuid, age: age})
        }
    }
    return (
        <ScrollView style={styles.main} softwareKeyboardLayoutMode={'pan'} scrollEnabled={false}>
            <StatusBar style={styles.status}/>
            <View style={styles.progressionBar}>
                <View style={styles.progressionBarFull}></View>
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>I am a</Text>
                <RadioButton data={options} onSelect={(value) => setGender(value)} />
                <Button text={'Next'} background={true} onPress={handleGender}/> 
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
        marginBottom: '10%',
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
        width: '56%',
        position: 'absolute',
    },
})