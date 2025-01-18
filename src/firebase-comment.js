import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection, addDoc } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANx_94NC9oHaFtUL9H6Fc6R5NhA_gyFeA",
  authDomain: "portfolio-56824.firebaseapp.com",
  projectId: "portfolio-56824",
  storageBucket: "portfolio-56824.firebasestorage.app",
  messagingSenderId: "671771057579",
  appId: "1:671771057579:web:737b621250273e436d46ee",
  measurementId: "G-G2PBEF46QL",
};

// Initialize with a unique name
const app = initializeApp(firebaseConfig, "comments-app");
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, collection, addDoc };
