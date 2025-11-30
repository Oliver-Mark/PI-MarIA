// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjWn9DUvX19sBP4EMGRvTfok8VcdkuP-c",
  authDomain: "maria-c8ffb.firebaseapp.com",
  projectId: "maria-c8ffb",
  storageBucket: "maria-c8ffb.appspot.com",
  messagingSenderId: "706182379560",
  appId: "1:706182379560:web:1ffc70f45748dc7ba49d1d",
  measurementId: "G-RMTWZ4EWRW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
