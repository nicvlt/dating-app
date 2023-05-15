import React, { useState } from 'react'
import { StyleSheet, FlatList, SafeAreaView, Dimensions, StatusBar} from 'react-native'
import Video from '../components/Video'

export default function InfiniteScroll(){

    const screenSize = Dimensions.get('screen').height - StatusBar.currentHeight
    const [data, setData] = useState([{id: '1', text: 'Video 1'}, {id: '2', text: 'Video 2'}])
    const [counter, setCounter] = useState(3)

    const handleEndReached = () => {
        setCounter(counter + 1)
        const newData = [...data, {id: `${counter}`, text: `Video ${counter}`}]
        setData(newData)
    }

    const handleRefresh = () => {
        setData([{id: '1', text: 'Video 1'}, {id: '2', text: 'Video 2'}])
        setCounter(3)
    }

    return(
        <SafeAreaView style={styles.container}>
            <FlatList
            disableIntervalMomentum
            contentContainerStyle={styles.list}
            data={data}
            renderItem={Video}
            keyExtractor={item => item.id}
            snapToInterval={screenSize}
            showsVerticalScrollIndicator={false}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.5}
            refreshing={false}
            onRefresh={handleRefresh}
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