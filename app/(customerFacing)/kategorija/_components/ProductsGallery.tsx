import { formatCurrency } from "@/lib/formatters";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/public/assets/logo.svg";

type Props = {
  products: Product[];
};

const ProductsGallery = ({ products }: Props) => {
  return (
    <div className="mt-8 grid justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      {products.map((item: Product) => (
        <Link
          href={`/${item.id}`}
          key={item.id}
          className="p-2 hover:shadow-sm transition-all duration-200 hover:opacity-85"
        >
          <div>
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
      ))}
    </div>
  );
};

export default ProductsGallery;
