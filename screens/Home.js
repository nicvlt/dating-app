import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import Button from '../components/Button'

export default function Home({ navigation }) {

    return(
        <View style={styles.container}>
            <ImageBackground style={styles.image} 
            source={require('../assets/affectionate-couple.jpg')}>
                <View style={styles.darken}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            Lorem Ipsum
                        </Text>
                        <Text style={styles.subtitle}>
                            Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit
                        </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button text="Log In" background={false} textColor={'white'}/>
                        <Button text="Sign Up" background={true} textColor={'black'}/>
                    </View>
                </View>
            </ImageBackground>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    image:{
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
    },
    darken:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer:{
        marginTop:'25%',
        width: '90%',
        alignItems: 'center',
    },
    title:{
        width: '85%',
        fontSize: 39,
        fontWeight: 'bold',
        color: 'white',
        marginBottom:12,
    },
    subtitle:{
        width: '85%',
        fontSize: 17,
        color: 'white',
        fontWeight:'400',
        textAlign:'justify',
    },
    buttonContainer:{
        position: 'absolute',
        bottom: 50,
        flexDirection: 'row',
    }
})