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
import { createCheckoutSession } from "@/hooks/useCart";

type Props = {
  products: Product[];
  className?: string;
};

const Checkout = ({ products, className }: Props) => {
  const cart = useContext(CartContext);

  return (
    <div className={cn(className, "px-4 md:px-8 py-8 border-[1px]")}>
      <h1 className="font-bold text-2xl">Zajedno</h1>
      <div className="border-b-[1px] pb-4">
        <div className="flex items-center mt-8 justify-between">
          <Label className="text-sm">Srednja suma</Label>
          <span className="text-sm">{formatCurrency(cart.getTotalCost())}</span>
        </div>
        <div className="flex items-center mt-8 justify-between">
          <Label className="text-sm">Dostava</Label>
          <span className="text-sm">
            {cart.items.length == 0 ? formatCurrency(0) : formatCurrency(5)}
          </span>
        </div>
      </div>
      <div className="flex items-center mt-8 justify-between">
        <Label className="text-sm">Ukupna cijena</Label>
        <span className="text-sm">
          {cart.items.length == 0
            ? formatCurrency(cart.getTotalCost())
            : formatCurrency(cart.getTotalCost() + 5)}
        </span>
      </div>
      <Button
        onClick={() => createCheckoutSession(cart.items, products)}
        variant="secondary"
        className="w-full mt-8"
      >
        Idi na plaćanje
      </Button>
    </div>
  );
};

export default Checkout;
