import Header from "@/app/components/header";
import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartButtons from "./add-to-cart-buttons";
import { products } from "@/app/lib/products";

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === Number(id));

  if (!product) return notFound();

  return (
    <>
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10">
        {/* Imagen */}
        <div className="relative w-full h-[500px] rounded-xl overflow-hidden bg-[#faf7f7]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">
            {product.name}
          </h1>
          <p className="text-2xl font-medium mb-6">{product.price}</p>
          <p className="text-gray-600 mb-8">{product.description}</p>

          <AddToCartButtons
            product={{
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              sizes: product.sizes,
            }}
          />
        </div>
      </main>
    </>
  );
}