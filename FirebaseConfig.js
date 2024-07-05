import { getStorage } from 'firebase/storage'
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC2531bL2s3S5zwdunw0V5XB08Lhlvk0L8",
  authDomain: "memorykeeper-4ec36.firebaseapp.com",
  projectId: "memorykeeper-4ec36",
  storageBucket: "memorykeeper-4ec36.appspot.com",
  messagingSenderId: "119090993972",
  appId: "1:119090993972:web:83cd970fbf473bf3fbe361"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const db = getFirestore(app)