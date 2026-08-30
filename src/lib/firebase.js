import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function fetchPortfolioData() {
  const [projectSnap, certSnap] = await Promise.all([
    getDocs(collection(db, "projects")),
    getDocs(collection(db, "certificates")),
  ]);

  const projects = projectSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    TechStack: doc.data().TechStack || [],
  }));

  const certificates = certSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return { projects, certificates };
}
