import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, Text, Dimensions, StatusBar, Pressable } from 'react-native'
import Button from '../components/Button'
import Toast from 'react-native-toast-message'
import { useRoute } from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height 

export default function RegisterInterest({navigation}) {
    const route = useRoute();
    const email = route.params.email;
    const name = route.params.name;
    const date = route.params.date;
    const orientation = route.params.orientation;
    const gender = route.params.gender;
    const [interest, setInterest] = useState([]);
    const [error, setError] = useState('');
    const uuid = route.params.uuid
    const age = route.params.age

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

    const handleInterest = () => {
        // Check if the user selected an option
        if (interest == null) {
            setError('Please select an option')
            handleShowToast()
        }
        else {
            navigation.navigate('RegisterPicture', {name: name, gender: gender, orientation: orientation, 
                date: date, interest: interest, email: email, uuid: uuid, age: age})
        }
    }

    const handleSkip = () => {
        setInterest([]);
        navigation.navigate('RegisterPicture', {name: name, gender: gender, orientation: orientation, 
            date: date, interest: interest, email: email, uuid: uuid, age: age});

    }

    return (
        <ScrollView style={styles.main} softwareKeyboardLayoutMode={'pan'} scrollEnabled={false}>
            <StatusBar style={styles.status}/>
            <View style={styles.progressionBar}>
                <View style={styles.progressionBarFull}></View> 
            </View>
            <Pressable onPress={handleSkip}>
                <Text style={styles.skip}>Skip</Text>
            </Pressable>
            <View style={styles.container}>
                <Text style={styles.title}>Hobbies</Text>
                <Button text={'Next'} background={true} onPress={handleInterest}/>
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
    skip:{
        fontSize: 20,
        fontWeight: '400',
        color: '#AAAAAA',
        padding: 25,
        letterSpacing:1,
        fontWeight: 'bold',
        textAlign: 'right',
    },
    title:{
        fontSize: 55,
        fontWeight: '400',
        color: '#171417',
        padding:25,
        letterSpacing:1,
        width: '86%',
        textAlign: 'left',
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
        width: '86%',
        position: 'absolute',
    },
})