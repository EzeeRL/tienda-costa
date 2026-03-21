"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import Header from "../components/header";
import { products } from "@/app/lib/products";

// ─── Inner component that uses useSearchParams ────────────────────────────────
function ProductosContent() {
  const searchParams = useSearchParams();

  const [genderFilter, setGenderFilter] = useState<string>("both");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const typeFromUrl = searchParams.get("type");
    const genderFromUrl = searchParams.get("gender");

    if (typeFromUrl) setTypeFilter(typeFromUrl);
    if (genderFromUrl) setGenderFilter(genderFromUrl);
    else setGenderFilter("both");
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const genderMatch =
        genderFilter === "both" ? true : p.gender === genderFilter;
      const typeMatch = typeFilter ? p.type === typeFilter : true;
      const searchMatch = p.name.toLowerCase().includes(search.toLowerCase());
      return genderMatch && typeMatch && searchMatch;
    });
  }, [genderFilter, typeFilter, search]);

  const clearFilters = () => {
    setGenderFilter("both");
    setTypeFilter(null);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">Productos</h1>

        {/* BUSCADOR */}
        <div className="mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black bg-white"
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
                <p className="text-gray-500">
                  No hay productos con esos filtros.
                </p>
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

// ─── Page — wraps content in Suspense (required for useSearchParams) ──────────
export default function ProductosPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<ProductosSkeleton />}>
        <ProductosContent />
      </Suspense>
    </>
  );
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────
function ProductosSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="h-9 w-40 bg-gray-200 rounded-lg mb-8 animate-pulse" />
      <div className="h-12 bg-gray-200 rounded-lg mb-6 animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="h-64 bg-gray-200 animate-pulse" />
            <div className="p-4 space-y-2">
              <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Filters component ────────────────────────────────────────────────────────
function Filters({
  genderFilter,
  typeFilter,
  setGenderFilter,
  setTypeFilter,
  clearFilters,
  closeFilters,
}: {
  genderFilter: string;
  typeFilter: string | null;
  setGenderFilter: (v: string) => void;
  setTypeFilter: (v: string | null) => void;
  clearFilters: () => void;
  closeFilters?: () => void;
}) {
  const genders = [
    { value: "both", label: "Ambos" },
    { value: "men", label: "Hombre" },
    { value: "women", label: "Mujer" },
    { value: "kids", label: "Niños" },
  ];

  return (
    <div className="space-y-8 mt-12">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Categorías</h2>
        {closeFilters && (
          <button
            onClick={closeFilters}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* GÉNERO */}
      <div>
        <h3 className="font-medium mb-3">Género</h3>
        <div className="flex flex-col gap-2">
          {genders.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => {
                setGenderFilter(value);
                closeFilters?.();
              }}
              className={`text-left px-3 py-2 rounded-md ${
                genderFilter === value
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* TIPO */}
      <div>
        <h3 className="font-medium mb-3">Tipo</h3>
        <div className="flex flex-col gap-2">
          {["buzos", "remeras", "zapatillas", "vestidos"].map((type) => (
            <button
              key={type}
              onClick={() => {
                setTypeFilter(type);
                closeFilters?.();
              }}
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
        onClick={() => {
          clearFilters();
          closeFilters?.();
        }}
        className="w-full bg-black text-white py-2 rounded-md"
      >
        Limpiar filtros
      </button>
    </div>
  );
}