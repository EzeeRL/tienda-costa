"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function ProductCarousel() {
  const products = [
    {
      id: 1,
      image: "/Productos/Destacados/b-3.png",
      name: "Buzos",
      gender: "men",
      type: "buzos",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 3,
      image: "/Productos/Destacados/r-1.png",
      name: "Remeras",
      gender: "men",
      type: "remeras",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 5,
      image: "/Productos/Destacados/v-3.png",
      name: "Vestidos",
      gender: "women",
      type: "vestidos",
      sizes: ["S", "M", "L"],
    },
    {
      id: 8,
      image: "/Productos/Destacados/z-4.png",
      name: "Zapatillas",
      gender: "women",
      type: "zapatillas",
      sizes: ["36", "37", "38", "39", "40"],
    },
  ];

  return (
    <section className="py-16 px-4 md:px-12">
      <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">
        Categorías
      </h2>

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
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="group rounded-lg overflow-hidden bg-[#faf7f7] hover:shadow-lg transition-shadow">
              <div className="relative w-full h-80 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4">
                <h3 className="font-medium text-2xl text-center">
                  {product.name}
                </h3>

                {/* BOTÓN QUE REDIRIGE CON FILTRO */}
                <Link href={`/productos?type=${product.type}`}>
                  <button className="mt-4 w-full border border-gray-300 py-2 text-lg font-medium hover:bg-black hover:text-white hover:cursor-pointer transition-colors rounded-sm bg-white">
                    Ver más
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
