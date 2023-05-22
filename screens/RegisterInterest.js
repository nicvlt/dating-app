import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, Text, Dimensions, StatusBar, Pressable } from 'react-native'
import Button from '../components/Button'
import Toast from 'react-native-toast-message'
import { useRoute } from '@react-navigation/native';
import TagSelect from '../components/TagSelect';

const windowHeight = Dimensions.get('window').height 

export default function RegisterInterest({navigation}) {
    const route = useRoute();
    const email = route.params.email;
    const name = route.params.name;
    const date = route.params.date;
    const orientation = route.params.orientation;
    const gender = route.params.gender;
    const [interest, setInterest] = useState([
        { id: 1, label: 'Soccer' },
        { id: 2, label: 'Gamer' },
        { id: 3, label: 'Climbing' },
        { id: 4, label: 'Fishing' },
        { id: 5, label: 'Photography' },
        { id: 6, label: 'Cooking' },
        { id: 7, label: 'Reading' },
        { id: 8, label: 'Music' },
        { id: 9, label: 'Dancing' },
        { id: 10, label: 'Streammer' },
        { id: 11, label: 'Youtuber' },
        { id: 12, label: 'Fitness' },
        { id: 13, label: 'Hiking' },
        { id: 14, label: 'Running' },
        { id: 15, label: 'Art' },
        { id: 16, label: 'Fashion' },
        { id: 17, label: 'Traveling' },
        { id: 18, label: 'Gardening' },
        { id: 19, label: 'Shopping' },
        { id: 20, label: 'Golf' },
        { id: 21, label: 'Tennis' },
        { id: 22, label: 'NBA' },
        { id: 23, label: 'Baseball' },
        { id: 24, label: 'Politics' },
        { id: 25, label: 'Volunteering' },
        { id: 26, label: 'Cars' },
        { id: 27, label: 'Motorcycles' },
        { id: 28, label: 'Skiing' },
        { id: 29, label: 'Marvels' },
        { id: 30, label: 'DC' },
        { id: 31, label: 'Anime' },
        { id: 32, label: 'Manga' },
        { id: 33, label: 'Kpop' },
        { id: 34, label: 'Kdrama' },
        { id: 35, label: 'Netflix' },
        { id: 36, label: 'Disney' },
        { id: 37, label: 'HBO' },
        { id: 38, label: 'Poetry' },
        { id: 39, label: 'Writing' },
        { id: 40, label: 'Blogging' },
        { id: 41, label: 'Playstation' },
        { id: 42, label: 'Xbox' },
        { id: 43, label: 'Nintendo' },
        { id: 44, label: 'PC' },
        { id: 45, label: 'Coding' },
        { id: 46, label: 'Tech' },
        { id: 47, label: 'Science' },
        { id: 48, label: 'Math' },
        { id: 49, label: 'History' },
        { id: 50, label: 'Economics' },
        { id: 51, label: 'Musician' },
        { id: 52, label: 'Poker' },
        { id: 53, label: 'Chess' },
        { id: 54, label: 'Puzzles' },
        { id: 55, label: 'Board Games' },
        { id: 56, label: 'Card Games' },
        { id: 57, label: 'Bowling' },
        { id: 58, label: 'Party' },
        { id: 59, label: 'Clubbing' },
        { id: 60, label: 'Designer' },

    ]);
    const [selected, setSelected] = useState([]);
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

    const handleItemPress = (item) => {
        if (selected.includes(item.label)) {
            setSelected(selected.filter((i) => i !== item.label));
        } else {
            setSelected([...selected, item.label]);
        }
    };
    

    const handleInterest = () => {
        // Check if the user selected an option
        if (selected == null || selected.length == 0 || selected.length < 5) {
            setError('Please select 5 options')
            handleShowToast()
        }
        else {
            navigation.navigate('RegisterPicture', {name: name, gender: gender, orientation: orientation, 
                date: date, interest: selected, email: email, uuid: uuid, age: age})
        }
    }

    return (
        <ScrollView style={styles.main} softwareKeyboardLayoutMode={'pan'} scrollEnabled={false}>
            <StatusBar style={styles.status}/>
            <View style={styles.progressionBar}>
                <View style={styles.progressionBarFull}></View> 
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>Hobbies</Text>
                <Text style={styles.subtitle}>Tell the world what passionates you! You can choose up to 5 hobbies.</Text>
                <ScrollView style={styles.scroll}>
                    <TagSelect
                        data={interest}
                        max={5}
                        onItemPress={(item) => {
                            handleItemPress(item)
                        }}

                        onMaxError={() => {
                            setError('You can only select 5 options')
                            handleShowToast()
                        }}
                        itemStyle={styles.item}
                        itemStyleSelected={styles.itemSelected}
                        itemLabelStyle={styles.label}
                        itemLabelStyleSelected={styles.labelSelected}
                    />
                </ScrollView>
                <View style={styles.button}>
                    <Button text={'Next '+selected.length+"/5"} background={selected.length < 5 ? false : true} onPress={handleInterest}/>
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
        height: windowHeight,
        alignItems: 'center',
        width: '100%',
        zIndex: 100,
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
        marginBottom: 20,
        color: '#AAAAAA',
        width: '74%',
    },
    scroll:{
        width: '90%',
        height: '10%',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#CCCCCC',
        zIndex: 1,
        backgroundColor: '#EEEEEE',
    },
    item: {
        backgroundColor: '#FFFFFF',
        borderColor: '#AAAAAA',
        borderWidth: 1,
        borderRadius: 20,
        margin: 3,
    },
    itemSelected: {
        backgroundColor: '#e84c5c',
        borderColor: '#e84c5c',
        borderWidth: 1,
        borderRadius: 20,
        margin: 3,
    },
    label: {
        fontSize: 15,
        color: '#AAAAAA',
    },
    labelSelected: {
        fontSize: 15,
        color: '#FFFFFF',
    },
    status:{
        backgroundColor: 'black',
        height: StatusBar.currentHeight,
        width: '100%',
        position: 'absolute',
    },
    button:{
        borderBottomColor: '#CCCCCC',
        zIndex: 100,
        marginBottom: 20,
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
        width: '72%',
        position: 'absolute',
    },
})