import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import Button from '../components/Button'
import * as ImagePicker from 'expo-image-picker'
import { Video } from 'expo-av'
import { storage, auth } from '../scripts/firebase'
import { uploadBytes, ref } from 'firebase/storage'

export default function UploadVideo({ navigation }){
    const [video, setVideo] = useState(null)
    const videoRef = React.useRef(null)
    const toUploadRef = ref(storage, `videos/${auth.currentUser.email}.mp4`)

    const handleVideoPicker = async () => {
        // Ask the user for the permission to access the library
        // Then launch the library to choose ONLY a video using mediaTypes ImagePickerOption
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (permissionResult.granted === false) {
            alert("You've refused to allow this app to access your library!")
            return
        }
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        })
        if (pickerResult.hasOwnProperty('uri')) {
            setVideo(() => pickerResult.assets[0].uri)
            console.log(pickerResult.assets[0].uri)
        }
    }

    const handleSubmit = () => {
        console.log("Uploading video...")
        fetch(video)
        .then(res => res.blob())
        .then(blob => uploadBytes(toUploadRef, blob))
        navigation.navigate('Main')
    }

    const handleCancel = () => {
        setVideo(null)
    }  
    

    return(
        <View style={[styles.container, { backgroundColor: video ? "#000000" : "#f3f3f3" }]}>
            
            {video == null ? (
                <>
                    <Text>Upload a video</Text>
                    <View style={styles.buttonContainer}>
                        <Button text="Upload Video" background={true}
                        onPress={handleVideoPicker}/>
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
                            <Text style={{color: 'white', textAlign:'center'}}>cancel</Text>
                        </Pressable>
                        <Pressable style={styles.button} onPress={handleSubmit}>
                            {/* To remove for an icon */}
                            <Text style={{color: 'white', textAlign:'center'}}>submit</Text>
                        </Pressable>
                        
                    </View>
                </>
            }
        </View>
    )
} 

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer:{
        position: 'absolute',
        bottom: 0,
    },
    button:{
        bottom: 50,
        borderRadius: 100,
        width: 75,
        height: 75,
        backgroundColor: "rgba(50, 50, 50, 0.7)",
        justifyContent: 'center', alignItems:'center',
        zIndex: 1,
        marginHorizontal: 50
    },
    mediaPlayerContainer:{
        // space out equally the button
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 100,

    }

})