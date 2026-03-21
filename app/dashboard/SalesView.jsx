"use client";
import { useState } from "react";
import { Icon, fmt, StatusBadge, Modal } from "./shared";

function SaleDetail({ sale, onClose, onStatusChange }) {
  return (
    <>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {[["Orden", sale.id],["Cliente", sale.customer],["Fecha", sale.date],["Ítems", sale.items]].map(([l,v]) => (
            <div key={l} className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-500 mb-0.5">{l}</p>
              <p className="text-sm font-medium text-gray-800">{v}</p>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-1">Productos</p>
          {sale.products.map((p, i) => <p key={i} className="text-sm text-gray-700">• {p}</p>)}
        </div>
        <div className="flex items-center justify-between bg-indigo-50 rounded-xl p-3">
          <span className="text-sm font-medium text-indigo-700">Total</span>
          <span className="text-lg font-bold text-indigo-700">{fmt(sale.total)}</span>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Estado</label>
          <select value={sale.status} onChange={(e) => onStatusChange(sale.id, e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition appearance-none">
            <option value="pendiente">Pendiente</option>
            <option value="en camino">En camino</option>
            <option value="completada">Completada</option>
            <option value="cancelada">Cancelada</option>
          </select>
        </div>
      </div>
      <button onClick={onClose} className="w-full mt-5 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition">Cerrar</button>
    </>
  );
}

export default function SalesView({ sales, setSales }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("todas");
  const [selected, setSelected] = useState(null);

  const filtered = sales.filter(s => {
    const matchSearch = s.customer.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "todas" || s.status === filter;
    return matchSearch && matchFilter;
  });

  const handleStatusChange = (id, status) => {
    setSales(prev => prev.map(s => s.id === id ? { ...s, status } : s));
    setSelected(prev => prev ? { ...prev, status } : prev);
  };

  const filters = ["todas", "pendiente", "en camino", "completada", "cancelada"];
  const totalFiltered = filtered.reduce((a, s) => a + s.total, 0);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Ventas</h2>
        <p className="text-sm text-gray-500 mt-0.5">{sales.length} órdenes registradas</p>
      </div>

      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2">{Icon.search("w-4 h-4 text-gray-400")}</span>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por cliente o ID..."
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition ${filter === f ? "bg-indigo-600 text-white shadow-sm" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              {["Orden","Cliente","Fecha","Ítems","Total","Estado",""].map((h,i) => (
                <th key={i} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(s => (
              <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-gray-500">{s.id}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{s.customer}</td>
                <td className="px-4 py-3 text-gray-500">{s.date}</td>
                <td className="px-4 py-3 text-gray-600">{s.items}</td>
                <td className="px-4 py-3 font-semibold text-gray-900">{fmt(s.total)}</td>
                <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                <td className="px-4 py-3">
                  <button onClick={() => setSelected(s)} className="p-1.5 rounded-lg hover:bg-indigo-50 text-gray-400 hover:text-indigo-600 transition">
                    {Icon.eye("w-4 h-4")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <Modal title={`Orden ${selected.id}`} onClose={() => setSelected(null)}>
          <SaleDetail sale={selected} onClose={() => setSelected(null)} onStatusChange={handleStatusChange} />
        </Modal>
      )}
    </div>
  );
}