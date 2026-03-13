"use client";

import Header from "@/app/components/header";
import { useCart } from "./carrito-context";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";

export default function CarritoPage() {
  const { items, removeFromCart, total } = useCart();

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío</h1>
          <p className="text-gray-500 mb-8">
            Explorá nuestros productos y agregá algo que te guste.
          </p>
          <Link
            href="/productos"
            className="bg-black text-white px-6 py-3 rounded-sm hover:scale-105 transition-transform inline-block"
          >
            Ver productos
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Tu carrito</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Lista de productos */}
          <div className="flex-1 flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex gap-4 border border-gray-200 rounded-xl p-4"
              >
                <div className="relative w-24 h-24 bg-[#faf7f7] rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-500 text-sm">Talle: {item.size}</p>
                  <p className="text-gray-500 text-sm">
                    Cantidad: {item.quantity}
                  </p>
                  <p className="font-medium mt-1">{item.price}</p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id, item.size)}
                  className="p-2 hover:bg-gray-100 rounded-md self-start transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* Resumen */}
          <div className="lg:w-72">
            <div className="border border-gray-200 rounded-xl p-6 sticky top-28">
              <h2 className="text-xl font-semibold mb-4">Resumen</h2>

              <div className="flex justify-between mb-2 text-gray-600">
                <span>Subtotal</span>
                <span>${total.toLocaleString("es-AR")}</span>
              </div>

              <div className="flex justify-between mb-6 text-gray-600">
                <span>Envío</span>
                <span className="text-green-600">Gratis</span>
              </div>

              <div className="flex justify-between font-bold text-lg border-t pt-4">
                <span>Total</span>
                <span>${total.toLocaleString("es-AR")}</span>
              </div>

              <button className="w-full bg-black text-white py-3 mt-6 rounded-sm font-medium hover:scale-105 transition-transform">
                Finalizar compra
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}