import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCC17-CMT9603coyt8faUNlUIFSW4KdHAk",
    authDomain: "projettransverse-96abb.firebaseapp.com",
    databaseURL: "https://projettransverse-96abb-default-rtdb.firebaseio.com",
    projectId: "projettransverse-96abb",
    storageBucket: "projettransverse-96abb.appspot.com",
    messagingSenderId: "959616068967",
    appId: "1:959616068967:web:0270a7bd93ba3ff74b53c2",
    measurementId: "G-7871WLHBWP"
}
if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}



export {firebase}

