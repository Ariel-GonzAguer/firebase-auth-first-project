import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAsjlAabixf6R1xxmn6ggcbcUzmFY6v-Uk",
  authDomain: "fir-auth-first-project.firebaseapp.com",
  projectId: "fir-auth-first-project",
  storageBucket: "fir-auth-first-project.appspot.com",
  messagingSenderId: "145188538699",
  appId: "1:145188538699:web:21eb7cea150cd52b8200ce",
  measurementId: "G-HLT8V08VR1",
});

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export default firebaseApp;
export { auth, db };
