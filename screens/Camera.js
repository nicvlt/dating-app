import React, {useEffect, useRef, useState} from 'react';
import { StyleSheet, View, Text, FlatList, SafeAreaView, Dimensions, Linking, Pressable } from 'react-native'
import { Camera } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import MultiTap from '../components/MultiTap';

export default function MyCamera() {

    const isFocused = useIsFocused();

    const [hasPermission, setHasPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const cameraRef = useRef(null);
    const [video, setVideo] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [pressRecord, setPressRecord] = useState(false);



    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            const audioStatus = await Camera.requestMicrophonePermissionsAsync();
            setHasPermission(cameraStatus.status === 'granted');
            setHasPermission(audioStatus.status === 'granted');
        })();
    }, []);

    const takeVideo = async () => {
        if (camera) {
            const video = await cameraRef.recordAsync(null);
            setVideo(video.uri);
        }
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.cameraContainer}>
        <MultiTap onPress={() => console.log("MultiTap !")}>
            {isFocused && 
            <Camera
                ref={cameraRef => setCamera(cameraRef)}
                style={styles.fixedRatio}
                type={type}
                ratio={'4:3'}
            />}
        </MultiTap>
        <Pressable style={[ styles.record, { borderWidth: pressRecord ? 8 : 4, borderColor: pressRecord ? '#e84c5c' : 'white',},
                    ]} 
                    onPressIn={() => {
                        setPressRecord(true)
                        takeVideo()
                    }}
                    onPressOut={() => {
                        setPressRecord(false)
                        cameraRef.current.stopRecording()
                    }}>
            </Pressable>
    </View>
    );
}

const styles = StyleSheet.create({
    fixedRatio: {
        flex: 1,
        aspectRatio: 1
    },
    record: {
        position: 'absolute',
        bottom: 50,
        width: 100,
        height: 100,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 5,
        borderColor: 'white',
    },
    cameraContainer: { 
        backgroundColor: 'black',
        flexDirection: 'row',
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' },
});