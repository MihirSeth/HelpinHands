// Import the functions you need from the SDKs you need

import {getFirestore} from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getDocs, addDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3OvzY6hk430mWp7-SaSDYQOLTMHarwKA",
  authDomain: "cs-project-2315c.firebaseapp.com",
  projectId: "cs-project-2315c",
  storageBucket: "cs-project-2315c.appspot.com",
  messagingSenderId: "79017292450",
  appId: "1:79017292450:web:0136d10da00fac95ec5dfb",
  measurementId: "G-552EH98WR6"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp);


export { db,auth, collection, getDocs, addDoc };