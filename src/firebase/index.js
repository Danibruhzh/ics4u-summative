import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Paste your firebaseConfig from Firebase Console here
const firebaseConfig = {
    apiKey: "AIzaSyBTMj3TzvuFPWa61NBqmkAZEIMMxdlgarI",
    authDomain: "summative-d545d.firebaseapp.com",
    projectId: "summative-d545d",
    storageBucket: "summative-d545d.firebasestorage.app",
    messagingSenderId: "455955456486",
    appId: "1:455955456486:web:554899447c0cb1fc1bf627"
};

const config = initializeApp(firebaseConfig)
const auth = getAuth(config);
const firestore = getFirestore(config);

export { auth, firestore };