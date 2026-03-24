"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import Header from "../components/header";
import { getProducts } from "../lib/api/products";

function ProductosContent() {
  const searchParams = useSearchParams();

  const [genderFilter, setGenderFilter] = useState<string>("both");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 👉 leer params de URL
  useEffect(() => {
    const typeFromUrl = searchParams.get("type");
    const genderFromUrl = searchParams.get("gender");

    if (typeFromUrl) setTypeFilter(typeFromUrl.toLowerCase());
    if (genderFromUrl) setGenderFilter(genderFromUrl);
    else setGenderFilter("both");
  }, [searchParams]);

  // 👉 traer productos del backend
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();

        console.log("PRODUCTOS BACK:", data);

        const normalized = data.map((p: any) => ({
          ...p,
          type: p.category ? p.category.toLowerCase() : "", // 🔥 CLAVE
          gender: "both",
        }));

        setProducts(normalized);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // 👉 filtro CORREGIDO
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const genderMatch =
        genderFilter === "both" ? true : p.gender === genderFilter;

      const typeMatch =
        !typeFilter || p.type === typeFilter;

      const searchMatch = p.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      return genderMatch && typeMatch && searchMatch;
    });
  }, [products, genderFilter, typeFilter, search]);

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
          {/* SIDEBAR */}
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
              {loading ? (
                <p className="text-gray-500">Cargando productos...</p>
              ) : filteredProducts.length === 0 ? (
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
                          src={product.image || "/placeholder.png"}
                          alt={product.name}
                          fill
                          unoptimized // 🔥 evita error de dominios externos
                          className="object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="p-4">
                        <h3 className="font-semibold text-lg">
                          {product.name}
                        </h3>

                        <p className="text-gray-600">
                          ${Number(product.price).toLocaleString("es-AR")}
                        </p>

                        <span className="text-sm text-gray-400 capitalize">
                          {product.type || "sin categoría"}
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

      {/* MOBILE FILTERS */}
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

// skeleton
function ProductosSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="h-9 w-40 bg-gray-200 rounded-lg mb-8 animate-pulse" />
      <div className="h-12 bg-gray-200 rounded-lg mb-6 animate-pulse" />
    </div>
  );
}

// filtros
function Filters({
  genderFilter,
  typeFilter,
  setGenderFilter,
  setTypeFilter,
  clearFilters,
  closeFilters,
}: any) {
  return (
    <div className="space-y-6 mt-12">
      <h2 className="text-xl font-semibold">Filtros</h2>

      <div className="flex flex-col gap-2">
        {["buzos", "remeras", "zapatillas", "vestidos"].map((type) => (
          <button
            key={type}
            onClick={() => {
              setTypeFilter(type);
              closeFilters?.();
            }}
            className={`px-3 py-2 rounded-md ${
              typeFilter === type
                ? "bg-black text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {type}
          </button>
        ))}
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