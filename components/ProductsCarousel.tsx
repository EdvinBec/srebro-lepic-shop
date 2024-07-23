import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import db from "@/db/db";
import { cn } from "@/lib/utils";
import ProductListing from "./ProductListing";

type Props = {
  category?: string;
  className?: string;
  featured?: boolean;
};

type CarouselProductFilter = {
  isAvailabileForPurchase: boolean;
  category?: string;
  isFeatured?: boolean;
};

const ProductsCarousel = async ({ category, className, featured }: Props) => {
  let filterCondition: CarouselProductFilter = {
    isAvailabileForPurchase: true,
  };

  if (category) {
    filterCondition = {
      ...filterCondition,
      category,
    };
  }

  if (featured) {
    filterCondition = {
      ...filterCondition,
      isFeatured: true,
    };
  }

  const products = await db.product.findMany({
    where: filterCondition,
    select: {
      id: true,
      category: true,
      isFeatured: true,
      image: true,
      name: true,
      priceInCents: true,
      oldPrice: true,
    },
  });

  return (
    <Carousel
      className={cn("w-full max-w-4xl mx-auto mt-4 text-darkGray", className)}
    >
      <CarouselContent>
        {products.map((item, i) => (
          <CarouselItem
            key={item.id}
            className="md:basis-1/2 lg:basis-1/3 md:block flex justify-center"
          >
            <ProductListing index={i} product={item} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-5 md:ml-0" />
      <CarouselNext className="mr-5 md:mr-0" />
    </Carousel>
  );
};

export default ProductsCarousel;
