import Image from "next/image";
import Header from "./components/header";
import HeroCarousel from "./components/HeroCarousel";
import ProductCarousel from "./components/product-carousel";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header></Header>
      <HeroCarousel></HeroCarousel>
      <ProductCarousel></ProductCarousel>
    </div>
  );
}
