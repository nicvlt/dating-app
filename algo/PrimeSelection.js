
import React, { useState } from 'react';
import { auth, storageRef } from '..firebase.js'



const retrieveNonSmokers = () => {
  const usersRef = firebase.database().ref('users');
  
  usersRef.orderByChild('smoker').equalTo(false).on('value', (snapshot) => {
    const nonSmokers = snapshot.val();
    
    // Handle the retrieved non-smokers data here
    console.log(nonSmokers);
  });
};

const retrieveSmokers = () => {
  const usersRef = firebase.firestore().collection('users');

  usersRef.where('smoker', '==', true).get()
    .then((querySnapshot) => {
      const smokerUsers = [];
      querySnapshot.forEach((doc) => {
        const smokerUser = doc.data();
        smokerUsers.push(smokerUser);
      });

      // Handle the retrieved smoker users data here
      console.log(smokerUsers);
    })
    .catch((error) => {
      // Handle any error that occurred during the retrieval
      console.error('Error retrieving smoker users:', error);
    });
};

const test_array = [1, 2, 0, 1, 3];

// Check the array of prime criteria
if (test_array[2] === 1) {
    // Call the function to retrieve smokers
    retrieveSmokers();
} else {
    // Call the function to retrieve non-smokers
    retrieveNonSmokers();
}
