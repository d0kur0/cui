import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./configs/firebase";
import { getFirestore } from "firebase/firestore/lite";
import { browserLocalPersistence, getAuth, setPersistence } from "firebase/auth";

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();

auth.languageCode = "ru";
setPersistence(auth, browserLocalPersistence).catch(console.error);
