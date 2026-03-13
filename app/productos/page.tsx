"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { X } from "lucide-react";
import Header from "../components/header";
import { products } from "@/app/lib/products";

export default function ProductosPage() {
  const [genderFilter, setGenderFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const genderMatch = genderFilter ? p.gender === genderFilter : true;
      const typeMatch = typeFilter ? p.type === typeFilter : true;
      const searchMatch = p.name.toLowerCase().includes(search.toLowerCase());
      return genderMatch && typeMatch && searchMatch;
    });
  }, [genderFilter, typeFilter, search]);

  const clearFilters = () => {
    setGenderFilter(null);
    setTypeFilter(null);
  };

  return (
    <>
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">Productos</h1>

        {/* BUSCADOR */}
        <div className="sticky top-24 bg-white z-20 pb-6">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="md:hidden border border-gray-300 px-4 rounded-lg hover:bg-gray-100 transition"
            >
              Filtros
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* SIDEBAR DESKTOP */}
          <aside className="hidden md:block w-64">
            <div className="sticky top-28 border-r border-gray-200 pr-4">
              <Filters
                genderFilter={genderFilter}
                typeFilter={typeFilter}
                setGenderFilter={setGenderFilter}
                setTypeFilter={setTypeFilter}
                clearFilters={clearFilters}
              />
            </div>
          </aside>

          {/* PRODUCTOS */}
          <section className="flex-1 flex flex-col h-[calc(100vh-220px)]">
            <div className="overflow-y-auto pr-2 flex-1">
              {filteredProducts.length === 0 ? (
                <p className="text-gray-500">No hay productos con esos filtros.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/producto/${product.id}`}
                      className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition"
                    >
                      <div className="relative w-full h-64 bg-[#faf7f7]">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <p className="text-gray-600 mt-1">{product.price}</p>
                        <span className="text-sm text-gray-400 capitalize">
                          {product.type}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* FILTROS MOBILE */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          mobileFiltersOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          onClick={() => setMobileFiltersOpen(false)}
          className="absolute inset-0 bg-black/40"
        />
        <div
          className={`absolute top-0 left-0 h-full w-72 bg-white p-6 transform transition-transform duration-300 ${
            mobileFiltersOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Filters
            genderFilter={genderFilter}
            typeFilter={typeFilter}
            setGenderFilter={setGenderFilter}
            setTypeFilter={setTypeFilter}
            clearFilters={clearFilters}
            closeFilters={() => setMobileFiltersOpen(false)}
          />
        </div>
      </div>
    </>
  );
}

function Filters({
  genderFilter,
  typeFilter,
  setGenderFilter,
  setTypeFilter,
  clearFilters,
  closeFilters,
}: any) {
  return (
    <div className="space-y-8 mt-12">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Categorías</h2>
        {closeFilters && (
          <button onClick={closeFilters} className="p-2 rounded-md hover:bg-gray-100">
            <X size={20} />
          </button>
        )}
      </div>

      {/* GENERO */}
      <div>
        <h3 className="font-medium mb-3">Género</h3>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => { setGenderFilter("men"); closeFilters?.(); }}
            className={`text-left px-3 py-2 rounded-md ${
              genderFilter === "men" ? "bg-black text-white" : "hover:bg-gray-100"
            }`}
          >
            Hombre
          </button>
          <button
            onClick={() => { setGenderFilter("women"); closeFilters?.(); }}
            className={`text-left px-3 py-2 rounded-md ${
              genderFilter === "women" ? "bg-black text-white" : "hover:bg-gray-100"
            }`}
          >
            Mujer
          </button>
        </div>
      </div>

      {/* TIPO */}
      <div>
        <h3 className="font-medium mb-3">Tipo</h3>
        <div className="flex flex-col gap-2">
          {["buzos", "remeras", "zapatillas", "vestidos"].map((type) => (
            <button
              key={type}
              onClick={() => { setTypeFilter(type); closeFilters?.(); }}
              className={`text-left px-3 py-2 rounded-md capitalize ${
                typeFilter === type ? "bg-black text-white" : "hover:bg-gray-100"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => { clearFilters(); closeFilters?.(); }}
        className="w-full bg-black text-white py-2 rounded-md"
      >
        Limpiar filtros
      </button>
    </div>
  );
}