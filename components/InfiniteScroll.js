import React from 'react'
import { StyleSheet, FlatList, SafeAreaView, Dimensions} from 'react-native'
import Video from '../components/Video'

export default function InfiniteScroll(){

    const screenSize = Dimensions.get('screen').height

    const data = [
        {id: '1', text: 'Video 1'},
        {id: '2', text: 'Video 2'},
        {id: '3', text: 'Video 3'},
    ]

    return(
        <SafeAreaView style={styles.container}>
            <FlatList
            contentContainerStyle={styles.list}
            data={data}
            renderItem={Video}
            keyExtractor={item => item.id}
            snapToInterval={screenSize}
            decelerationRate='fast'
            showsVerticalScrollIndicator={false}
        />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    list: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})