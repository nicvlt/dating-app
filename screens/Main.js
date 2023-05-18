import React, { useState } from 'react'
import InfiniteScroll from '../components/InfiniteScroll'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { storage } from '../scripts/firebase'
import { getDownloadURL, ref } from 'firebase/storage'

export default function Main({navigation}){
    const [matchEmail, setMatchEmail] = useState(['test@test.fr'])
    const [uri, setUri] = useState(null)

    React.useEffect(() => {
        getDownloadURL(ref(storage, `videos/${matchEmail[0]}.mp4`))
        .then(url => {
            setUri(url)
        })
    },[])

    const handleNotMatch = () => {
        // TODO: Remove match from database or ignore
    }

    const handleMatch = () => {
        // TODO: Add match to database or add uid to existing match
    }

    return(
        <>
            <InfiniteScroll uri={uri}/>
            <LinearGradient
                colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
                end={{ x: 0.5, y: 0.8 }}
                style={styles.gradientFade}>
                    <View style={{width: "80%", flexDirection: 'row', justifyContent: 'space-between'}}>
                        <TouchableOpacity style={styles.closeButton} onPress={handleNotMatch}>
                            <Ionicons name="close-outline" size={40} color="#e84c5c"/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.nextButton} onPress={handleMatch}>
                            <Ionicons name="arrow-forward-outline" size={40} color="white"/>
                        </TouchableOpacity>
                    </View>
            </LinearGradient>
            
            
        </>
    )
}

const styles = StyleSheet.create({
    gradientFade: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 200,
        alignItems: 'center',
        zIndex: 1,
        
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
    }
})