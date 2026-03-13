"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function HeroCarousel() {
  const images = [
    "/Banners/banner-1.jpg",
    "/Banners/banner-2.jpg",
    "/Banners/banner-3.jpg",
  ];

  return (
    <section className="w-full h-[60vh] md:h-[80vh]">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="w-full h-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={src}
                alt={`Banner ${index + 1}`}
                fill
                priority={index === 0}
                className="object-cover blur-[2px]"
              />

              {/* Overlay oscuro */}
              <div className="absolute inset-0 bg-black/30" />

              {/* Texto opcional */}
              <div className="absolute inset-0 flex flex-col items-start justify-center px-6 md:px-20 text-white">
                <h2 className="text-3xl md:text-5xl font-semibold mb-4">
                  Nueva Colección
                </h2>
                <p className="text-sm md:text-lg mb-6">
                  Descubrí lo último en tendencia
                </p>
                <button className="bg-white text-black px-6 py-3 font-medium hover:scale-105 hover:cursor-pointer transition-transform rounded-md">
                  Ver colección
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
