"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Header from "../components/header";
import "./login.css";
import { loginUser, registerUser } from "../lib/api/auth";

// 🔥 tipos
type FormType = {
  name: string;
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();

  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [form, setForm] = useState<FormType>({
    name: "",
    email: "",
    password: "",
  });

  // 🔥 setter tipado
  const set = (k: keyof FormType, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  // 🔐 submit
  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (isRegister) {
        await registerUser(form);
        alert("Usuario creado correctamente");

        // auto login
        await loginUser({
          email: form.email,
          password: form.password,
        });
      } else {
        await loginUser({
          email: form.email,
          password: form.password,
        });
      }

      router.push("/");
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Error desconocido");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <main className="login-page">
        <div className="container-card-login">
          {/* encabezado */}
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

          {/* formulario */}
          <div className="container-login">
            <div className="container-inputs">
              {/* nombre solo en register */}
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

            {/* toggle */}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="button-register"
            >
              {isRegister ? "Ya tengo cuenta" : "Crear cuenta"}
            </button>

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
              Al continuar aceptás los términos y condiciones.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}