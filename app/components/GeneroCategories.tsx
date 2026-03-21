"use client";

import { useRouter } from "next/navigation";
import "./GeneroCategories.css";

const categorias = [
  { imagen: "/Modelos/hombres.jpg", label: "Hombre", gender: "men" },
  { imagen: "/Modelos/mujeres.jpeg", label: "Mujer", gender: "women" },
  { imagen: "/Modelos/niños.jpg", label: "Niños", gender: "kids" },
];

export default function GeneroCategories() {
  const router = useRouter();

  const handleRedirect = (gender: string) => {
    router.push(`/productos?gender=${gender}`);
  };

  return (
    <section className="w-full px-4 py-8 md:px-8 section-general">
      <div className="flex flex-col gap-3 md:flex-row">
        {categorias.map((cat, i) => (
          <div
            key={i}
            onClick={() => handleRedirect(cat.gender)}
            className="group relative cursor-pointer overflow-hidden flex-1 aspect-[3/4] md:aspect-auto md:h-[580px]"
          >
            <img
              src={cat.imagen}
              alt={cat.label}
              className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 rounded-lg"
            />

            {/* Gradiente parte inferior */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            <div className="absolute bottom-4 left-4">
              <span className="flex rounded-full bg-white text-base font-semibold text-black tracking-wide shadow-md transition-all duration-300 group-hover:bg-black group-hover:text-white w-[110px] h-[40px] flex justify-center items-center p-1">
                {cat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
