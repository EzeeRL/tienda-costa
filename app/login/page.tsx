"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Header from "../components/header";
import "./login.css";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") router.push("/");
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Header />

      <main className="login-page">
        <div className="container-card-login">
          {/* encabezado */}
          <div className="container-sup">
            <h1 className="title">Bienvenido</h1>
            <p className="subtitle">
              Iniciá sesión con tu cuenta o registrate para continuar
            </p>
          </div>

          {/* formulario */}
          <div className="container-login">
            <div className="container-inputs">
              <input
                type="email"
                placeholder="Correo electrónico"
                className="inputs"
              />

              <input
                type="password"
                placeholder="Contraseña"
                className="inputs"
              />
            </div>

            <button className="button-login">Iniciar sesión</button>

            <button className="button-register">Crear cuenta</button>

            {/* separador */}
            <div className="divider">
              <span>o continuar con</span>
            </div>

            {/* google */}
            <button onClick={() => signIn("google")} className="button-google">
              <Image
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                width={20}
                height={20}
              />
              Continuar con Google
            </button>

            <p className="terms">
              Al iniciar sesión aceptás los términos y condiciones.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
