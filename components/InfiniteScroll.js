import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Video } from 'expo-av'
import { useFocusEffect } from '@react-navigation/native';

export default function InfiniteScroll({ uri }){

    const videoRef = React.useRef(null);
    
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
    
    return (
        <View style={styles.container}>
            <Video
                ref={videoRef}
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