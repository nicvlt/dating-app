import React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';

export default function Textinput({placeholder}) {
  const [isFocused, setIsFocused] = React.useState(false)
  const [hasContent, setHasContent] = React.useState(false)

  const handleOnFocus = () => {
    setIsFocused(true)
  }

  const handleOnBlur = () => {
    setIsFocused(false)
  }

  const handleHasContent = (e) => {
    if(e=="") setHasContent(false)
    else setHasContent(true)
  }

  return (
    <View style={styles.container}>
      <TextInput  onFocus={handleOnFocus} onBlur={handleOnBlur} onChangeText={handleHasContent} numberOfLines={1} 
      style={[styles.textinput, { backgroundColor: isFocused ? '#fefefe' : 'white'}]}/>
      <Text accessible={true} style={[styles.placeholder, {top: (isFocused || hasContent) ? 8:null}]}> {placeholder} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width:'70%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop:10,
  },
  textinput:{
    height:68,
    width:'100%',
    borderRadius:15,
    color:'black',
    paddingTop:18,
    paddingBottom:4,
    paddingHorizontal:20,
    pointerEvents: 'auto',
    fontSize: 17,
    fontWeight: '500',
  },
  placeholder:{
    color:'#777777',
    position:'absolute',
    left: 16,
    fontSize: 14,
    fontWeight: '500',
    userSelect: 'none',
    pointerEvents: 'none',
  }
});