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
  .catch(err => {
    if (err.code == "failed-precondition") {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
      console.log("failed-precondition FUCK");
    } else if (err.code == "unimplemented") {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
      console.log("unimplemented FUCK");
    }
    //console.log(err);
  });

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const db = firebase.firestore();
