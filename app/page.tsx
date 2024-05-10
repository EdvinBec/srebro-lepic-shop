import Heading from "@/components/Heading";
import HeroSection from "@/components/HeroSection";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductsCarousel from "@/components/ProductsCarousel";

import Roza from "@/public/assets/Roza.jpg";
import { Product } from "@/types";

const Products: Product[] = [
  {
    imageURL: Roza,
    title: "SLRO - Srebro Lepić sa posvetom",
    price: "29,90 KM",
    url: "/",
  },
  {
    imageURL: Roza,
    title: "SLRO - Srebro Lepić sa posvetom",
    price: "59,90 KM",
    url: "/",
  },
  {
    imageURL: Roza,
    title: "SLRO - Srebro Lepić sa posvetom",
    price: "29,90 KM",
    url: "/",
  },
  {
    imageURL: Roza,
    title: "SLRO - Srebro Lepić sa posvetom",
    price: "59,90 KM",
    url: "/",
  },
  {
    imageURL: Roza,
    title: "SLRO - Srebro Lepić sa posvetom",
    price: "29,90 KM",
    url: "/",
  },
  {
    imageURL: Roza,
    title: "SLRO - Srebro Lepić sa posvetom",
    price: "59,90 KM",
    url: "/",
  },
];

export default function Home() {
  return (
    <div className="bg-slate-50">
      <HeroSection />
      <MaxWidthWrapper>
        <section>
          <Heading className="mt-10 md:mt-16">Naše preporuke</Heading>
          <ProductsCarousel Products={Products} />
        </section>
      </MaxWidthWrapper>
    </div>
  );
}
