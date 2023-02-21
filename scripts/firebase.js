// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getStorage, ref } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyCC17-CMT9603coyt8faUNlUIFSW4KdHAk",
  authDomain: "projettransverse-96abb.firebaseapp.com",
  databaseURL: "https://projettransverse-96abb-default-rtdb.firebaseio.com",
  projectId: "projettransverse-96abb",
  storageBucket: "projettransverse-96abb.appspot.com",
  messagingSenderId: "959616068967",
  appId: "1:959616068967:web:0270a7bd93ba3ff74b53c2",
  measurementId: "G-7871WLHBWP"
};
 /*     apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  storageBucket: process.env.storageBucket*/

const app = initializeApp(firebaseConfig)
// Initialize Firebase
if (!firebase.apps.length){
    const app = initializeApp(firebaseConfig)
}
else {
    const app = firebase.app();
}
const auth = getAuth(app)
const storage = getStorage(app)
const storageRef = ref(storage)

export { auth, storageRef, firebase };