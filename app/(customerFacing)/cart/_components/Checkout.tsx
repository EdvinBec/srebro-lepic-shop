"use client";

import { Label } from "@/components/ui/label";
import { RootState } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Product } from "@prisma/client";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { formatCurrency } from "@/lib/formatters";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import { CartContext, CartItem } from "@/lib/CartContext";

type Props = {
  products: Product[];
  className?: string;
};

const Checkout = ({ products, className }: Props) => {
  const router = useRouter();
  let price = 0;
  const productsFiltered: Product[] = [];

  const cartData = useContext(CartContext);
  const cart = useContext(CartContext).items;

  cart.forEach((item: CartItem) => {
    const product = products.find((product) => product.id === item.id);

    if (product) {
      productsFiltered.push(product);
    }
  });

  productsFiltered.forEach((product) => {
    price +=
      product.priceInCents *
      cart.find((item) => item.id === product.id)!.quantity;
  });

  return (
    <div className={cn(className, "px-4 md:px-8 py-8 border-[1px]")}>
      <h1 className="font-bold text-2xl">Zajedno</h1>
      <div className="border-b-[1px] pb-4">
        <div className="flex items-center mt-8 justify-between">
          <Label className="text-sm">Srednja suma</Label>
          <span className="text-sm">
            {formatCurrency(cartData.getTotalCost(products))}
          </span>
        </div>
        <div className="flex items-center mt-8 justify-between">
          <Label className="text-sm">Dostava</Label>
          <span className="text-sm">
            {productsFiltered.length == 0
              ? formatCurrency(0)
              : formatCurrency(5)}
          </span>
        </div>
      </div>
      <div className="flex items-center mt-8 justify-between">
        <Label className="text-sm">Ukupna cijena</Label>
        <span className="text-sm">
          {productsFiltered.length == 0
            ? formatCurrency(price)
            : formatCurrency(price + 5)}
        </span>
      </div>
      <Button
        onClick={() => router.push("/cart/checkout")}
        variant="secondary"
        className="w-full mt-8"
      >
        Idi na plaćanje
      </Button>
    </div>
  );
};

export default Checkout;
