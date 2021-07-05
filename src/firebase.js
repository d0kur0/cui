import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { firebaseConfig } from "./configs/firebase";

firebase.initializeApp(firebaseConfig);
firebase
  .firestore()
  .settings({ cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED });

firebase
  .firestore()
  .enablePersistence()
  .catch(console.warn); 

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const db = firebase.firestore();