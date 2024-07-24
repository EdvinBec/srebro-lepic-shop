"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { PRODUCT_CATEGORIES, deliveryFee } from "@/config";
import { useCart } from "@/hooks/use-cart";
import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { Check, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {};

const Page = ({}: Props) => {
  const { items, removeItem } = useCart();

  const cartTotal = items.reduce(
    (total, { product, quantity }) => total + product.priceInCents * quantity,
    0
  );

  return (
    <MaxWidthWrapper>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl pb-24 pt-8 lg:max-w-7xl">
          <h1 className="font-boska font-bold uppercase text-gray-900 sm:text-5xl text-3xl">
            Košara
          </h1>

          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <div
              className={cn("lg:col-span-7", {
                "rounded-sm border-2 border-dashed border-zinc-200 p-12":
                  items.length === 0,
              })}
            >
              <h2 className="sr-only">Proizvodi u tvojoj košari</h2>

              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center space-y-1">
                  <div
                    aria-hidden="true"
                    className="relative mb-4 h-40 w-40 flex items-center justify-center text-muted-foreground"
                  >
                    <p className="font-medium">Vaša košara je prazna</p>
                  </div>
                </div>
              ) : null}

              <ul
                className={cn({
                  "divide-y divige-gray-200 border-b boreder-t border-gray-200":
                    items.length > 0,
                })}
              >
                {items.map(({ product, quantity, size }) => {
                  const image = product.image[0];

                  return (
                    <li key={product.id} className="flex py-6 sm:py-10">
                      <div className="flex-shrink-0">
                        <div className="relative h-32 w-32">
                          <Image
                            src={image}
                            alt="Product image"
                            fill
                            className="rounded-[4px] h-full w-full object-cover object-center sm:h-48 sm:w-48"
                          />
                        </div>
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <Link
                                  className="font-medium text-gray-700 hover:text-gray-800"
                                  href={`/products/${product.id}`}
                                >
                                  {product.name}
                                </Link>
                              </h3>
                            </div>

                            <div className="mt-1 flex text-sm">
                              <p className="text-muted-foreground">
                                Količina: {quantity}
                              </p>
                            </div>
                            <div className="mt-1 flex text-sm">
                              <p className="text-muted-foreground">
                                Veličina: {size}
                              </p>
                            </div>

                            <p className="mt-1 text-sm font-medium text-gray-900">
                              {formatCurrency(product.priceInCents * quantity)}
                            </p>
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-9 w-20">
                            <div className="absolute right-0 top-0">
                              <Button
                                aria-label="remove product"
                                onClick={() => removeItem(product.id, size)}
                                variant="ghost"
                              >
                                <XIcon aria-hidden="true" className="w-5 h-5" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                          <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
                          <span className="text-muted-foreground text-sm">
                            Dostupno za dostavu
                          </span>
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <section className="mt-16 rounded-sm bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
              <h2 className="text-lg font-medium text-gray-900">Narudžba</h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Ukupna cijena proizvoda
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatCurrency(cartTotal)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>Dostava:</span>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  <span>{formatCurrency(deliveryFee)}</span>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="text-base font-medium text-gray-900">
                  Ukupna cijena
                </div>
                <div className="text-base font-medium text-gray-900">
                  {formatCurrency(cartTotal + deliveryFee)}
                </div>
              </div>
              <div className="mt-6">
                <Button className="w-full rounded-[4px]" size="lg">
                  Idi na plaćanje
                </Button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
