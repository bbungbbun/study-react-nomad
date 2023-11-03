import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAakDKJhTRRO3Pid5OOVMKT0pEF7Tdsias",
  authDomain: "nwitter-reloaded-c27fc.firebaseapp.com",
  projectId: "nwitter-reloaded-c27fc",
  storageBucket: "nwitter-reloaded-c27fc.appspot.com",
  messagingSenderId: "262589880132",
  appId: "1:262589880132:web:9aec1ba43c06e9abd1a911"
};

const app = initializeApp(firebaseConfig);

// 계정 인증
export const auth = getAuth(app);

// 저장소
export const storage = getStorage(app); 

// 데이터베이스
export const db = getFirestore(app);