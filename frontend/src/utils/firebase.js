// src/utils/firebase.js

import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  sendEmailVerification, 
  RecaptchaVerifier, 
  PhoneAuthProvider, 
  signInWithCredential 
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDVdPEGvcATgm5NJSsIwDJsoWeiKLM9XzI",
  authDomain: "vibehive-2fce4.firebaseapp.com",
  databaseURL: "https://vibehive-2fce4-default-rtdb.firebaseio.com",
  projectId: "vibehive-2fce4",
  storageBucket: "vibehive-2fce4.firebasestorage.app",
  messagingSenderId: "139352370205",
  appId: "1:139352370205:web:b1606a35a15d666fe5aaf4",
  measurementId: "G-8K2JEN488E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services (Auth, Firestore, Realtime DB, etc.)
const auth = getAuth(app);
const db = getFirestore(app);
const realtimeDb = getDatabase(app);

export { app, auth, db, realtimeDb, createUserWithEmailAndPassword, sendEmailVerification, PhoneAuthProvider, signInWithCredential, RecaptchaVerifier };
