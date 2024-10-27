import React from "react";
import { Link } from "wouter";
import signInWithGoogle_PopUp from "../SignUp/SignIn_with_google_popup";
import signInWithGoogleRedirect from "../SignUp/SignIn_with_google_redirect";

export default function LogInOptions() {
  async function signInWithGoogle_REDIRECT() {
    await signInWithGoogleRedirect();
  }

  return (
    <section
      style={{ display: "flex", flexDirection: "column", textAlign: "center" }}
    >
      Seleccione una manera para hacer log in:
      <Link to="/login">
        <button>Log in con correo y contraseña</button>
      </Link>
      <button onClick={signInWithGoogle_PopUp}>
        Sign In With Google POP UP
      </button>
      <button onClick={signInWithGoogle_REDIRECT}>
        Sign In With Google REDIRECTION
      </button>
    </section>
  );
}
