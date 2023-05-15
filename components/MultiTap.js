import React, {useEffect, useRef, useState} from 'react';
import { StyleSheet, View, Text, FlatList, SafeAreaView, Dimensions, Linking, Pressable } from 'react-native'

export default class MultiTap extends React.Component {
    
    static defaultProps = {
        onPress : () => null,
    }
    
    onStartShouldSetResponder = (evt) => {
        if (evt.nativeEvent.touches.length === 2) {
            return true;
        }
        return false;
    }

    onResponderRelease = (evt) => {
        this.props.onPress();
    }

    render () {
        return (
            <View 
                onStartShouldSetResponder={this.onStartShouldSetResponder}
                onResponderRelease={this.onResponderRelease}>
                {this.props.children}
            </View>
        )
    }
}