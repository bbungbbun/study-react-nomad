import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyANd4yZT54bSK0AcbItj1bqB7q5x78fOT0",
  authDomain: "nwitter-reloaded.firebaseapp.com",
  projectId: "nwitter-reloaded",
  storageBucket: "nwitter-reloaded.appspot.com",
  messagingSenderId: "597055701730",
  appId: "1:597055701730:web:ad1f4784fbb491e2a614bb",
};

const app = initializeApp(firebaseConfig);

// 계정 인증
export const auth = getAuth(app);

// 저장소
export const storage = getStorage(app); 

// 데이터베이스
export const db = getFirestore(app);