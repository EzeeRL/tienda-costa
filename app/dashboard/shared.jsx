"use client";
import { useEffect } from "react";

export const INITIAL_PRODUCTS = [
  { id: 1, name: "Auriculares Pro X", sku: "AUD-001", category: "Electrónica", price: 129.99, stock: 42, status: "activo", image: "" },
  { id: 2, name: "Mochila Urban 30L", sku: "MOC-007", category: "Accesorios", price: 74.5, stock: 18, status: "activo", image: "" },
  { id: 3, name: "Teclado Mecánico TKL", sku: "TEC-014", category: "Electrónica", price: 89.0, stock: 0, status: "sin stock", image: "" },
  { id: 4, name: "Lámpara LED Escritorio", sku: "LAM-022", category: "Hogar", price: 39.99, stock: 65, status: "activo", image: "" },
  { id: 5, name: "Silla Ergonómica Plus", sku: "SIL-003", category: "Mobiliario", price: 349.0, stock: 7, status: "activo", image: "" },
  { id: 6, name: "Monitor 24\" FHD", sku: "MON-009", category: "Electrónica", price: 219.0, stock: 12, status: "activo", image: "" },
];

export const INITIAL_SALES = [
  { id: "ORD-2841", customer: "Valentina López", date: "2025-03-18", items: 3, total: 344.47, status: "completada", products: ["Auriculares Pro X", "Lámpara LED Escritorio"] },
  { id: "ORD-2840", customer: "Matías Fernández", date: "2025-03-18", items: 1, total: 349.0, status: "en camino", products: ["Silla Ergonómica Plus"] },
  { id: "ORD-2839", customer: "Sofía García", date: "2025-03-17", items: 2, total: 163.5, status: "completada", products: ["Mochila Urban 30L", "Lámpara LED Escritorio"] },
  { id: "ORD-2838", customer: "Nicolás Romero", date: "2025-03-17", items: 1, total: 89.0, status: "cancelada", products: ["Teclado Mecánico TKL"] },
];

export const CATEGORIES = ["Electrónica", "Accesorios", "Hogar", "Mobiliario", "Ropa", "Otros"];

export const Icon = {
  dashboard: (cls) => <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  box: (cls) => <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27,6.96 12,12.01 20.73,6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  chart: (cls) => <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  plus: (cls) => <svg className={cls} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  edit: (cls) => <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  trash: (cls) => <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><polyline points="3,6 5,6 21,6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>,
  close: (cls) => <svg className={cls} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  eye: (cls) => <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  search: (cls) => <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  trending: (cls) => <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/><polyline points="17,6 23,6 23,12"/></svg>,
  warning: (cls) => <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><triangle points=""/><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
};

export const fmt = (n) => `$${Number(n).toLocaleString("es-AR", { minimumFractionDigits: 2 })}`;

export const StatusBadge = ({ status }) => {
  const map = {
    activo: "bg-emerald-100 text-emerald-700",
    "sin stock": "bg-red-100 text-red-600",
    completada: "bg-emerald-100 text-emerald-700",
    "en camino": "bg-blue-100 text-blue-700",
    cancelada: "bg-red-100 text-red-600",
    pendiente: "bg-amber-100 text-amber-700",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${map[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
};

export function Modal({ title, onClose, children }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
            {Icon.close("w-4 h-4 text-gray-500")}
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}