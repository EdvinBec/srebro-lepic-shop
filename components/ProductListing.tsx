"use client";

import React, { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icons } from "./Icons";
import { formatCurrency } from "@/lib/formatters";
import ImageSlider from "./ImageSlider";
import Price from "./Price";

type Props = {
  product: Product | null;
  index: number;
};

type Product = {
  id: string;
  name: string;
  image: string[];
  priceInCents: number;
  oldPrice: number;
};

const ProductListing = ({ index, product }: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  if (!product || !isVisible) return <ProductPlaceHolder />;

  if (product && isVisible) {
    return (
      <Link
        className={cn("invisible h-full w-full cursor-pointer group/main", {
          "visible animate-in fade-in-5": isVisible,
        })}
        href={`/products/${product.id}`}
      >
        <div className="flex flex-col items-start w-full">
          <ImageSlider urls={product.image} />

          <Icons.logo className="w-auto h-5 mt-3" />
          <h3 className="mt-1 font-medium text-sm text-gray-700 ">
            {product.name}
          </h3>
          <Price oldPrice={product.oldPrice} price={product.priceInCents} />
        </div>
      </Link>
    );
  }
};

const ProductPlaceHolder = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-sm">
        <Skeleton className="h-full w-full" />
      </div>
      <Skeleton className="mt-4 w-2/3 h-4 rounded-sm" />
      <Skeleton className="mt-2 w-16 h-4 rounded-sm" />
      <Skeleton className="mt-2 w-16 h-4 rounded-sm" />
    </div>
  );
};

export default ProductListing;
