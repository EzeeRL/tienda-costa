"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function ProductCarousel() {
  const [genderFilter, setGenderFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  const products = [
    {
      id: 1,
      image: "/Productos/Destacados/b-1.png",
      name: "Hoodie Urban Rojo",
      price: "$42.000",
      gender: "men",
      type: "buzos",
      description:
        "Hoodie de algodón con interior suave y capucha ajustable. Diseño urbano ideal para looks casuales y días frescos.",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 2,
      image: "/Productos/Destacados/b-3.png",
      name: "Hoodie Brooklyn Gris",
      price: "$45.000",
      gender: "men",
      type: "buzos",
      description:
        "Buzo hoodie de estilo streetwear con estampa frontal. Corte cómodo y tejido abrigado para uso diario.",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 3,
      image: "/Productos/Destacados/r-1.png",
      name: "Remera Classic Brown",
      price: "$18.000",
      gender: "men",
      type: "remeras",
      description:
        "Remera básica de algodón premium con calce regular. Perfecta para outfits minimalistas y versátiles.",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 4,
      image: "/Productos/Destacados/r-5.png",
      name: "Remera Essential Black",
      price: "$19.000",
      gender: "men",
      type: "remeras",
      description:
        "Remera negra minimalista de algodón suave. Diseño limpio que combina fácilmente con cualquier look.",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 5,
      image: "/Productos/Destacados/v-3.png",
      name: "Vestido Elegance Azul",
      price: "$36.000",
      gender: "women",
      type: "vestidos",
      description:
        "Vestido corto de diseño elegante con falda acampanada. Ideal para ocasiones especiales o salidas casuales.",
      sizes: ["S", "M", "L"],
    },
    {
      id: 6,
      image: "/Productos/Destacados/v-4.png",
      name: "Vestido Chic Negro",
      price: "$34.000",
      gender: "women",
      type: "vestidos",
      description:
        "Vestido negro de estilo moderno con tirantes finos. Diseño sofisticado y cómodo para eventos o salidas.",
      sizes: ["S", "M", "L"],
    },
    {
      id: 7,
      image: "/Productos/Destacados/z-2.png",
      name: "Zapatillas Street Classic",
      price: "$68.000",
      gender: "men",
      type: "zapatillas",
      description:
        "Zapatillas urbanas de diseño clásico con suela resistente. Perfectas para uso diario y estilo streetwear.",
      sizes: ["38", "39", "40", "41", "42", "43"],
    },
    {
      id: 8,
      image: "/Productos/Destacados/z-4.png",
      name: "Zapatillas Urban Green",
      price: "$72.000",
      gender: "women",
      type: "zapatillas",
      description:
        "Zapatillas modernas en tono verde con detalles contrastantes. Cómodas, livianas y perfectas para un look urbano.",
      sizes: ["36", "37", "38", "39", "40"],
    },
  ];

  const filteredProducts = products.filter((product) => {
    const genderMatch = genderFilter ? product.gender === genderFilter : true;
    const typeMatch = typeFilter ? product.type === typeFilter : true;
    return genderMatch && typeMatch;
  });

  const clearFilters = () => {
    setGenderFilter(null);
    setTypeFilter(null);
  };

  return (
    <section className="py-16 px-4 md:px-12">
      <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">
        Productos Destacados
      </h2>

      {/* FILTROS */}
      <div className="flex flex-wrap justify-center gap-10 mb-4">
        {/* Genero */}
        <div className="flex gap-3">
          <button
            onClick={() => setGenderFilter("men")}
            className={`px-4 py-2 ${
              genderFilter === "men" ? "bg-black text-white rounded-md" : ""
            } hover:cursor-pointer`}
          >
            Hombre
          </button>

          <button
            onClick={() => setGenderFilter("women")}
            className={`px-4 py-2 ${
              genderFilter === "women" ? "bg-black text-white rounded-md" : ""
            } hover:cursor-pointer`}
          >
            Mujer
          </button>
        </div>

        {/* Tipo */}
        <div className="flex gap-3">
          <button
            onClick={() => setTypeFilter("buzos")}
            className={`px-4 py-2 ${
              typeFilter === "buzos" ? "bg-black text-white rounded-md" : ""
            } hover:cursor-pointer`}
          >
            Buzos
          </button>

          <button
            onClick={() => setTypeFilter("remeras")}
            className={`px-4 py-2 ${
              typeFilter === "remeras" ? "bg-black text-white rounded-md" : ""
            } hover:cursor-pointer`}
          >
            Remeras
          </button>

          <button
            onClick={() => setTypeFilter("zapatillas")}
            className={`px-4 py-2 ${
              typeFilter === "zapatillas" ? "bg-black text-white rounded-md" : ""
            } hover:cursor-pointer`}
          >
            Zapatillas
          </button>

          <button
            onClick={() => setTypeFilter("vestidos")}
            className={`px-4 py-2 ${
              typeFilter === "vestidos" ? "bg-black text-white rounded-md" : ""
            } hover:cursor-pointer`}
          >
            Vestidos
          </button>
        </div>
      </div>
      {/* Limpiar */}
      <div className="w-full flex items-center justify-center">
        <button
          onClick={clearFilters}
          className="px-4 py-2 hover:cursor-pointer transition mb-8"
        >
          Limpiar filtros
        </button>
      </div>

      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={20}
        navigation
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {filteredProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <Link href={`/producto/${product.id}`}>
              <div className="group rounded-lg overflow-hidden bg-[#faf7f7] hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative w-full h-80 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-medium text-lg">{product.name}</h3>
                  <p className="text-gray-500">{product.price}</p>

                  <button className="mt-4 w-full border border-gray-300 py-2 text-sm font-medium hover:bg-black hover:text-white transition-colors rounded-sm bg-white">
                    Ver producto
                  </button>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
