import { initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, setPersistence } from "firebase/auth";
import { enableIndexedDbPersistence } from "firebase/firestore";
import { CACHE_SIZE_UNLIMITED, initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { firebaseConfig } from "./configs/firebase";

export const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, { cacheSizeBytes: CACHE_SIZE_UNLIMITED });
export const auth = getAuth();
export const storage = getStorage(app);

auth.languageCode = "ru";

setPersistence(auth, browserLocalPersistence).catch(console.error);
enableIndexedDbPersistence(db).catch(console.error);
