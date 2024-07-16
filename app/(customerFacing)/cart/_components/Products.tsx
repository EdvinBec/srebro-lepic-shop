"use client";

import { Label } from "@/components/ui/label";
import { CartContext, CartItem } from "@/lib/CartContext";
import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { Product } from "@prisma/client";
import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

type Props = {
  products: Product[];
  className?: string;
};

const Products = ({ products, className }: Props) => {
  const cartData = useContext(CartContext);
  const cart = cartData.items;

  return cart.length > 0 ? (
    <div className={cn(className, "border-[1px] px-4 md:px-8 py-8")}>
      <h1 className="font-bold text-2xl">Tvoja korpa</h1>
      {cart.map((item: CartItem) => {
        const product = products.find((product) => product.id === item.id);

        return (
          <ProductItem
            key={item.id}
            product={product!}
            size={item.size}
            quantity={item.quantity}
          />
        );
      })}
    </div>
  ) : (
    <h1 className="w-full mt-4">Nemate ništa u korpi</h1>
  );
};

const ProductItem = ({
  product,
  size,
}: {
  product: Product;
  size: number;
  quantity: number;
}) => {
  const cartData = useContext(CartContext);
  const quantity = cartData.getProductQuantity(product.id, size);

  return (
    <div className="flex justify-between my-4 py-2  transition-all ease-in-out duration-150">
      <div className="flex items-center md:items-stretch gap-5">
        <div className="relative h-24 w-24 flex items-center overflow-hidden">
          <Image
            src={product!.image[0]}
            alt={product!.name}
            width={120}
            height={100}
            layout="responsive"
            className="w-[50px] h-[50px] md:w-[120px] md:h-[100px]"
          />
        </div>
        <div className="flex flex-col gap-2 md:gap-0 justify-between py-1">
          <div>
            <Link className="font-medium text-sm block" href={`/${product.id}`}>
              {product!.name}
            </Link>
            <Label className="font-medium text-sm opacity-60">
              {size != 0 && "Veličina: " + size}
            </Label>
          </div>
          <button
            onClick={() => cartData.deleteFromCart(product!.id, size)}
            className="text-xs font-bold flex items-center gap-2 hover:opacity-60 text-red-500"
          >
            <Trash size={18} strokeWidth={1.5} /> Ukloni
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex items-center">
          <button
            onClick={() => cartData.removeOneFromCart(product.id, size)}
            className="border-[1px] px-3 w-10 flex justify-center items-center h-10 cursor-pointer hover:opacity-50 transition-all ease-out duration-100"
          >
            <Minus size={15} />
          </button>
          <div className="border-[1px] px-3 w-10 h-10 flex justify-center items-center">
            {quantity}
          </div>
          <button
            onClick={() =>
              cartData.addOneToCart(product.id, size, product.priceInCents)
            }
            className="border-[1px] px-3 w-10 h-10 flex justify-center items-center cursor-pointer hover:opacity-50 transition-all ease-out duration-100"
          >
            <Plus size={15} />
          </button>
        </div>
        <Label
          className={`font-bold text-sm ${
            product.oldPrice != 0 && "text-destructive font-bold"
          }`}
        >
          {formatCurrency(product!.priceInCents * quantity)}
        </Label>
      </div>
    </div>
  );
};

export default Products;
