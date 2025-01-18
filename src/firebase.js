import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "@firebase/firestore"; // Perbarui ini

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANx_94NC9oHaFtUL9H6Fc6R5NhA_gyFeA",
  authDomain: "portfolio-56824.firebaseapp.com",
  projectId: "portfolio-56824",
  storageBucket: "portfolio-56824.firebasestorage.app",
  messagingSenderId: "671771057579",
  appId: "1:671771057579:web:737b621250273e436d46ee",
  measurementId: "G-G2PBEF46QL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };
