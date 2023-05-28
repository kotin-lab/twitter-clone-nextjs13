// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5axbqiGus9EZ0ZJOqvjYDP9vpLdhCGPQ",
  authDomain: "twitter-clone-f4d36.firebaseapp.com",
  projectId: "twitter-clone-f4d36",
  storageBucket: "twitter-clone-f4d36.appspot.com",
  messagingSenderId: "610981176253",
  appId: "1:610981176253:web:9ca8a92410f19b2da7a8d4"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };