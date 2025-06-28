import { initializeApp,getApps,getApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnnfAMPML4_MLPJR37jhnb8ClceUfqntA",
  authDomain: "aiinterviewer-350ee.firebaseapp.com",
  projectId: "aiinterviewer-350ee",
  storageBucket: "aiinterviewer-350ee.firebasestorage.app",
  messagingSenderId: "13031138638",
  appId: "1:13031138638:web:0f31038ad9375d1c98ea1f",
  measurementId: "G-JP061CHPD1"
};

// Initialize Firebase
const app =!getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
// export const initFirebaseClient = () => initializeApp(firebaseConfig);