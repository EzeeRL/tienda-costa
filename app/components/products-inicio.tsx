"use client";

import { useRouter } from "next/navigation";
import "./products-inicio.css";

const categorias = [
  {
    imagen: "/Productos/Buzos/b-1.webp",
    label: "Nueva colección",
    titulo: "Buzos",
    type: "buzos",
  },
  {
    imagen: "/Productos/Remeras/r-1.png",
    label: "Esenciales",
    titulo: "Remeras",
    type: "remeras",
  },
  {
    imagen: "/Productos/Vestidos/v-3.webp",
    label: "Tendencias",
    titulo: "Vestidos",
    type: "vestidos",
  },
  {
    imagen: "/Productos/Zapatillas/z-1.webp",
    label: "Gym y entrenamiento",
    titulo: "Zapatillas",
    type: "zapatillas",
  },
];

export default function ProductosInicio() {
  const router = useRouter();

  const handleRedirect = (type: string) => {
    router.push(`/productos?type=${type}`);
  };

  return (
    <div className="grid-hero">
      {categorias.map((cat, i) => (
        <div
          key={i}
          className="card-hero cursor-pointer"
          onClick={() => handleRedirect(cat.type)}
        >
          <img src={cat.imagen} alt={cat.titulo} className="card-img" />

          <div className="card-gradient" />

          <div className="card-content">
            <h3 className="card-titulo">{cat.titulo}</h3>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRedirect(cat.type);
              }}
              className="card-btn"
            >
              Ver más
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
