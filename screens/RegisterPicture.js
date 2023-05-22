import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, Pressable, StatusBar, Dimensions} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button'
import Toast from 'react-native-toast-message'
import { useRoute } from '@react-navigation/native';
import { storagePP, ref } from '../scripts/firebase'
import { uploadBytes } from "firebase/storage";
import { decode } from 'base-64';

if (typeof atob === 'undefined') {
    global.atob = decode;
}


const windowHeight = Dimensions.get('window').height 

export default function RegisterPicture({ navigation }) {
    const [image, setImage] = useState(null)
    const [imageUri, setImageUri] = useState('')
    const [pressedImage, setPressedImage] = useState(false)
    const [type, setType] = useState('')
    const route = useRoute();
    const email = route.params.email;
    const name = route.params.name;
    const date = route.params.date;
    const orientation = route.params.orientation;
    const gender = route.params.gender;
    const interest = route.params.interest;
    const uuid = route.params.uuid;
    const age = route.params.age;

    const [error, setError] = useState('');

    const reverseString = (str) => {
        return str === '' ? '' : reverseString(str.substr(1)) + str.charAt(0)
    }

    const uploadImage = async () => {
        const imageRef = ref(storagePP, email)

        const imgBytes = await fetch(imageUri)
        const imgBlob = await imgBytes.blob()

        await uploadBytes(imageRef, imgBlob);
    }


    const handleShowToastError = () => {
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


    
    const findTypeImage = (str) => {
        str = reverseString(str)
        let type = str.split('.')
        type = reverseString(type[0])
        return type
    }

    const handleConfirm = async () => {
        if (image === null) {
            setError('Please upload a profile picture')
            handleShowToastError()
        }
        else {
            try {
                uploadImage()
                navigation.navigate('RegisterVideo', {name: name, gender: gender, orientation: orientation, 
                    date: date, interest: interest, email: email, uuid: uuid, age: age})
            } catch (e) {
                setError('Error uploading profile picture')
                handleShowToastError()
            }
        }
    }

    const handleSkip = () => {
        navigation.navigate('RegisterVideo', {name: name, gender: gender, orientation: orientation, 
            date: date, interest: interest, email: email, uuid: uuid, age: age})
    }

    const handlePickImage = async () => {
        // Ask the user for the permission to access the camera
        const permissionResult = ImagePicker.requestMediaLibraryPermissionsAsync()
    
        if (permissionResult.granted === false) {
          alert("You've refused to allow this app to access your gallery!")
          return
        }
    
        //choose image in library
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 4],
                quality: 1,
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                base64: true
            }
        )

        if (pickerResult.cancelled === false) {
            setImage(pickerResult.base64)
            setImageUri(pickerResult.uri)
            setType(findTypeImage(pickerResult.uri))
        }
      }

    return(
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            style={styles.main}
            softwareKeyboardLayoutMode={'pan'} 
            scrollEnabled={false}>
            <StatusBar style={styles.status}/>
            <View style={styles.progressionBar}>
                <View style={styles.progressionBarFull}></View>
            </View>
            <Pressable onPress={handleSkip}>
                <Text style={styles.skip}>Skip</Text>
            </Pressable>
            <View style={styles.title}>
                <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                >
                <Text style={styles.title}>Hello!</Text>
                </View>
                <Text style={styles.subtitle}>Choose your best picture</Text>
            </View>
            <View style={styles.bodyContainer}>
                <Pressable style={[ styles.imageContainer, { borderWidth: pressedImage ? 1 : 0.5, }, ]}
                    onPressIn={() => { setPressedImage(true) }}
                    onPressOut={() => { handlePickImage(); setPressedImage(false) }}
                >
                {image === null ? (
                    <Ionicons name='person' color="#e84c5c" size={100} style={[{ 
                        backgroundColor: 'white', 
                        borderRadius: 100,
                        padding: 18 },
                    ]} />
                ) : (
                    <Image
                    source={{ uri: `data:image/${type};base64,${image}` }}
                    style={styles.image}
                    />
                )}
                <View style={styles.iconAddImage}>
                    <Ionicons name='add' color="#e84c5c" size={30} />
                </View>
                </Pressable>
                <View>
                    <Button
                        text="Next"
                        background={true}
                        onPress={handleConfirm}
                    />
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
    skip:{
        fontSize: 18,
        fontWeight: '400',
        color: '#AAAAAA',
        marginTop:25,
        letterSpacing:1,
        width: '100%',
        textAlign: 'right',
        paddingRight: 20,
    },
    title:{
        fontSize: 55,
        fontWeight: '400',
        color: '#171417',
        marginTop:25,
        letterSpacing:1,
        width: '100%',
        textAlign: 'center',
    },
    subtitle:{
        fontSize: 18,
        fontWeight: '400',
        color: '#AAAAAA',
        marginTop:25,
        marginBottom:25,
        letterSpacing:1,
        width: '100%',
        textAlign: 'center',
    },
    bodyContainer: {
        height: '100%',
        alignItems: 'center',
    },
    imageContainer: {
        height: 200,
        width: 200,
        backgroundColor: 'white',
        borderRadius: 200,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        marginTop:10,
        marginBottom:38,
      },
    image: { 
        borderRadius: 200, 
        padding: 100,
    },
    iconAddImage: {
        backgroundColor: 'white',
        width: 50,
        height: 50,
        borderRadius: 200,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 2,
        bottom: 0,
        right: 2,
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
        width: '84%',
        position: 'absolute',
    },
})