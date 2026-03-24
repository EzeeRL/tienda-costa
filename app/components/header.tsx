"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

const UserIcon = () =>
  session?.user ? (
    <Link href="/perfil">
      {session.user.image ? (
        <Image
          src={session.user.image}
          alt={session.user.name ?? "Usuario"}
          width={32}
          height={32}
          style={{ borderRadius: "50%", objectFit: "cover" }}
          className="hover:scale-105 transition"
        />
      ) : (
        // 👇 fallback sin imagen
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white text-sm font-semibold">
          {session.user.name?.charAt(0).toUpperCase() || "U"}
        </div>
      )}
    </Link>
  ) : (
    <Link href="/login" className="hover:scale-105 transition">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="7" r="4" />
        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
      </svg>
    </Link>
  );

  return (
    <header className="fixed top-0 left-0 w-full bg-white border-b border-gray-900 z-50">
      <div className="mx-auto h-14 flex items-center justify-between px-4">
        {/* Desktop - izquierda */}
        <nav className="hidden md:flex gap-8 items-center">
          <Link href="/" className="hover:scale-105 transition">Inicio</Link>
          <Link href="/productos" className="hover:scale-105 transition">Productos</Link>
          <Link href="" className="hover:scale-105 transition">Contáctanos</Link>
          <Link href="/dashboard" className="hover:scale-105 transition">Admin</Link>
        </nav>

        {/* Desktop - derecha */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/productos" className="hover:scale-105 transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="10" cy="10" r="7" />
              <line x1="21" y1="21" x2="15" y2="15" />
            </svg>
          </Link>
          <Link href="" className="hover:scale-105 transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
            </svg>
          </Link>
          <Link href="/carrito" className="hover:scale-105 transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M15 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M17 17h-11v-14h-2" />
              <path d="M6 5l14 1l-1 7h-13" />
            </svg>
          </Link>
          <UserIcon />
        </nav>

        {/* Mobile */}
        <div className="w-full md:hidden flex items-center gap-4">
          <button className="flex flex-col gap-1" onClick={() => setOpen(!open)}>
            <span className="w-6 h-[2px] bg-black"></span>
            <span className="w-6 h-[2px] bg-black"></span>
            <span className="w-6 h-[2px] bg-black"></span>
          </button>
          <div className="w-full flex justify-end gap-4 items-center">
            <Link href="">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="10" cy="10" r="7" />
                <line x1="21" y1="21" x2="15" y2="15" />
              </svg>
            </Link>
            <Link href="">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
              </svg>
            </Link>
            <Link href="/carrito">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M15 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17 17h-11v-14h-2" />
                <path d="M6 5l14 1l-1 7h-13" />
              </svg>
            </Link>
            <UserIcon />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-60 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"}`}>
        <nav className="flex flex-col gap-4 px-4 pb-6 pt-2 border-t border-gray-200 bg-white">
          <Link href="/" onClick={() => setOpen(false)}>Inicio</Link>
          <Link href="/productos" onClick={() => setOpen(false)}>Productos</Link>
          <Link href="" onClick={() => setOpen(false)}>Contáctanos</Link>
        </nav>
      </div>
    </header>
  );
}