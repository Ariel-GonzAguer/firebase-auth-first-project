import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, provider } from "../../firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import { useLocation } from "wouter";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 600);

  const [, navigate] = useLocation();

  // useEffect(() => {
  //   const handleResize = () => setIsLargeScreen(window.innerWidth >= 600);
  //   window.addEventListener("resize", handleResize);

  //   // Limpieza del evento al desmontar el componente
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      alert("Error al iniciar sesión. Usuario o contraseña incorrectos.");
      console.error("Error al iniciar sesión: ", error);
    }
  };

  const signInWithGooglePopUp = async () => {
    try {
      provider.setCustomParameters({ prompt: "select_account" });
      await signInWithPopup(auth, provider);
      navigate("/home");
    } catch (error) {
      console.error("Error al iniciar sesión con Google: ", error);
    }
  };

  return (
    <section
      style={{ display: "flex", flexDirection: "column", textAlign: "center" }}
    >
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div /* style={{ display: isLargeScreen ? "block" : "none" }} */>
        <p>Or Log In with Google POP UP</p>
        <button onClick={signInWithGooglePopUp}>POP UP</button>
      </div>
    </section>
  );
}
