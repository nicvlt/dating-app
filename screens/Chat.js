import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
import { useIsFocused, useFocusEffect } from "@react-navigation/native"; 
import { doc, getDocs, getDoc, collection, query } from "firebase/firestore";
import {getDownloadURL} from 'firebase/storage'
import { auth, db, ref, storage } from '../scripts/firebase'

export default function Chat() {

    const isFocused = useIsFocused();

    const [chats, setChats] = useState([]);
    const [userMatch, setUserMatch] = useState([]);
    const [animating, setAnimating] = useState(true);

    const filterUniqueUsers = (arr) => {
        const uniqueIds = new Set();
        const filteredArr = [];
        arr.forEach((user) => {
          if (!uniqueIds.has(user.id)) {
            uniqueIds.add(user.id);
            filteredArr.push(user);
          }
        });
        return filteredArr;
      };

    useEffect(() => {
        const userEmail = auth.currentUser.email;
        const matchRef = collection(db, 'match');
      
        const usersMatchQuery = query(matchRef);
        getDocs(usersMatchQuery).then((querySnapshot) => {
          const newChatsPromises = [];
      
          querySnapshot.forEach((docSnap1) => {
            if (docSnap1.data().id1 == userEmail && docSnap1.data().accept == true) {
              newChatsPromises.push(
                getDoc(doc(db, "users", docSnap1.data().id2)).then((docSnap2) => {
                  if (docSnap2.exists()) {
                    return getDownloadURL(ref(storage, 'profile_pictures/' + docSnap2.data().email)).then((url) => {
                      const chatObj = {
                        id: docSnap1.data().id2,
                        name: docSnap2.data().name,
                        profilePicture: url,
                      };
                      return chatObj;
                    });
                  }
                })
              );
            }
      
            if (docSnap1.data().id2 == userEmail && docSnap1.data().accept == true) {
              newChatsPromises.push(
                getDoc(doc(db, "users", docSnap1.data().id1)).then((docSnap2) => {
                  if (docSnap2.exists()) {
                    return getDownloadURL(ref(storage, 'profile_pictures/' + docSnap2.data().email)).then((url) => {
                      const chatObj = {
                        id: docSnap1.data().id1,
                        name: docSnap2.data().name,
                        profilePicture: url,
                      };
                      return chatObj;
                    });
                  }
                })
              );
            }
          });
      
          Promise.all(newChatsPromises).then((newChats) => {
            setChats((prevChats) => [...prevChats, ...newChats.filter(Boolean)]);
            setAnimating(false);
            setUserMatch((prevUserMatch) => [...prevUserMatch, ...newChats.filter(Boolean)]);
            setUserMatch(prevUserMatch => filterUniqueUsers(prevUserMatch));
          });
        });
      }, [isFocused]);

      // empty array when unfocused
        useFocusEffect(
            React.useCallback(() => {
                return () => {
                    setChats([]);
                    setUserMatch([]);
                    console.log("unfocused");
                };
            }, [])
        );



    const renderItem = ({ item }) => (
        <View style={styles.chatItem}>
            <Image style={styles.profilePicture} source={{ uri: item.profilePicture }} />
            <Text style={styles.userName}>{item.name}</Text>
        </View>
    );

    console.log(userMatch.length);

    return (
      <View style={styles.container}>

        {animating === true ? (        
                <ActivityIndicator
                animating = {animating}
                color = '#e84c5c'
                size = {50}
                style = {styles.activityIndicator}/>
                
                ) : (
                    <View>
                        <FlatList
                            data={userMatch}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    </View>
                )}

      </View>
    );
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        height: '100%',
    },
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 10,
    },
    userName: {
        fontSize: 18,
    }


});