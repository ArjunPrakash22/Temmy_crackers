// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwvfzhYqbE6WlItjm1He--gUY7zdeFA2U",
  authDomain: "temmy-crackers.firebaseapp.com",
  projectId: "temmy-crackers",
  storageBucket: "temmy-crackers.appspot.com",
  messagingSenderId: "11787890418",
  appId: "1:11787890418:web:daeae0ccef23b2a2886a6b",
  measurementId: "G-5MPDV8M9CD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth(app);
export const db=getFirestore(app);