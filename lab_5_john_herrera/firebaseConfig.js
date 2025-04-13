import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD8aWKVOeEM9P8W_rKCyVaza5MqoBGKcyM",
    authDomain: "group8-9a488.firebaseapp.com",
    projectId: "group8-9a488",
    storageBucket: "group8-9a488.firebasestorage.app",
    messagingSenderId: "575084183040",
    appId: "1:575084183040:web:a361719eb1e40f1a2be2e5"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };