import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Logo from "@/public/assets/logo.svg";
import Link from "next/link";
import { formatCurrency } from "@/lib/formatters";
import { Product } from "@prisma/client";
import db from "@/db/db";
import { cn } from "@/lib/utils";

type Props = {
  category?: string;
  className?: string;
  featured?: boolean;
};

const ProductsCarousel = async ({ category, className, featured }: Props) => {
  const Products = await db.product.findMany({
    where: { isAvailabileForPurchase: true },
  });

  let filteredProducts =
    (category &&
      Products.filter((item: Product) => item.category === category)) ||
    Products;

  if (featured) {
    filteredProducts = filteredProducts.filter(
      (item: Product) => item.isFeatured
    );
  }

  return (
    <Carousel
      className={cn("w-full max-w-[90%] mx-auto mt-4 text-darkGray", className)}
    >
      <CarouselContent>
        {filteredProducts.map((item: Product, itemIdx: number) => {
          return (
            <CarouselItem
              key={itemIdx}
              className="md:basis-1/2 lg:basis-1/3 md:block flex justify-center hover:opacity-85 hover:shadow-md transition-all duration-200"
            >
              <Link href={`/${item.id}`}>
                <div className="bg-white p-5 rounded-[1px] shadow-sm ">
                  <Image
                    src={item.image[0]}
                    alt={item.name}
                    height={200}
                    width={300}
                    className="object-cover rounded-[1px] h-[200px] w-[300px]"
                  />
                  <Image src={Logo} alt="logo" height={17} className="mt-2.5" />
                  <h3 className="text-sm mt-1.5">{item.name}</h3>
                  <div className="flex items-center gap-2 mt-2.5">
                    <p
                      className={`${
                        item.oldPrice != 0 && "text-destructive font-bold"
                      }`}
                    >
                      {formatCurrency(item.priceInCents)}
                    </p>
                    <p
                      className={`mt-1  ${
                        item.oldPrice != 0 ? "text-xs block" : "hidden"
                      }`}
                    >
                      {formatCurrency(item.oldPrice)}
                    </p>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="ml-5 md:ml-0" />
      <CarouselNext className="mr-5 md:mr-0" />
    </Carousel>
  );
};

export default ProductsCarousel;
