import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAakDKJhTRRO3Pid5OOVMKT0pEF7Tdsias",
  authDomain: "nwitter-reloaded-c27fc.firebaseapp.com",
  projectId: "nwitter-reloaded-c27fc",
  storageBucket: "nwitter-reloaded-c27fc.appspot.com",
  messagingSenderId: "262589880132",
  appId: "1:262589880132:web:9aec1ba43c06e9abd1a911"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);