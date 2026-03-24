"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Header from "../components/header";
import "./login.css";
import { registerUser } from "../lib/api/auth";

type FormType = {
  name: string;
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();

  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<FormType>({
    name: "",
    email: "",
    password: "",
  });

  const set = (k: keyof FormType, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // 🆕 REGISTRO
      if (isRegister) {
        await registerUser(form);
      }

      // 🔐 LOGIN REAL (NEXTAUTH)
      const res = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (res?.error) {
        alert("Credenciales incorrectas");
        return;
      }

      router.push("/");
    } catch (err) {
      alert("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <main className="login-page">
        <div className="container-card-login">
          <div className="container-sup">
            <h1 className="title">
              {isRegister ? "Crear cuenta" : "Bienvenido"}
            </h1>

            <p className="subtitle">
              {isRegister
                ? "Registrate para empezar"
                : "Iniciá sesión con tu cuenta"}
            </p>
          </div>

          <div className="container-login">
            <div className="container-inputs">
              {isRegister && (
                <input
                  type="text"
                  placeholder="Nombre"
                  className="inputs"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                />
              )}

              <input
                type="email"
                placeholder="Correo electrónico"
                className="inputs"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
              />

              <input
                type="password"
                placeholder="Contraseña"
                className="inputs"
                value={form.password}
                onChange={(e) => set("password", e.target.value)}
              />
            </div>

            <button
              onClick={handleSubmit}
              className="button-login"
              disabled={loading}
            >
              {loading
                ? "Cargando..."
                : isRegister
                ? "Crear cuenta"
                : "Iniciar sesión"}
            </button>

            <button
              onClick={() => setIsRegister(!isRegister)}
              className="button-register"
            >
              {isRegister ? "Ya tengo cuenta" : "Crear cuenta"}
            </button>

            <div className="divider">
              <span>o continuar con</span>
            </div>

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
              Al continuar aceptás los términos y condiciones.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}