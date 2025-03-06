import { getFirestore } from "firebase/firestore"
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase configuration object from the Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBccWB2BxbcnTK7LOF2--pe9JgLI4ycsmo",
  authDomain: "vitachat-55f92.firebaseapp.com",
  projectId: "vitachat-55f92",
  storageBucket: "vitachat-55f92.firebasestorage.app",
  messagingSenderId: "578319708216",
  appId: "1:578319708216:web:e3254021ef55466811b6cd",
  measurementId: "G-1NNT6RYPLQ",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);