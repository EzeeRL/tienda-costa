"use client";

import { useState } from "react";

export default function CheckoutModal({ product }: any) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    codigo_postal: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await fetch("https://tienda-ramos.vercel.app/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          producto: product.name,
          cantidad: 1,
          pagado: false,
          payment_id: null,
          userId: null,
        }),
      });

      const data = await res.json();

      // ✅ Mensaje limpio (sin romper Next)
      const mensaje = [
        "Nuevo Pedido",
        "Nombre: " + form.nombre,
        "Producto: " + product.name,
        "Direccion: " + form.direccion,
        "Telefono: " + form.telefono,
      ].join("\n");

      const numero = "5491123456789"; // 🔥 CAMBIAR POR TU NUMERO

      const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

      // 🚀 Abrir WhatsApp
      window.open(url, "_blank");

      alert("Pedido creado y enviado por WhatsApp");

      setOpen(false);
    } catch (error) {
      console.error(error);
      alert("Error al crear pedido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Botón */}
      <button
        onClick={() => setOpen(true)}
        className="bg-black text-white px-6 py-3 rounded-lg mt-4"
      >
        Comprar ahora
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
            <h2 className="text-xl font-semibold">Datos de envio</h2>

            <input
              name="nombre"
              placeholder="Nombre"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              name="telefono"
              placeholder="Telefono"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              name="direccion"
              placeholder="Direccion"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              name="codigo_postal"
              placeholder="Codigo Postal"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <div className="flex gap-2">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                {loading ? "Enviando..." : "Confirmar"}
              </button>

              <button
                onClick={() => setOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}