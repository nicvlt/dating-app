import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

export default function Button({background, text, textColor, onPress}) {
    const [isPressed, setIsPressed] = useState(false)

    const handlePressOut = () => {
        setIsPressed(false)
    }

    const handlePressIn = () => {
        setIsPressed(true)
    }

    return (
        <Pressable onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        style={[styles.container, {  transform: [{scale: isPressed ? 0.97 : 1}],
            backgroundColor: background ? '#e84c5c' : null}]}>
            <Text style={[styles.title, { color: background ? 'white' : '#e84c5c'}]}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 7,
        borderRadius: 12,
        paddingHorizontal:40,
        paddingVertical:10,
        borderWidth: 2,
        borderColor: '#e84c5c',
        margin: 20,

    },
    title:{
        fontSize: 17,
        textAlign: 'center',
        fontWeight: 'bold',
    }
})
