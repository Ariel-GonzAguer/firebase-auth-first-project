import React from "react";
import { Link } from "wouter";
import signInWithGoogle_PopUp from "../SignUp/SignIn_with_google_popup";

export default function LogInOptions() {
  return (
    <section
      style={{ display: "flex", flexDirection: "column", textAlign: "center" }}
    >
      Seleccione una manera para hacer log in:
      <Link to="/login">
        <button>Log in con correo y contraseña</button>
      </Link>
      <button onClick={signInWithGoogle_PopUp}>Log in con Google POP UP</button>
    </section>
  );
}
