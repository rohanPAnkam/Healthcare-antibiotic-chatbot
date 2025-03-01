// This is a placeholder file for Firebase configuration
// You would replace this with actual Firebase initialization code

/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
*/

// For now, we'll just export a placeholder
// export const firebaseConfigPlaceholder = {
//   // This is just a placeholder
//   initialized: false,
// }


// // lib/firebase.ts
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";

// // Your Firebase configuration object from the Firebase Console
// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firebase Authentication and get a reference to the service
// export const auth = getAuth(app);
// export const googleProvider = new GoogleAuthProvider();

// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase configuration object from the Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBFknmazzYGEUhzxOfrVbC8l8QrdCRaKlc",
  authDomain: "vitachat-a7463.firebaseapp.com",
  projectId: "vitachat-a7463",
  storageBucket: "vitachat-a7463.firebasestorage.app",
  messagingSenderId: "641235233241",
  appId: "1:641235233241:web:9ccbc3a770c0b65a9351c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();