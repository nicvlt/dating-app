import React from 'react'
import { Text, View, Dimensions, StyleSheet } from 'react-native'

const screenSize = Dimensions.get('screen').height
const color = Math.floor(Math.random() * 16777215).toString(16);


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
        backgroundColor: `#${color}`,
    },
})