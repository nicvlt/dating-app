import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Video } from 'expo-av'
import { storage } from '../scripts/firebase'
import { getDownloadURL, ref } from 'firebase/storage'
import { IonIcons } from '@expo/vector-icons'

export default function InfiniteScroll(){
    const [matchEmail, setMatchEmail] = useState(['test@test.fr'])
    const [uri, setUri] = useState(null)

    React.useEffect(() => {
        getDownloadURL(ref(storage, `videos/${matchEmail[0]}.mp4`))
        .then(url => {
            setUri(url)
        })
    },[])

    return(
        <View style={styles.container}>
            <Video
                source={{
                    uri: uri
                }}
                style={{ width: "100%", height: "100%", justifyContent: 'center', alignItems: 'center'}}
                resizeMode="cover"
                isLooping
                shouldPlay
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f2f2',
        justifyContent: 'center',
        width: '100%',
    },
})