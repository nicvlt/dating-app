import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Image, 
    ActivityIndicator, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import { storagePP, ref, auth, db, storageVP, storage } from '../scripts/firebase'
import { getDownloadURL, uploadBytes, deleteObject} from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";
import {LinearGradient} from 'expo-linear-gradient';
import Toast from 'react-native-toast-message';
import { Video } from 'expo-av';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from "@react-navigation/native"; 


export default function Account() {

    const navigation = useNavigation();

    if (typeof atob === 'undefined') {
        global.atob = decode;
    }

    const [image, setImage] = useState('')
    const [animating, setAnimating] = useState(true)
    const [error, setError] = useState('')
    const [name, setName] = useState('')
    const [age, setAge] = useState()
    const [gender, setGender] = useState('')
    const [type, setType] = useState('')
    const [interest, setInterest] = useState([])
    const videoRef = React.useRef(null)
    const [videoURL, setVideoURL] = useState(null)
    const [touchScreen, setTouchScreen] = useState(true)
    const [imageUri, setImageUri] = useState('')
    const toUploadRef = ref(storage, `videos/${auth.currentUser.email}.mp4`)
    const [orientation, setOrientation] = useState('')
    const [changeInterest, setChangeInterest] = useState(false)

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

    ////////        INITIALIZATION        ////////

    useFocusEffect(
        React.useCallback(() => {
        videoRef.current?.playAsync();
          return () => {
            // Restart and stop video when leaving screen
            videoRef.current?.replayAsync();
            videoRef.current?.stopAsync();
          };
        }, [])
     );

    const isFocused = useIsFocused();

    useEffect(() => {
        getDoc(doc(db, "users", auth.currentUser.email)).then(docSnap => {
            // If user exists, get data from firestore
            if (docSnap.exists()) {
                auth.currentUser.date = docSnap.data().date
                auth.currentUser.name = docSnap.data().name
                auth.currentUser.age = docSnap.data().age
                auth.currentUser.gender = docSnap.data().gender
                auth.currentUser.interest = docSnap.data().interest
                auth.currentUser.orientation = docSnap.data().orientation
                setChangeInterest(!changeInterest)
            } 
            else {
                setError("No user profile!")
                handleShowToastError()
            }
        })
    }, [isFocused])

    useEffect(() => {
        /// Get profile picture from firebase storage with any type of image
        const imageRef = ref(storagePP, auth.currentUser.email)
        getDownloadURL(imageRef)
        .then((url) => {
            setImage(url)
            setName(auth.currentUser.name)
            setAge(auth.currentUser.age)
            setGender(auth.currentUser.gender)
            setInterest(auth.currentUser.interest)
            setOrientation(auth.currentUser.orientation)
            setAnimating(false)
        })
        .catch((e) => {
            setImage(process.env.REACT_APP_default_profile_picture)
            setName(auth.currentUser.name)
            setAge(auth.currentUser.age)
            setGender(auth.currentUser.gender)
            setInterest(auth.currentUser.interest)
            setOrientation(auth.currentUser.orientation)
            setAnimating(false)
        })
    }, [image, interest, changeInterest])

    ////////        HANDLE TOUCH SCREEN        ////////

    const handleScreenTouch = () => {
        if (touchScreen === false) {
            setTouchScreen(true)
        }
        else {
            setTouchScreen(false)
        }
    }

    ////////        HANDLE VIDEO        ////////

    useEffect(() => {
        /// Get video from firebase storage
        const videoRef = ref(storageVP, auth.currentUser.email +'.mp4')
        getDownloadURL(videoRef)
        .then((url) => {
            setVideoURL(url)
        })
        .catch((e) => {
            /// If no video, set default video
            setVideoURL("https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4")
        })
    }, [])

    const handleChangeVideo = async () => {
        const permissionResult =
            ImagePicker.requestMediaLibraryPermissionsAsync()
        if (permissionResult.granted === false) {
            alert("You've refused to allow this app to access your library!")
            return
        }
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
        });
        if (pickerResult.hasOwnProperty('uri')) {
            setVideoURL(pickerResult.uri)
            const videoBytes = await fetch(pickerResult.uri)
            const videoBlob = await videoBytes.blob()
            await uploadBytes(toUploadRef, videoBlob)
        }
    }

    ////////        HANDLE IMAGE        ////////

    const reverseString = (str) => {
        return str === '' ? '' : reverseString(str.substr(1)) + str.charAt(0)
    }

    const handleChangeImage = async () => {
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
                quality: 0.1,
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                base64: true
            }
        )

        if (pickerResult.hasOwnProperty('uri')) {
            const imageRef = ref(storagePP, auth.currentUser.email)
            try {
                await deleteObject(imageRef)
            }
            catch (e) {
                console.log(e)
            }
            const imgBytes = await fetch(pickerResult.uri)
            const imgBlob = await imgBytes.blob()
            await uploadBytes(imageRef, imgBlob);
            getDownloadURL(imageRef)
            .then((url) => {
                setImage(url)
            })
        }
    }

    ////////        HANDLE INTEREST        ////////

    const handleInterest = () => {
        navigation.navigate('EditInterest')
        setChangeInterest(!interest)
    }

    return (
        <TouchableWithoutFeedback style={styles.screen} onPress={() => handleScreenTouch()}>
            <View style={styles.container}>
                {animating === true ? (        
                <ActivityIndicator
                animating = {animating}
                color = '#e84c5c'
                size = {50}/>
                
                ) : (
                <>
                <Video
                    ref={videoRef}
                    source={{ uri: videoURL }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="contain"
                    isLooping
                    shouldPlay
                />
                {touchScreen === true && videoURL !== null ? (
                    <>
                    <TouchableOpacity style={styles.videoButton} onPress={handleChangeVideo}>
                        <Ionicons name="videocam-outline" size={40} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.photoButton} onPress={handleChangeImage}>
                        <Ionicons name="camera-outline" size={40} color="white" />
                    </TouchableOpacity>
                    <LinearGradient
                        colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
                        end={{ x: 0, y: 0.6 }}
                        style={styles.profileContainer}> 
                        <View style={styles.profileContainerText}>
                            <View style={styles.imageNameAge}>
                                <Image source={ type !== null ? {uri : image} : {uri: `data:image/${type};base64,${image}`} } 
                                style={styles.image}/>
                                <Text style={styles.textNameAge} adjustsFontSizeToFit={true} numberOfLines={2}>{name}, {age}</Text>
                            </View>
                            <TouchableOpacity style={{height: '100%'}} onPress={
                                handleInterest}>
                            <View style={styles.interestView}>
                                {interest?.map((item) => {
                                    return (
                                    <View style={styles.interest} >
                                        <Text style={styles.interestText}>{item}</Text>
                                    </View>
                                    );
                                })}
                            </View>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                    </>
                ) : ( <></> )}
                
                </>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        width: '100%',
        backgroundColor: 'transparent',
    },
    photoButton: {
        position: 'absolute',
        right: 20,
        zIndex: 1,
        backgroundColor: 'grey',
        width: 60,
        height: 60,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        top: 100,
    },
    videoButton: {
        position: 'absolute',
        right: 20,
        zIndex: 1,
        backgroundColor: 'grey',
        width: 60,
        height: 60,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        top: 20,
    },
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#000',
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
    },
    imageNameAge: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 35,
        marginBottom: 35,
        marginTop: 35,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 200,
        marginRight: 20,
    },
    interestView: {
        marginLeft: 35,
        flex: 1,
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "flex-start",
        height: '100%',
    },
    interest: {
        width: 100,
        margin: 5,
        padding: 5,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e84c5c",
    },
    interestText: { 
        color: "#fff", 
        flexShrink: 1, 
        flexWrap: "wrap",
        fontSize: 12,
    },
    textNameAge: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000',
        width: '65%',
    },
    profileContainer: {
        flexDirection: 'column',
        height: '35%',
        width: '100%',
        bottom: 0,
        position: 'absolute',
    },
    profileContainerText: {
        flexDirection: 'column',
        height: '100%',
    }
})
