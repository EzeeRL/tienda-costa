"use client";

import Header from "@/app/components/header";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import AddToCartButtons from "./add-to-cart-buttons";
import { getProducts } from "@/app/lib/api/products";

export default function ProductDetail() {
  const params = useParams();
  const id = params.id;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProducts();

        // 🔥 buscar el producto en el array
        const found = data.find((p: any) => String(p.id) === String(id));

        if (!found) {
          setProduct(null);
        } else {
          setProduct(found);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="p-10">Cargando producto...</div>
      </>
    );
  }

  if (!product) return notFound();

  return (
    <>
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10">
        {/* Imagen */}
        <div className="relative w-full h-[500px] rounded-xl overflow-hidden bg-[#faf7f7]">
          <Image
            src={product.image || "/placeholder.png"}
            alt={product.name}
            fill
            unoptimized
            className="object-contain"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">
            {product.name}
          </h1>

          <p className="text-2xl font-medium mb-6">
            ${Number(product.price).toLocaleString("es-AR")}
          </p>

          <p className="text-gray-600 mb-8">
            {product.description || "Sin descripción"}
          </p>

          <AddToCartButtons
            product={{
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              sizes: product.sizes || [],
            }}
          />
        </div>
      </main>
    </>
  );
}