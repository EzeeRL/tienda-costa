"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") router.push("/login");
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#fafafa]">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-10 w-full max-w-md flex flex-col items-center gap-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Bienvenido</h1>
          <p className="text-gray-500 mt-2 text-sm">
            Iniciá sesión para continuar
          </p>
        </div>

        <div className="w-full h-px bg-gray-100" />

        <button
          onClick={() => signIn("google")}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 px-4 hover:bg-gray-50 transition font-medium text-sm"
        >
          <Image
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            width={20}
            height={20}
          />
          Continuar con Google
        </button>

        <p className="text-xs text-gray-400 text-center">
          Al iniciar sesión aceptás los términos y condiciones.
        </p>
      </div>
    </main>
  );
}