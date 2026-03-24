"use client";

import { useState, useEffect } from "react";
import DashboardView from "./DashboardView";
import ProductsView from "./ProductsView";
import SalesView from "./SalesView";
import { INITIAL_SALES, Icon } from "./shared";
import { getProducts } from "../lib/api/products"

export default function AdminPage() {
  const [view, setView] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState(INITIAL_SALES);

  const NAV_ITEMS = [
    { id: "dashboard", label: "Dashboard", icon: Icon.dashboard },
    { id: "products", label: "Productos", icon: Icon.box },
    { id: "sales", label: "Ventas", icon: Icon.chart },
  ];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();

        // 🔥 normalizamos para tu UI
        const normalized = data.map((p) => ({
          ...p,
          sku: p.id,
          status: p.stock === 0 ? "sin stock" : "activo",
        }));

        setProducts(normalized);
      } catch (error) {
        console.error(error);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 flex gap-2 overflow-x-auto">
          {NAV_ITEMS.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setView(id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                view === id 
                  ? "bg-indigo-600 text-white shadow-md" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {icon("w-4 h-4")}
              {label}
            </button>
          ))}
        </div>

        <div className="bg-white/50 rounded-3xl">
          {view === "dashboard" && <DashboardView products={products} sales={sales} />}
          {view === "products" && <ProductsView products={products} setProducts={setProducts} />}
          {view === "sales" && <SalesView sales={sales} setSales={setSales} />}
        </div>
      </div>
    </div>
  );
}