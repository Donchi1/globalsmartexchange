import { FirebaseApp, getApps, initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/database";
// import {...} from "firebase/functions";
 import {getFirestore} from "firebase/firestore";
 import {getAuth} from "firebase/auth";
 import {getStorage} from "firebase/storage";

 
  


// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "smartexchange-d8e2b.firebaseapp.com",
  projectId: "smartexchange-d8e2b",
  storageBucket: "smartexchange-d8e2b.appspot.com",
  messagingSenderId: "562626404521",
  appId: "1:562626404521:web:a2ed6f2848e5c5b22589b8"
  };



  export const app  = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps();

  const myAuth = () => getAuth(app as FirebaseApp);
  const myStorage = () => getStorage(app as FirebaseApp);
  const myDb = () => getFirestore(app as FirebaseApp);
  
  export const auth = myAuth();
  export const storage = myStorage();
  export const db = myDb();