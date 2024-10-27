import { useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import { auth, db } from "./firebase/firebase";
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import Home from "./components/HomePage/HomePage";
import Confirmation from "./components/Confirmation/Confirmation";
// sign ups
import SignUpWithEmailAndPassword from "./components/SignUp/SignUpWithEmailAndPassword";

// log ins
import LogInOptions from "./components/LogIn/LogInOptions";
import LogInWithEmailAndPassword from "./components/LogIn/LogInWithEmailAndPassword.jsx";

export default function App() {
  const [, navigate] = useLocation();

  useEffect(() => {
    // Manejo del resultado del redireccionamiento
    getRedirectResult(auth)
      .then(async (result) => {
        if (result?.user) {
          const user = result.user;
          console.log("User signed in: ", user);

          // Extrae la información del usuario
          const { displayName, email } = user;
          const age = 25; // Ejemplo de edad, puedes obtenerlo de otra manera

          // Almacena la información del usuario en Firestore
          await setDoc(doc(db, "users", user.uid), {
            name: displayName,
            email: email,
            age: age,
          });

          if (user.emailVerified) {
            navigate("/home");
          } else {
            navigate("/confirmation");
          }
        }
      })
      .catch((error) => {
        console.error("Error during sign in: ", error.code, error.message);
      });

    // Observador del estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          navigate("/home");
        } else {
          navigate("/confirmation");
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <Switch>
      <Route path="/" component={SignUpWithEmailAndPassword} />
      <Route path="/home" component={Home} />
      <Route path="/confirmation" component={Confirmation} />
      <Route path="/login" component={LogInWithEmailAndPassword} />
      <Route path="/login-options" component={LogInOptions} />
    </Switch>
  );
}
