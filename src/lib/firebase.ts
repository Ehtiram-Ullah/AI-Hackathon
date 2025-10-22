// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import {
  getDatabase,
  ref,
  push,
  set,
  get,
  onValue,
  query,
  orderByChild,
  equalTo,
  limitToFirst,
  update,
} from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_API_KEY,
  authDomain: import.meta.env.VITE_FIRE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIRE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIRE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIRE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIRE_APP_ID,
  measurementId: import.meta.env.VITE_FIRE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app, "https://notifitto-bc539-default-rtdb.asia-southeast1.firebasedatabase.app");


// helper to ensure user is signed in anonymously
export async function ensureAnonymousAuth() {
  if (!auth.currentUser) {
    const userCred = await signInAnonymously(auth);
    return userCred.user;
  }
  return auth.currentUser;
}

// Re-export commonly used DB functions for convenience
export {
  ref, push, set, get, onValue, query, orderByChild, equalTo, limitToFirst, update
};