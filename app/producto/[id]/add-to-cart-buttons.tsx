"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/carrito/carrito-context";

type Props = {
  product: {
    id: number;
    name: string;
    price: string;
    image: string;
    sizes: string[];
  };
};

export default function AddToCartButtons({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAdd = () => {
    if (!selectedSize) {
      setError(true);
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
    });
    router.push("/carrito");
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setError(true);
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
    });
    router.push("/carrito");
  };

  return (
    <>
      {/* Talles */}
      <div className="mb-8">
        <h3 className="font-medium mb-3">Talles disponibles</h3>
        <div className="flex flex-wrap gap-3">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => { setSelectedSize(size); setError(false); }}
              className={`border px-4 py-2 transition-colors rounded-sm ${
                selectedSize === size
                  ? "bg-black text-white"
                  : "hover:bg-black hover:text-white"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-2">Seleccioná un talle</p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={handleAdd}
          className="bg-black text-white py-3 font-medium hover:scale-105 transition-transform rounded-sm"
        >
          Agregar al carrito
        </button>

        <button
          onClick={handleBuyNow}
          className="border border-black py-3 font-medium hover:bg-gray-100 transition-colors rounded-sm"
        >
          Comprar ahora
        </button>
      </div>
    </>
  );
}