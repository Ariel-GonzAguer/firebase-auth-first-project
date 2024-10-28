import { useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

import Home from "./components/HomePage/HomePage";
import Confirmation from "./components/Confirmation/Confirmation";
// sign ups
import SignUpWithEmailAndPassword from "./components/SignUp/SignUpWithEmailAndPassword";

// log ins
// import LogInOptions from "./components/LogIn/LogInOptions";
import LogInWithEmailAndPassword from "./components/LogIn/LogInWithEmailAndPassword.jsx";

export default function App() {
  const [, navigate] = useLocation();

  useEffect(() => {
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
      {/* <Route path="/login-options" component={LogInOptions} /> */}
    </Switch>
  );
}
