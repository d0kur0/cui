import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./configs/firebase";
import { browserLocalPersistence, getAuth, setPersistence } from "firebase/auth";
import { enableIndexedDbPersistence } from "firebase/firestore";
import { initializeFirestore, CACHE_SIZE_UNLIMITED } from "firebase/firestore";

export const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, { cacheSizeBytes: CACHE_SIZE_UNLIMITED });
export const auth = getAuth();

auth.languageCode = "ru";

setPersistence(auth, browserLocalPersistence).catch(console.error);
enableIndexedDbPersistence(db).catch(console.error);
