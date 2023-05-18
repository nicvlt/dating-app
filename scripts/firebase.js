// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getStorage, ref } from "firebase/storage"
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:             process.env.REACT_APP_apiKey,
  authDomain:         process.env.REACT_APP_authDomain,
  projectId:          process.env.REACT_APP_projectId,
  storageBucket:      process.env.REACT_APP_storageBucket,
  messagingSenderId:  process.env.REACT_APP_messagingSenderId,
  appId:              process.env.REACT_APP_appId,
  storageBucket:      process.env.REACT_APP_storageBucket
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const storage = getStorage(app)
const storageRef = ref(storage)
const storagePP = ref(storage, 'profile_pictures')
const storageVP = ref(storage, 'videos')
const db = getFirestore(app);

export { auth, storageRef, db, storage, storagePP, storageVP, ref }