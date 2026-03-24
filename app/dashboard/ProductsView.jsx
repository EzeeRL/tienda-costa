"use client";

import { useState } from "react";
import { Icon, fmt, StatusBadge, Modal, CATEGORIES } from "./shared";
import { createProduct, updateProduct, deleteProductApi } from "../lib/api/products";

function ProductForm({ product, onSave, onClose }) {
  const [form, setForm] = useState(
    product || {
      name: "",
      category: "",
      price: "",
      stock: "",
      image: "",
      status: "activo",
    }
  );

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <>
      <div className="space-y-4">
        {[
          ["name", "Nombre del producto", "text"],
          ["image", "URL de la Imagen", "text"],
          ["price", "Precio", "number"],
          ["stock", "Stock", "number"],
        ].map(([k, label, type]) => (
          <div key={k}>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              {label}
            </label>
            <input
              type={type}
              value={form[k]}
              onChange={(e) => set(k, e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>
        ))}

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Categoría
          </label>
          <select
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            <option value="">Seleccionar...</option>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-2 mt-6">
        <button
          onClick={onClose}
          className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
        >
          Cancelar
        </button>
        <button
          onClick={() => onSave(form)}
          className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
        >
          Guardar
        </button>
      </div>
    </>
  );
}

export default function ProductsView({ products, setProducts }) {
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ CREATE / UPDATE
  const saveProduct = async (form) => {
    try {
      if (modal === "add") {
        const newProduct = await createProduct({
          name: form.name,
          description: form.name,
          price: Number(form.price),
          image: form.image,
          category: form.category,
          stock: Number(form.stock),
        });

        setProducts((prev) => [
          ...prev,
          {
            ...newProduct,
            sku: newProduct.id,
            status: newProduct.stock === 0 ? "sin stock" : "activo",
          },
        ]);
      } else {
        const updated = await updateProduct(modal.id, {
          name: form.name,
          description: form.name,
          price: Number(form.price),
        });

        setProducts((prev) =>
          prev.map((p) =>
            p.id === modal.id
              ? { ...p, ...updated }
              : p
          )
        );
      }

      setModal(null);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ DELETE
  const deleteProduct = async () => {
    try {
      await deleteProductApi(deleteId);
      setProducts((prev) => prev.filter((p) => p.id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Productos</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {products.length} productos en catálogo
          </p>
        </div>

        <button
          onClick={() => setModal("add")}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition shadow-sm"
        >
          {Icon.plus("w-4 h-4")} Nuevo producto
        </button>
      </div>

      {/* SEARCH */}
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2">
          {Icon.search("w-4 h-4 text-gray-400")}
        </span>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar producto..."
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              {["Img", "Producto", "Categoría", "Precio", "Stock", "Estado", "Acciones"].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  {p.image ? (
                    <img src={p.image} className="w-8 h-8 rounded object-cover" />
                  ) : (
                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                      {Icon.box("w-4 h-4 text-gray-400")}
                    </div>
                  )}
                </td>

                <td className="px-4 py-3 font-medium">{p.name}</td>
                <td className="px-4 py-3">{p.category}</td>
                <td className="px-4 py-3 font-semibold">{fmt(p.price)}</td>
                <td className="px-4 py-3">{p.stock}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={p.status} />
                </td>

              <td className="px-4 py-3">
  <div className="flex items-center gap-2">
    <button
      onClick={() => setModal(p)}
      className="p-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition"
    >
      {Icon.edit("w-5 h-5")}
    </button>

    <button
      onClick={() => setDeleteId(p.id)}
      className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition"
    >
      {Icon.trash("w-5 h-5")}
    </button>
  </div>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODALS */}
      {modal && (
        <Modal
          title={modal === "add" ? "Nuevo producto" : "Editar producto"}
          onClose={() => setModal(null)}
        >
          <ProductForm
            product={modal !== "add" ? modal : null}
            onSave={saveProduct}
            onClose={() => setModal(null)}
          />
        </Modal>
      )}

      {deleteId && (
        <Modal title="Eliminar producto" onClose={() => setDeleteId(null)}>
          <p className="text-sm text-gray-600 mb-5">
            ¿Seguro que querés eliminar este producto?
          </p>
          <button
            onClick={deleteProduct}
            className="w-full py-2.5 rounded-xl bg-red-500 text-white"
          >
            Eliminar
          </button>
        </Modal>
      )}
    </div>
  );
}