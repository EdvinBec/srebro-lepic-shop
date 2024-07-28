import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import db from "@/db/db";
import React from "react";

import Link from "next/link";
import { Icons } from "@/components/Icons";
import { notFound } from "next/navigation";
import { formatCurrency } from "@/lib/formatters";
import { PRODUCT_CATEGORIES } from "@/config";
import { CheckIcon, ShieldIcon, TruckIcon } from "lucide-react";
import ImageSlider from "@/components/ImageSlider";
import ProductReel from "@/components/ProductReel";
import AddToCart from "./_components/AddToCart";
import { cn } from "@/lib/utils";
import Price from "@/components/Price";

type Props = {
  params: {
    slug: string;
  };
};

const BREADCRUMBS = [{ id: 1, name: "Početak", href: "/" }];

const page = async ({ params: { slug } }: Props) => {
  const product = await db.product.findUnique({
    where: { id: slug },
    select: {
      id: true,
      name: true,
      image: true,
      priceInCents: true,
      oldPrice: true,
      availableSizes: true,
      weightInGrams: true,
      description: true,
      category: true,
    },
  });

  if (!product) {
    return notFound();
  }

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product?.category
  )?.label;

  return (
    <MaxWidthWrapper className="text-darkGray">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-20 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:max-w-lg lg:self-end">
            <ol className="flex items-center space-x-2">
              {BREADCRUMBS.map((item, i) => {
                return (
                  <li key={i}>
                    <div className="flex items-center text-sm">
                      <Link
                        href={item.href}
                        className="font-medium text-sm text-muted-foreground hover:text-gray-900"
                      >
                        {item.name}
                      </Link>
                      {i !== BREADCRUMBS.length - 1 ? (
                        <Icons.breadcrumbIcon />
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className="mt-4">
              <h1 className="text-3xl tracking-tight font-bold text-gray-900 sm:text-4xl">
                {product.name}
              </h1>
            </div>

            <section className="mt-4">
              <div className="flex items-center">
                <Price
                  className="-mt-1"
                  oldPrice={product.oldPrice}
                  price={product.priceInCents}
                />

                <div className="ml-4 border-l text-muted-foreground border-gray-300 pl-4">
                  {label}
                </div>
              </div>

              <div className="mt-4 space-y-6">
                <p className="text-base text-muted-foreground">
                  {product.description}
                </p>
              </div>

              <div className="mt-6 flex items-center">
                <CheckIcon
                  aria-hidden="true"
                  className="h-5 w-5 flex-shrink-0 text-green-500"
                />
                <p className="ml-2 text-sm text-muted-foreground">
                  Odmah dostupno za dostavu
                </p>
              </div>
            </section>
          </div>

          <div className="lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
            <div className="aspect-square rounded-[4px] mt-4 md:mt-0">
              <ImageSlider urls={product.image} />
            </div>
          </div>

          <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
            <div>
              <div className="mt-10">
                <AddToCart
                  availableSizes={product.availableSizes}
                  id={product.id}
                  product={product}
                />
              </div>
            </div>
            <div className="mt-6 text-center">
              <div className="group inline-flex items-center text-sm font-medium">
                <TruckIcon
                  aria-hidden="true"
                  className="h-5 w-5 flex-shring-0 text-gray-500 mr-2"
                />
                <span className="text-muted-foreground hover:text-gray-700">
                  Dostava u roku od 2 - 5 dana
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductReel
        limit={4}
        href={`/${product.category}`}
        title="Slični proizvodi"
        subtitle="Pogledajte naše ostale slične proizvode"
        category={product.category}
      />
    </MaxWidthWrapper>
  );
};

export default page;
