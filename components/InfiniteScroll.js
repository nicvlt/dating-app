import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Video } from 'expo-av'

export default function InfiniteScroll({ uri }){
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