import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATXvm9mRDigI6ULQeZtXFmY3Yqei_iYjY",
  authDomain: "note-taking-app-pilvo.firebaseapp.com",
  projectId: "note-taking-app-pilvo",
  storageBucket: "note-taking-app-pilvo.firebasestorage.app",
  messagingSenderId: "79216631404",
  appId: "1:79216631404:web:a40a4dd52d2d7d61624249",
  measurementId: "G-FD61XEEMM1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
