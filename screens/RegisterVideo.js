import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable, StatusBar, Dimensions } from 'react-native'
import { useRoute } from '@react-navigation/native';
import Button from '../components/Button'
import * as ImagePicker from 'expo-image-picker'
import { Video } from 'expo-av'
import { storage, auth } from '../scripts/firebase'
import { uploadBytes, ref } from 'firebase/storage'
import { doc, setDoc } from "firebase/firestore";
import { db } from '../scripts/firebase'
import Toast from 'react-native-toast-message'

const windowHeight = Dimensions.get('window').height
if (typeof atob === 'undefined') {
    global.atob = decode;
} 

export default function RegisterVideo({ navigation }){
    const [video, setVideo] = useState(null)
    const videoRef = React.useRef(null)
    const toUploadRef = ref(storage, `videos/${auth.currentUser.email}.mp4`)
    const [error, setError] = useState('')
    const route = useRoute();

    const email = route.params.email;
    const name = route.params.name;
    const date = route.params.date;
    const orientation = route.params.orientation;
    const gender = route.params.gender;
    const interest = route.params.interest;
    const age = route.params.age;
    

    // Toasts //
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

    const handleShowToastSuccess = () => {
        Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Success',
            text2: 'Your account has been created',
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 10,
        })
    }

    // Video Picker //

    const handleVideoPicker = async () => {
        // Ask the user for the permission to access the library
        // Then launch the library to choose ONLY a video using mediaTypes ImagePickerOption
        const permissionResult =
            ImagePicker.requestMediaLibraryPermissionsAsync()
        if (permissionResult.granted === false) {
            alert("You've refused to allow this app to access your library!")
            return
        }
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        });
        if (pickerResult.hasOwnProperty('uri')) {
            setVideo(() => pickerResult.uri);
        }
    }


    const handleSubmit = async () => {
        // Video upload
        try {
            await setDoc(doc(db, "users", email), {
                birthdate: date,
                name: name,
                gender: gender, 
                orientation: orientation,
                interest: interest,
                age: age,
            });
            handleShowToastSuccess()
            fetch(video)
            .then(res => res.blob())
            .then(blob => uploadBytes(toUploadRef, blob))
            .then(() => {
                setVideo(null)
            })
            setTimeout(() => {
                navigation.navigate('Home')
            }, 3000)
        }
        catch (e) {
            setError('Error uploading video')
            handleShowToastError()
        }
    }

    const handleCancel = () => {
        setVideo(null)
    }

    return(
        <View style={[styles.main, { backgroundColor: video ? "#000000" : "#f3f3f3" }]}>
            <StatusBar style={styles.status}/>
            {video == null ? (
                <>
                <View style={styles.progressionBar}>
                    <View style={styles.progressionBarFull}></View>
                </View>
                <View style={styles.titleView}>
                    <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    >
                    <Text style={styles.title}>Action!</Text>
                    </View>
                        <Text style={styles.subtitle}>Choose your best video</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button text="Upload Video" background={true} onPress={handleVideoPicker}/>
                    </View>
                </>
            ) : 
                <>
                    <Video
                        ref={videoRef}
                        source={{ uri: video }}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="contain"
                        isLooping
                        shouldPlay
                    />
                    <View style={styles.mediaPlayerContainer}>
                        <Pressable style={styles.button} onPress={handleCancel}>
                            {/* To remove for an icon */}
                            <Text style={styles.buttonText}>Cancel</Text>
                        </Pressable>
                        <Pressable style={styles.button} onPress={handleSubmit}>
                            {/* To remove for an icon */}
                            <Text style={styles.buttonText}>Sign In</Text>
                        </Pressable>
                        
                    </View>
                </>
            }
            <Toast/>
        </View>
    )
} 

const styles = StyleSheet.create({
    main:{
        height: windowHeight,
        alignItems: 'center',
        width: '100%',
        zIndex: 100,
    },
    titleView:{
        justifyContent: 'center',
        alignItems: 'center',
        height: '50%',
        marginTop: 150,
    },
    title:{
        fontSize: 55,
        fontWeight: '400',
        color: '#171417',
        marginTop:25,
        letterSpacing:1,
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
    buttonContainer:{
        position: 'absolute',
        bottom: '10%',
    },
    button:{
        bottom: 50,
        borderRadius: 100,
        width: 75,
        height: 75,
        backgroundColor: "#e84c5c",
        justifyContent: 'center', alignItems:'center',
        zIndex: 1,
        marginHorizontal: 50,
    },
    buttonText: {
        color: 'white', 
        textAlign:'center',
        fontWeight: '400',
        fontSize: 16,
    },
    mediaPlayerContainer:{
        // space out equally the button
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 100,
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
        width: '100%',
        position: 'absolute',
    },

})