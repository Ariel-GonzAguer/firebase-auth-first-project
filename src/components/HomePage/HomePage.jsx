import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useLocation } from "wouter";

export default function Home() {
  const [user, setUser] = useState(null);
  const [array, setArray] = useState(["", "", "", ""]);
  const [firestoreArray, setFirestoreArray] = useState([]);
  const [, navigate] = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchArrayFromFirestore(user.uid);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchArrayFromFirestore = async (uid) => {
    const docRef = doc(db, "usuarios-first-project", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setFirestoreArray(docSnap.data().userArrayTT || []);
    } else {
      console.log("No such document!");
    }
  };

  const handleArrayChange = (index, value) => {
    const newArray = [...array];
    newArray[index] = value;
    setArray(newArray);
  };

  const handleUpdateArray = async () => {
    if (user) {
      const docRef = doc(db, "usuarios-first-project", user.uid);
      await updateDoc(docRef, { userArrayTT: array });
      fetchArrayFromFirestore(user.uid); // Refresh Firestore array
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <section
      style={{ display: "flex", flexDirection: "column", textAlign: "center" }}
    >
      {user ? (
        <div>
          <h1>Editar Array</h1>
          <div>
            {array.map((item, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>
          <button onClick={handleUpdateArray}>Update Array</button>
          <h2>Valor Actual del Array en Firestore</h2>
          <div>
            {firestoreArray.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </section>
  );
}
