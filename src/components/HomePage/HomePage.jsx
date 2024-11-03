import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useLocation } from "wouter";

export default function Home() {
  const [user, setUser] = useState(null);
  const [localArray, setLocalArray] = useState(["", "", "", ""]);
  const [firestoreArray, setFirestoreArray] = useState([]);

  const [localObject, setLocalObject] = useState({
    color: "",
    background: "",
    size: "",
    type: "",
  });
  const [firestoreObject, setFirestoreObject] = useState({});

  const [, navigate] = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        await createOrFetchUserDocument(user.uid, user.displayName, user.email);
        fetchArrayFromFirestore(user.uid);
        fetchObjectFromFirestore(user.uid);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const createOrFetchUserDocument = async (uid, displayName, email) => {
    try {
      const docRef = doc(db, "usuarios-first-project", uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        // Crear el documento si no existe
        await setDoc(docRef, {
          uid: uid,
          name: displayName,
          email: email,
          userArrayTT: ["", "", "", ""], // Inicializa el localArray
          object: {}, // Inicializa el objeto
        });
        console.log("Documento creado para el usuario:", uid);
      } else if (docSnap.exists()) {
        console.log("Documento del usuario EXISTE:", docSnap.data());
      }
    } catch (error) {
      console.error(
        "Error creando o obteniendo el documento del usuario: ",
        error
      );
    }
  };

  const fetchArrayFromFirestore = async (uid) => {
    try {
      const docRef = doc(db, "usuarios-first-project", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFirestoreArray(docSnap.data().userArrayTT || []);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document: ", error);
    }
  };

  const fetchObjectFromFirestore = async (uid) => {
    try {
      const docRef = doc(db, "usuarios-first-project", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFirestoreObject(docSnap.data().object || {});
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document: ", error);
    }
  };

  const handleArrayChange = (index, value) => {
    const newArray = [...localArray];
    newArray[index] = value;
    setLocalArray(newArray);
  };

  const handleObjectChange = (key, value) => {
    const newObject = { ...localObject };
    newObject[Object.keys(localObject)[key]] = value;
    setLocalObject(newObject);
  };

  const handleUpdateArray = async () => {
    if (user) {
      try {
        const docRef = doc(db, "usuarios-first-project", user.uid);
        await updateDoc(docRef, { userArrayTT: localArray });
        fetchArrayFromFirestore(user.uid); // Refresh Firestore localArray
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    }
  };

  const handleUpdateObject = async () => {
    if (user) {
      try {
        const docRef = doc(db, "usuarios-first-project", user.uid);
        await updateDoc(docRef, { object: localObject });
        fetchObjectFromFirestore(user.uid); // Refresh Firestore localArray
      } catch (error) {
        console.error("Error updating document: ", error);
      }
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
            {localArray.map((item, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>
          <button onClick={handleUpdateArray}>Actualizar Array</button>
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
      <br />
      <br />

      <h2>Editar objeto</h2>
      <div>
        {Object.entries(localObject).map(([key, value], index) => (
          <div key={index}>
            <label>{key}:</label>
            <input
              type="text"
              value={value}
              onChange={(e) => handleObjectChange(index, e.target.value)}
            />
          </div>
        ))}
        <button onClick={handleUpdateObject} style={{ width: "6rem" }}>
          Actualizar Object
        </button>
      </div>

      <h2>Valor Actual del Objeto en Firestore</h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          border: "6px solid black",
          padding: "1rem",
          color: `${firestoreObject.color}`,
          backgroundColor: `${firestoreObject.background}`,
          width: "90%",
          margin: "0 auto",
        }}
      >
        {Object.entries(firestoreObject).map(([key, value], index) => (
          <p key={index}>{`${key}: ${value}`}</p>
        ))}
      </div>

      <br />
      <br />
      <br />
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </section>
  );
}
