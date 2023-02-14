import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

export default function Button({background, text, textColor, onPress}) {
    const [isPressed, setIsPressed] = useState(false)

    const handlePressOut = () => {
        setIsPressed(false) 
        onPress
    }

    const handlePressIn = () => {
        setIsPressed(true)
    }

    return (
        <Pressable onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.container, {  transform: [{scale: isPressed ? 0.97 : 1}],
            backgroundColor: background ? 'white' : null}]}>
            <Text style={[styles.title, { color: textColor}]}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 7,
        borderRadius: 100,
        paddingHorizontal:40,
        borderWidth: 1.5,
        borderColor: 'white',
        margin: 20,
    },
    title:{
        fontSize: 17,
        textAlign: 'center',
    }
})
