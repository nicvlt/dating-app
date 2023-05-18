import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { storagePP, ref, auth, db } from '../scripts/firebase'
import { getDownloadURL} from "firebase/storage";
import { doc, getDoc, query, where, collection, getDocs } from "firebase/firestore";

export default function Settings() {

    const [image, setImage] = useState('')
    const [url, setUrl] = useState('')

    const userRef = collection(db, "users");
    const user_query = query(userRef, where("email", "==", auth.currentUser.email));
    const [type, setType] = useState('')
    
    const userSnapshot =  getDocs(user_query).then(
        (userQuerySnapshot) => {
            userQuerySnapshot.forEach(async (doc) => {
                setType(doc.data().type)
            });
        }
    );

    useEffect(() => {
        console.log(url)
        console.log(auth.currentUser.uid +'.'+ type)
        /// Get profile picture from firebase storage with any type of image
        const imageRef = ref(storagePP, auth.currentUser.uid +'.'+ type)
        getDownloadURL(imageRef)
        .then((url) => {
            setImage(url)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings</Text>
        </View>
    );
}

const styles = StyleSheet.create({

})
