import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useIsFocused, useFocusEffect } from "@react-navigation/native"; 
import { doc, getDocs, getDoc, collection, query, where } from "firebase/firestore";
import { getDownloadURL } from 'firebase/storage';
import { auth, db, ref, storage } from '../scripts/firebase';
import { useRoute } from '@react-navigation/native';

export default function ChatRoom() {
  const route = useRoute();
  const email = route.params.email;
  const name = route.params.name;
  const picture = route.params.picture;

  return (
    <View style={styles.container}>
        <Image source={{ uri: picture }} style={{ width: 150, height: 150, borderRadius: 100 }} />
      <Text style={styles.title}>Chat Room with {name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});