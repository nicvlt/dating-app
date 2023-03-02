import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, Pressable} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { manipulateAsync } from 'expo-image-manipulator'
import Icon from 'react-native-vector-icons/AntDesign'


import Button from '../components/Button'
import Textinput from '../components/Textinput'


export default function NamePicture({ navigation }) {
    const [image, setImage] = useState(null)
    const [name, setName] = useState('')
    const [pressedImage, setPressedImage] = useState(false)
    const [type, setType] = useState('')

    const reverseString = (str) => {
        return str === '' ? '' : reverseString(str.substr(1)) + str.charAt(0)
    }
    
    const findTypeImage = (str) => {
        str = reverseString(str)
        let type = str.split('.')
        type = reverseString(type[0])
        return type
    }
    

    const handlePickImage = async () => {
        // Ask the user for the permission to access the camera
        const permissionResult =
          await ImagePicker.requestMediaLibraryPermissionsAsync()
    
        if (permissionResult.granted === false) {
          alert("You've refused to allow this app to access your camera!")
          return
        }
    
        //choose image in library
        const pickerResult = await ImagePicker.launchImageLibraryAsync()
        if (pickerResult.hasOwnProperty('uri')) {
          //compress it and renders a base64 version
          const manipulateResult = await manipulateAsync(pickerResult.uri, [], {
            compress: 0.1,
            base64: true,
          })
    
          setImage(manipulateResult.base64)
          setType(findTypeImage(manipulateResult.uri))
        }
      }

    return(
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            style={styles.container}
            softwareKeyboardLayoutMode={'pan'} 
            scrollEnabled={false}
        >
            <View style={styles.titleHead}>
                <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                >
                <Text style={styles.title}>Welcome</Text>
                </View>
                <Text style={styles.subtitle}>Tell us more about you</Text>
            </View>
            <View style={styles.bodyContainer}>
                <Pressable
                style={[
                    styles.imageContainer,
                    {
                    borderWidth: pressedImage ? 1 : 0.5,
                    },
                ]}
                onPressIn={() => {
                    setPressedImage(true)
                }}
                onPressOut={() => {
                    handlePickImage()
                    setPressedImage(false)
                }}
                >
                {image === null ? (
                    <Icon
                    name="user"
                    size={50}
                    style={[
                        { backgroundColor: 'white', borderRadius: 200, padding: 18 },
                    ]}
                    color='rgba(0,0,0,0.7)'
                    />
                ) : (
                    <Image
                    source={{ uri: `data:image/${type};base64,${image}` }}
                    style={styles.image}
                    />
                )}
                <View style={styles.iconAddImage}>
                    <Icon name="plus" color="#e84c5c" />
                </View>
                </Pressable>
                <Textinput
                    placeholder="Name"
                    value={name}
                    setter={setName}
                />
                <View style={{ marginTop: 20 }}>
                    <Button
                        text="Next"
                        background={true}
                    />
                </View>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#f3f2f2',
    },
    titleHead: {
        height: '20%',
        marginTop: '19%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '10%',
        },
    title: {
        fontSize: 35,
        fontWeight: '600',
    },
    subtitle: {
        fontSize: 17,
        fontWeight: '500',
        marginTop: '5%',
    },
    bodyContainer: {
        height: '100%',
        alignItems: 'center',
    },
    imageContainer: {
        height: 90,
        width: 90,
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: 200,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        marginTop:10,
        marginBottom:38,
      },
      image: { borderRadius: 200, padding: 44 },
      iconAddImage: {
        backgroundColor: 'white',
        width: 20,
        height: 20,
        borderRadius: 200,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 2,
        bottom: 0,
        right: 2,
      },
})