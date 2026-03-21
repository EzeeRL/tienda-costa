"use client";
import { Icon, fmt, StatusBadge } from "./shared";

export default function DashboardView({ products, sales }) {
  const totalRevenue = sales.filter(s => s.status === "completada").reduce((a, s) => a + s.total, 0);
  const totalOrders = sales.length;
  const activeProducts = products.filter(p => p.status === "activo").length;
  const lowStock = products.filter(p => p.stock > 0 && p.stock < 10).length;

  const stats = [
    { label: "Ingresos Totales", value: fmt(totalRevenue), icon: Icon.trending, color: "bg-emerald-500", light: "bg-emerald-50 text-emerald-600" },
    { label: "Órdenes", value: totalOrders, icon: Icon.chart, color: "bg-indigo-500", light: "bg-indigo-50 text-indigo-600" },
    { label: "Productos Activos", value: activeProducts, icon: Icon.box, color: "bg-violet-500", light: "bg-violet-50 text-violet-600" },
    { label: "Stock Bajo", value: lowStock, icon: Icon.warning, color: "bg-amber-500", light: "bg-amber-50 text-amber-600" },
  ];

  const recent = sales.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-sm text-gray-500 mt-0.5">Resumen general del negocio</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className={`inline-flex p-2 rounded-xl ${s.light} mb-3`}>
              {s.icon("w-4 h-4")}
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-800">Últimas órdenes</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {recent.map((s) => (
              <div key={s.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-gray-800">{s.customer}</p>
                  <p className="text-xs text-gray-400">{s.id} · {s.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{fmt(s.total)}</p>
                  <StatusBadge status={s.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-800">Stock crítico</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {products.filter(p => p.stock < 15).map((p) => (
              <div key={p.id} className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  {p.image ? (
                    <img src={p.image} alt={p.name} className="w-8 h-8 rounded-lg object-cover bg-gray-100" />
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">{Icon.box("w-4 h-4 text-gray-400")}</div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-800">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.sku}</p>
                  </div>
                </div>
                <span className={`text-sm font-bold ${p.stock === 0 ? "text-red-600" : "text-amber-600"}`}>
                  {p.stock === 0 ? "SIN STOCK" : `${p.stock} uds`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}