import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  where,
  serverTimestamp,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

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
export const storage = getStorage(app);

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

/* ─── FIREBASE STORAGE ─── */

/**
 * Upload an image file to Firebase Storage.
 * @param {File} file - The file to upload
 * @param {string} folder - The folder name (e.g., "projects", "certificates")
 * @param {function} onProgress - Callback with progress percentage (0-100)
 * @returns {Promise<string>} - The download URL
 */
export function uploadImage(file, folder, onProgress) {
  return new Promise((resolve, reject) => {
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const storageRef = ref(storage, `portfolio/${folder}/${timestamp}_${safeName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        onProgress?.(progress);
      },
      (error) => reject(error),
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(url);
      }
    );
  });
}

/**
 * Delete an image from Firebase Storage by its download URL.
 */
export async function deleteImage(url) {
  try {
    // Extract the path from the Firebase Storage URL
    const storageRef = ref(storage, url);
    await deleteObject(storageRef);
  } catch {
    // Silently fail — the image may have been manually deleted or is an external URL
  }
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

/* ─── CONTACT SUBMISSIONS ─── */

export async function addContactSubmission(data) {
  const docRef = await addDoc(collection(db, "contact_submissions"), {
    name: data.name,
    email: data.email,
    phone: data.phone,
    message: data.message,
    read: false,
    submittedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function fetchContacts() {
  const q = query(
    collection(db, "contact_submissions"),
    orderBy("submittedAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      ...data,
      submittedAt: data.submittedAt?.toDate?.()?.toISOString() || null,
    };
  });
}

export async function markContactRead(id, read) {
  const docRef = doc(db, "contact_submissions", id);
  await updateDoc(docRef, { read });
}

export async function deleteContact(id) {
  await deleteDoc(doc(db, "contact_submissions", id));
}

/* ─── PAGE VIEW ANALYTICS ─── */

export async function recordPageView(data) {
  await addDoc(collection(db, "page_views"), {
    path: data.path || "/",
    referrer: data.referrer || "",
    timestamp: serverTimestamp(),
    date: data.date, // YYYY-MM-DD string for easy aggregation
  });
}

export async function fetchAnalytics() {
  const snap = await getDocs(collection(db, "page_views"));
  const views = snap.docs.map((d) => d.data());

  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const weekAgo = new Date(now);
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weekAgoStr = weekAgo.toISOString().slice(0, 10);
  const monthStr = now.toISOString().slice(0, 7); // YYYY-MM

  const total = views.length;
  const today = views.filter((v) => v.date === todayStr).length;
  const thisWeek = views.filter((v) => v.date >= weekAgoStr).length;
  const thisMonth = views.filter((v) => v.date?.startsWith(monthStr)).length;

  return { total, today, thisWeek, thisMonth };
}
