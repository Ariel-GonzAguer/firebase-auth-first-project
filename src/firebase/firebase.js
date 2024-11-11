import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "fir-auth-first-project.firebaseapp.com",
  projectId: "fir-auth-first-project",
  storageBucket: "fir-auth-first-project.appspot.com",
  messagingSenderId: "145188538699",
  appId: "1:145188538699:web:21eb7cea150cd52b8200ce",
  measurementId: "G-HLT8V08VR1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db };
