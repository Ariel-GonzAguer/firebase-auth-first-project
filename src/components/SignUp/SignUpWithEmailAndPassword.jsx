import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function SignUpWithEmailAndPassword() {
  const [, navigate] = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);
      console.log("Verification email sent");

      // Save additional user data to Firestore
      await setDoc(doc(db, "usuarios-first-project", user.uid), {
        name: name,
        age: age,
        email: email,
      });

      navigate("/confirmation");
    } catch (error) {
      console.log(error.code, error.message);
      setError(error.message);
    }
  }

  return (
    <section
      style={{ display: "flex", flexDirection: "column", textAlign: "center" }}
    >
      <div>
        <div>
          <h1>Sign Up</h1>
          <form onSubmit={onSubmit}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Name"
              />
              <label htmlFor="age">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                placeholder="Age"
              />
              <label htmlFor="email-address">Email address</label>
              <input
                type="email"
                label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email address"
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                label="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit">Sign up</button>
          </form>

          <p>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
