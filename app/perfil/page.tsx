"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Header from "@/app/components/header";
import Link from "next/link";

export default function PerfilPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col items-center gap-6 shadow-sm">
          {/* Avatar */}
          <Image
            src={session.user?.image ?? ""}
            alt={session.user?.name ?? "Usuario"}
            width={96}
            height={96}
            className="rounded-full border-4 border-gray-100 shadow"
          />

          {/* Info */}
          <div className="text-center">
            <h1 className="text-2xl font-bold">{session.user?.name}</h1>
            <p className="text-gray-500 mt-1">{session.user?.email}</p>
          </div>

          <div className="w-full h-px bg-gray-100" />

          {/* Acciones */}
          <div className="w-full flex flex-col gap-3">
            <Link
              href="/carrito"
              className="w-full text-center border border-gray-300 rounded-xl py-3 hover:bg-gray-50 transition font-medium text-sm"
            >
              Ver mi carrito
            </Link>

            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="w-full bg-black text-white rounded-xl py-3 hover:scale-105 transition font-medium text-sm"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </main>
    </>
  );
}