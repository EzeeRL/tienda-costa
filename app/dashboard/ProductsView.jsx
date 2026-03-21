"use client";
import { useState } from "react";
import { Icon, fmt, StatusBadge, Modal, CATEGORIES } from "./shared";

function ProductForm({ product, onSave, onClose }) {
  const [form, setForm] = useState(product || { name: "", sku: "", category: "", price: "", stock: "", status: "activo", image: "" });
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  
  return (
    <>
      <div className="space-y-4">
        {[
          ["name", "Nombre del producto", "text"],
          ["sku", "SKU", "text"],
          ["image", "URL de la Imagen", "text"], // Campo agregado para la imagen
          ["price", "Precio", "number"],
          ["stock", "Stock", "number"]
        ].map(([k, label, type]) => (
          <div key={k}>
            <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
            <input type={type} value={form[k]} onChange={(e) => set(k, e.target.value)} placeholder={k === "image" ? "https://..." : ""}
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" />
          </div>
        ))}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Categoría</label>
          <select value={form.category} onChange={(e) => set("category", e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition appearance-none">
            <option value="">Seleccionar...</option>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Estado</label>
          <select value={form.status} onChange={(e) => set("status", e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition appearance-none">
            <option value="activo">Activo</option>
            <option value="sin stock">Sin stock</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>
      </div>
      <div className="flex gap-2 mt-6">
        <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition">Cancelar</button>
        <button onClick={() => onSave(form)} className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition">Guardar</button>
      </div>
    </>
  );
}

export default function ProductsView({ products, setProducts }) {
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const saveProduct = (form) => {
    if (modal === "add") {
      setProducts(prev => [...prev, { ...form, id: Date.now(), price: +form.price, stock: +form.stock }]);
    } else {
      setProducts(prev => prev.map(p => p.id === modal.id ? { ...p, ...form, price: +form.price, stock: +form.stock } : p));
    }
    setModal(null);
  };

  const deleteProduct = () => {
    setProducts(prev => prev.filter(p => p.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Productos</h2>
          <p className="text-sm text-gray-500 mt-0.5">{products.length} productos en catálogo</p>
        </div>
        <button onClick={() => setModal("add")}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition shadow-sm">
          {Icon.plus("w-4 h-4")} Nuevo producto
        </button>
      </div>

      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2">{Icon.search("w-4 h-4 text-gray-400")}</span>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por nombre o SKU..."
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
      </div>

      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              {["Img", "Producto","SKU","Categoría","Precio","Stock","Estado","Acciones"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(p => (
              <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3">
                  {p.image ? <img src={p.image} alt="prod" className="w-8 h-8 rounded object-cover" /> : <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">{Icon.box("w-4 h-4 text-gray-400")}</div>}
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">{p.name}</td>
                <td className="px-4 py-3 text-gray-500 font-mono text-xs">{p.sku}</td>
                <td className="px-4 py-3 text-gray-600">{p.category}</td>
                <td className="px-4 py-3 font-semibold text-gray-900">{fmt(p.price)}</td>
                <td className="px-4 py-3">
                  <span className={`font-medium ${p.stock === 0 ? "text-red-600" : p.stock < 10 ? "text-amber-600" : "text-gray-700"}`}>{p.stock}</span>
                </td>
                <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button onClick={() => setModal(p)} className="p-1.5 rounded-lg hover:bg-indigo-50 text-gray-400 hover:text-indigo-600 transition">
                      {Icon.edit("w-4 h-4")}
                    </button>
                    <button onClick={() => setDeleteId(p.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition">
                      {Icon.trash("w-4 h-4")}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center py-10 text-gray-400 text-sm">Sin resultados</p>}
      </div>

      {modal && (
        <Modal title={modal === "add" ? "Nuevo producto" : "Editar producto"} onClose={() => setModal(null)}>
          <ProductForm product={modal !== "add" ? modal : null} onSave={saveProduct} onClose={() => setModal(null)} />
        </Modal>
      )}

      {deleteId && (
        <Modal title="Eliminar producto" onClose={() => setDeleteId(null)}>
          <p className="text-sm text-gray-600 mb-5">¿Estás seguro que querés eliminar este producto? Esta acción no se puede deshacer.</p>
          <div className="flex gap-2">
            <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition">Cancelar</button>
            <button onClick={deleteProduct} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition">Eliminar</button>
          </div>
        </Modal>
      )}
    </div>
  );
}