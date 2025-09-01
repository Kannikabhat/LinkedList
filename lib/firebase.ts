// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config (replace with your project’s values)
const firebaseConfig = {
 apiKey: "AIzaSyDL9gqryWpm8dnv-MJrVptSuh5T7qlKQ2U",
  authDomain: "dsa-ai-tutor.firebaseapp.com",
  projectId: "dsa-ai-tutor",
  storageBucket: "dsa-ai-tutor.firebasestorage.app",
  messagingSenderId: "1082341095398",
  appId: "1:1082341095398:web:2c27dd91edcd0ab3090827",
  measurementId: "G-L8X6JNM91L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
