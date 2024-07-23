import React from "react";
import { Icons } from "./Icons";
import Link from "next/link";
import db from "@/db/db";
import ProductListing from "./ProductListing";

type Props = {
  title: string;
  subtitle?: string;
  href?: string;
  category?: string;
  isFeatured?: boolean;
};

type ReelProductFilter = {
  isAvailabileForPurchase: boolean;
  category?: string;
  isFeatured?: boolean;
};

const ProductReel = async ({
  title,
  subtitle,
  href,
  category,
  isFeatured,
}: Props) => {
  let filterCondition: ReelProductFilter = {
    isAvailabileForPurchase: true,
  };

  if (category) {
    filterCondition = {
      ...filterCondition,
      category,
    };
  }

  if (isFeatured) {
    filterCondition = {
      ...filterCondition,
      isFeatured: true,
    };
  }

  const products = await db.product.findMany({
    take: 4,
    where: filterCondition,
    select: {
      id: true,
      image: true,
      name: true,
      priceInCents: true,
      oldPrice: true,
    },
  });

  return (
    <section className="py-12">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0 text-center md:text-start">
          {title ? (
            <div className="flex gap-6 justify-center md:justify-start">
              <Icons.star className="w-auto h-16 md:h-20" />
              <h1 className="font-boska uppercase font-bold text-gray-900 text-5xl">
                {title}
              </h1>
              <Icons.star className="w-auto h-16 md:h-20" />
            </div>
          ) : null}
          {subtitle ? (
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>

        {href ? (
          <Link
            href={`kategorija${href}`}
            className="hidden md:block text-sm text-yellow-600 hover:text-yellow-500"
          >
            Pogledajte cijelu kolekciju <span aria-hidden="true">&rarr;</span>
          </Link>
        ) : null}
      </div>

      <div className="relative">
        <div className="mt-6 flex items-center w-full">
          <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
            {products.map((item, i) => (
              <ProductListing index={i} product={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductReel;
