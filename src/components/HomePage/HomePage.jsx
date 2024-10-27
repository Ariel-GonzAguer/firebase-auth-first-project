import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useLocation } from "wouter";

export default function Home() {
  const [userData, setUserData] = useState(null);
  const [, navigate] = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const userDoc = await getDoc(doc(db, "usuarios-first-project", uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
        console.log("fullUserData", userDoc.data());
      } else {
        console.log("user is logged out");
        navigate("/login");
      }
    });
  }, [navigate]);

  async function handleLogout() {
    try {
      await signOut(auth);
      // Sign-out successful.
      navigate("/");
      console.log("Signed out successfully");
    } catch (error) {
      console.error("Sign out error", error);
    }
  }

  return (
    <section
      style={{ display: "flex", flexDirection: "column", textAlign: "center" }}
    >
      <p>Welcome Home</p>
      {userData && (
        <div>
          <p>Name: {userData.name}</p>
          <p>Age: {userData.age}</p>
          <p>Email: {userData.email}</p>
        </div>
      )}

      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </section>
  );
}
