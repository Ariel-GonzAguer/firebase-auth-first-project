import React from "react";

import { Link } from "wouter";

export default function Confirmation() {
  return (
    <section
      style={{ display: "flex", flexDirection: "column", textAlign: "center" }}
    >
      <p>
        Un email de confirmación ha sido enviado a tu correo electrónico. Por
        favor, sigue las instrucciones para completar tu registro.
      </p>

      <Link href="/login">
        <button>Iniciar sesión</button>
      </Link>
    </section>
  );
}
