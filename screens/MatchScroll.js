import React, { useState, useEffect } from 'react'
import InfiniteScroll from '../components/InfiniteScroll'
import { View, TouchableOpacity, StyleSheet, Image, Text, ActivityIndicator } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { doc, getDocs, getDoc, collection, query, where, updateDoc, setDoc, deleteDoc } from "firebase/firestore";
import {getDownloadURL} from 'firebase/storage'
import { auth, db, ref, storage } from '../scripts/firebase'
import { useIsFocused, useFocusEffect } from "@react-navigation/native"; 
import Toast from 'react-native-toast-message';

export default function MatchScroll({navigation}){
    const [matchEmail, setMatchEmail] = useState([])
    const [videoUri, setVideoUri] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [age, setAge] = useState(0);
    const [name, setName] = useState('')
    const [usersName, setUsersName] = useState([])
    const [usersAge, setUsersAge] = useState([])
    const [error, setError] = useState('')
    const [gender, setGender] = useState('')
    const [interest, setInterest] = useState('')
    const [userOrientation, setUserOrientation] = useState('')
    const [changeInfo, setChangeInfo] = useState(false);
    const [userTarget, setUserTarget] = useState(['']);

    // We retrieve the data of the current user 

    useEffect(() => {
        /// Set the user's information 
        setName(auth.currentUser.name)
        setAge(auth.currentUser.age)
        setGender(auth.currentUser.gender)
        setInterest(auth.currentUser.interest)
        setUserOrientation(auth.currentUser.orientation)
    }, [changeInfo]);

    const MatchEvent = () => {
        Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Error',
            text2: 'You matched with ' + usersName[0] + ' !',
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 10,
        })
    }

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
                if (docSnap.data().orientation == 'Men'){
                    setUserTarget(['Male'])
                }
                else if (docSnap.data().orientation == 'Women'){
                    setUserTarget(['Female'])
                }
                else if (docSnap.data().orientation == 'Everyone'){
                    setUserTarget(['Male', 'Female'])
                }
                setChangeInfo(!changeInfo)
            } 
            else {
                setError("No user profile!")
                handleShowToastError()
            }
        })
    }, [])

    // We import all the other user which respect the criteria in the array
    // Retrieve data and filter based on the criteria

    useEffect(() => {
        const usersRef = collection(db, 'users');
        if (userTarget != [] && userTarget != null && auth.currentUser.email != null){
            const usersQuery = query(usersRef, where('gender', 'in', userTarget))
            getDocs(usersQuery).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.id != auth.currentUser.email){
                        setMatchEmail(matchEmail => [...matchEmail, doc.id])
                        setUsersName(usersName => [...usersName, doc.data().name])
                        setUsersAge(usersAge => [...usersAge, doc.data().age])
                    }
                })
            });
        }
    }, [userTarget])

    // Retrieve data from usersQuery and store email in matchEmail

    useFocusEffect(() => {
        if (matchEmail.length > 0){
            getDownloadURL(ref(storage, `videos/${matchEmail[0]}.mp4`))
            .then(url => {
                setVideoUri(url)
            })
            getDownloadURL(ref(storage, `profile_pictures/${matchEmail[0]}`))
            .then(url => {
                setImageUri(url)
            })
            .catch((error) => {
                setImageUri(process.env.REACT_APP_default_profile_picture)
            })
        }
        else{
            setImageUri(process.env.REACT_APP_default_profile_picture)
        }
    })

    const handleNotMatch = () => {
        // TODO: Remove match from database or ignore
        setVideoUri(null)

        // Check if the match is in the database
        const idMatch = matchEmail[0] + '-'+ auth.currentUser.email;

        // Check if the match is in the database
        getDoc(doc(db, "match", idMatch)).then(async docSnap => {
            // If user exists, get data from firestore
            if (docSnap.exists()) {
                deleteDoc(doc(db, "match", idMatch));
            }
        })

        // Remove the first element of the array
        setMatchEmail(matchEmail => matchEmail.slice(1))
        setUsersName(usersName => usersName.slice(1))
        setUsersAge(usersAge => usersAge.slice(1))
    }

    const handleMatch = () => {
        // TODO: Add match to database or add uid to existing match
        const idMatch = auth.currentUser.email + '-'+ matchEmail[0];
        const idMatch2 = matchEmail[0] + '-' + auth.currentUser.email;

        // Check if the match is in the database
        getDoc(doc(db, "match", idMatch2)).then(async docSnap => {
            // If user exists, get data from firestore
            if (docSnap.exists()) {
                updateDoc(doc(db, "match", idMatch2), {
                    accept: true,
                });
                MatchEvent()
            }
            else {
                await setDoc(doc(db, "match", idMatch), {
                    id1: auth.currentUser.email,
                    id2: matchEmail[0],
                    accept: false,
                });
            }
        })



        // Remove the first element of the array
        setMatchEmail(matchEmail => matchEmail.slice(1))
        setUsersName(usersName => usersName.slice(1))
        setUsersAge(usersAge => usersAge.slice(1))
    }

    return(
        <>  
        {matchEmail.length == 0 ? (
            <ActivityIndicator size="large" color="#e84c5c" style={styles.loading}/>
        ) : (
            <>
            <InfiniteScroll uri={videoUri}/>
            <LinearGradient
                colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
                end={{ x: 0, y: 0.6 }}
                style={styles.gradientFade}>
                    <View style={styles.container}>
                        <View style={styles.imageNameAge}>
                            <Image source={ {uri: imageUri} } 
                            style={styles.image}/>
                            <Text style={styles.textNameAge} adjustsFontSizeToFit={true} numberOfLines={2}>{usersName[0]}, {usersAge[0]}</Text>
                        </View>
                        <View style={styles.buttons}>
                            <TouchableOpacity style={styles.closeButton} onPress={handleNotMatch}>
                                <Ionicons name="close-outline" size={40} color="#e84c5c"/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.nextButton} onPress={handleMatch}>
                                <Ionicons name="arrow-forward-outline" size={40} color="white"/>
                            </TouchableOpacity>
                        </View>
                    </View>
            </LinearGradient>
            <Toast/>
            </>
        ) }
        </>
    )
}

const styles = StyleSheet.create({
    gradientFade: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',
        zIndex: 1,
        height: '35%',
        flexDirection: 'column',
    },
    container: { 
        flexDirection: 'column',
        height: '100%',
        width: '100%',
    },
    nextButton: {
        backgroundColor: '#e84c5c',
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        backgroundColor: 'white',
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e84c5c',
    },
    imageNameAge: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 35,
        marginTop: 35,
        width: '100%',
        marginLeft: 35,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 200,
        marginRight: 20,
    },
    textNameAge: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000',
        width: '65%',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 50,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
    
})