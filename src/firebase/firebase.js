import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyApp1AsbE1CbKBbvrKRKUrsCn5VGfZ845w",
  authDomain: "clone-r-607c3.firebaseapp.com",
  projectId: "clone-r-607c3",
  storageBucket: "clone-r-607c3.appspot.com",
  messagingSenderId: "651620282640",
  appId: "1:651620282640:web:7e781a9eef887467b8b595",
  measurementId: "G-Z2RNW25QYR",
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
