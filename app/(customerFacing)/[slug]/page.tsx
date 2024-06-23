import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import db from "@/db/db";
import { Product } from "@prisma/client";
import Image from "next/image";
import React from "react";

import Logo from "@/public/assets/logo.svg";
import { formatCurrency, formatWeight } from "@/lib/formatters";
import { Label } from "@/components/ui/label";
import AddToCart from "./_components/AddToCart";
import { Truck } from "lucide-react";

type Props = {
  params: {
    slug: string;
  };
};

const page = async ({ params: { slug } }: Props) => {
  const product: Product | null = await db.product.findUnique({
    where: {
      id: slug,
    },
  });

  return (
    <MaxWidthWrapper className=" text-darkGray py-8">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex gap-5">
          <div className="xl:flex flex-col gap-4 hidden ">
            <Image
              alt={product?.name!}
              src={product?.image!}
              width={150}
              height={90}
            />
            <Image
              alt={product?.name!}
              src={product?.image!}
              width={150}
              height={90}
            />
            <Image
              alt={product?.name!}
              src={product?.image!}
              width={150}
              height={90}
            />
          </div>
          <Image
            alt={product?.name!}
            src={product?.image!}
            width={600}
            height={500}
            className="max-h-[500px]"
          />
        </div>
        <div className="flex flex-col justify-between w-full md:max-w-96">
          <div>
            <Image src={Logo} alt="Logo" />
            <h2 className="mt-2 font-semibold text-2xl">{product?.name}</h2>

            <div className="mt-5 flex items-end gap-2">
              <Label className="text-xl font-normal">
                {formatCurrency(product?.priceInCents!)}
              </Label>
              <Label className="text-sm opacity-80 font-normal mb-[2px]">
                PDV je uključen
              </Label>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <AddToCart
              id={slug!}
              className="mt-12"
              availableSizes={product?.availableSizes!}
              product={product!}
            />

            <div>
              <div className="border-[1px] px-4 py-3 text-sm">
                Izrada i priprema{" "}
                <span className="text-accentYellow font-medium">
                  Srebro Lepić
                </span>
              </div>
              <div className="border-[1px] border-t-0 px-4 py-3">
                <Truck size={24} />
                <div className="mt-3">
                  <Label className="text-sm">Dostava u roku 2 - 5 dana</Label>
                  <Label className="text-sm block font-normal opacity-80">
                    Standardna dostava
                  </Label>
                </div>
              </div>
              <div className="border-[1px] border-t-0 px-4 py-3">
                <Label className="text-sm">Material</Label>
                <Label className="text-sm block font-normal opacity-80">
                  Zlato {formatWeight(product?.weightInGrams!)}
                </Label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="font-bold text-2xl">Opis proizvoda</h2>
        <p className="text-sm">{product?.description}</p>
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
