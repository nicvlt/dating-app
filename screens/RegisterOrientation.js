import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, Text, Dimensions, Image, StatusBar } from 'react-native'
import Button from '../components/Button'
import Toast from 'react-native-toast-message'
import { useRoute } from '@react-navigation/native';
import RadioButton from '../components/RadioButton'


const windowHeight = Dimensions.get('window').height 

export default function RegisterOrientation({navigation}) {

    const [error, setError] = useState('')
    const route = useRoute();
    const name = route.params.name;
    const date = route.params.date;
    const gender = route.params.gender;
    const email = route.params.email;
    const uuid = route.params.uuid
    const age = route.params.age

    const [orientation, setOrientation] = useState([])

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
        { value: 'Women' },
        { value: 'Men' },
        { value: 'Everyone' },
      ];

    const handleOrientation = () => {
        if (orientation == null || orientation.length == 0) {
            setError('Please select at least 1 option')
            handleShowToast();
        }
        else {
            navigation.navigate('RegisterInterest',  {name: name, gender: gender, 
                orientation: orientation, date: date, email: email, uuid: uuid, age: age});

        }
    }

    return(
        <ScrollView style={styles.main} softwareKeyboardLayoutMode={'pan'} scrollEnabled={false}>
            <StatusBar style={styles.status}/>
            <View style={styles.progressionBar}>
                <View style={styles.progressionBarFull}></View>
            </View>
            <View style={styles.container}>
                <Text adjustsFontSizeToFit={true} numberOfLines={2} style={styles.title}>Who do you want to see ?</Text>
                <RadioButton data={options} onSelect={(value) => setOrientation(value)} />
            <Button text={'Next'} background={true} onPress={handleOrientation}/> 
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
        fontSize: 50,
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
        width: '60%',
        position: 'absolute',
    },
    button:{
        height: 50,
        backgroundColor: 'white',
    }, 
    buttonGroup:{
        width: '86%',
        marginTop: 20,
        height: windowHeight/3,
        backgroundColor: '#f3f2f2',
    },
    selectedButton:{
        backgroundColor: '#e84c5c',
        borderRadius: 10,
    },
    buttonText:{
        color: '#171417',
        fontSize: 18,
    },
    selectedButtonText:{
        color: 'white',
    },
    disabledSelectedButton:{
        backgroundColor: '#e84c5c',
        borderRadius: 10,
    },
    disabledButtonText:{
        color: '#171417',
        fontSize: 25,
    },
})