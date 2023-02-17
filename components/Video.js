import React from 'react'
import { Text, View, Dimensions, StyleSheet } from 'react-native'

const screenSize = Dimensions.get('screen').height

export default function Video({item}){
    return(
        <View style={styles.container}>
            <Text>{item.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height:screenSize,
        justifyContent: 'center',
        alignItems: 'center',
    },
})