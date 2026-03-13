export type Product = {
  id: number;
  image: string;
  name: string;
  price: string;
  gender: "men" | "women";
  type: "buzos" | "remeras" | "zapatillas" | "vestidos";
  description: string;
  sizes: string[];
};

export const products: Product[] = [
  {
    id: 1,
    image: "/Productos/Destacados/b-1.png",
    name: "Hoodie Urban Rojo",
    price: "$42.000",
    gender: "men",
    type: "buzos",
    description: "Hoodie de algodón con interior suave y capucha ajustable. Diseño urbano ideal para looks casuales y días frescos.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    image: "/Productos/Destacados/b-3.png",
    name: "Hoodie Brooklyn Gris",
    price: "$45.000",
    gender: "men",
    type: "buzos",
    description: "Buzo hoodie de estilo streetwear con estampa frontal. Corte cómodo y tejido abrigado para uso diario.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 3,
    image: "/Productos/Destacados/r-1.png",
    name: "Remera Classic Brown",
    price: "$18.000",
    gender: "men",
    type: "remeras",
    description: "Remera básica de algodón premium con calce regular. Perfecta para outfits minimalistas y versátiles.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 4,
    image: "/Productos/Destacados/r-5.png",
    name: "Remera Essential Black",
    price: "$19.000",
    gender: "men",
    type: "remeras",
    description: "Remera negra minimalista de algodón suave. Diseño limpio que combina fácilmente con cualquier look.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 5,
    image: "/Productos/Destacados/v-3.png",
    name: "Vestido Elegance Azul",
    price: "$36.000",
    gender: "women",
    type: "vestidos",
    description: "Vestido corto de diseño elegante con falda acampanada. Ideal para ocasiones especiales o salidas casuales.",
    sizes: ["S", "M", "L"],
  },
  {
    id: 6,
    image: "/Productos/Destacados/v-4.png",
    name: "Vestido Chic Negro",
    price: "$34.000",
    gender: "women",
    type: "vestidos",
    description: "Vestido negro de estilo moderno con tirantes finos. Diseño sofisticado y cómodo para eventos o salidas.",
    sizes: ["S", "M", "L"],
  },
  {
    id: 7,
    image: "/Productos/Destacados/z-2.png",
    name: "Zapatillas Street Classic",
    price: "$68.000",
    gender: "men",
    type: "zapatillas",
    description: "Zapatillas urbanas de diseño clásico con suela resistente. Perfectas para uso diario y estilo streetwear.",
    sizes: ["38", "39", "40", "41", "42", "43"],
  },
  {
    id: 8,
    image: "/Productos/Destacados/z-4.png",
    name: "Zapatillas Urban Green",
    price: "$72.000",
    gender: "women",
    type: "zapatillas",
    description: "Zapatillas modernas en tono verde con detalles contrastantes. Cómodas, livianas y perfectas para un look urbano.",
    sizes: ["36", "37", "38", "39", "40"],
  },
];