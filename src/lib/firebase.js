import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

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

/* ─── READ (existing, unchanged) ─── */

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

/* ─── PROJECTS CRUD ─── */

export async function fetchProjects() {
  const snap = await getDocs(collection(db, "projects"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data(), TechStack: d.data().TechStack || [] }));
}

export async function addProject(data) {
  const docRef = await addDoc(collection(db, "projects"), {
    Title: data.Title || "",
    Description: data.Description || "",
    Img: data.Img || "",
    Link: data.Link || "",
    TechStack: data.TechStack || [],
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateProject(id, data) {
  const docRef = doc(db, "projects", id);
  await updateDoc(docRef, {
    Title: data.Title ?? "",
    Description: data.Description ?? "",
    Img: data.Img ?? "",
    Link: data.Link ?? "",
    TechStack: data.TechStack ?? [],
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProject(id) {
  await deleteDoc(doc(db, "projects", id));
}

/* ─── CERTIFICATES CRUD ─── */

export async function fetchCertificates() {
  const snap = await getDocs(collection(db, "certificates"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function addCertificate(data) {
  const docRef = await addDoc(collection(db, "certificates"), {
    Title: data.Title || "",
    Img: data.Img || "",
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateCertificate(id, data) {
  const docRef = doc(db, "certificates", id);
  await updateDoc(docRef, {
    Title: data.Title ?? "",
    Img: data.Img ?? "",
    updatedAt: serverTimestamp(),
  });
}

export async function deleteCertificate(id) {
  await deleteDoc(doc(db, "certificates", id));
}
