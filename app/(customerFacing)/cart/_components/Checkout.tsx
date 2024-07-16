"use client";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Product } from "@prisma/client";
import React, { useContext, useState } from "react";
import { formatCurrency } from "@/lib/formatters";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import { CartContext } from "@/lib/CartContext";
import { createCheckoutSession } from "@/hooks/useCart";
import { CreditCard, Truck } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  products: Product[];
  className?: string;
  deliveryFee: number;
};

const Checkout = ({ products, className, deliveryFee }: Props) => {
  const cart = useContext(CartContext);
  const { toast } = useToast();
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState<"card" | "delivery">();

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
            {cart.items.length == 0
              ? formatCurrency(0)
              : formatCurrency(deliveryFee)}
          </span>
        </div>
      </div>
      <div className="flex items-center mt-8 justify-between">
        <Label className="text-sm">Ukupna cijena</Label>
        <span className="text-sm">
          {cart.items.length == 0
            ? formatCurrency(cart.getTotalCost())
            : formatCurrency(cart.getTotalCost() + deliveryFee)}
        </span>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <Label className="mb-1">Izaberite način plaćanja</Label>
        <button
          onClick={() => setPaymentMethod("card")}
          className={`w-full py-2 flex gap-2 items-center justify-center border-[1px] text-sm rounded-sm ${
            paymentMethod === "card" && "outline outline-[2px]"
          }`}
        >
          <CreditCard strokeWidth={1.5} size={20} />
          Kartica
        </button>
        <button
          onClick={() => setPaymentMethod("delivery")}
          className={`w-full py-2 flex gap-2 items-center justify-center border-[1px] text-sm rounded-sm ${
            paymentMethod === "delivery" && "outline outline-[2px]"
          }`}
        >
          <Truck strokeWidth={1.5} size={20} />
          Plaćanje pouzećem
        </button>
      </div>
      <Button
        onClick={() => {
          if (paymentMethod === "card") {
            if (cart.items.length <= 0) {
              toast({
                title: "Korpa je prazna!",
                description: "Molim vas dodajte nešto u korpu",
                variant: "destructive",
              });
              return;
            }
            createCheckoutSession(cart.items, products);
          } else {
            if (cart.items.length <= 0) {
              toast({
                title: "Korpa je prazna!",
                description: "Molim vas dodajte nešto u korpu",
                variant: "destructive",
              });
              return;
            }
            router.push("/cart/delivery");
          }
        }}
        variant="secondary"
        className={`w-full mt-4 ${!paymentMethod && "hidden"}`}
      >
        Idi na plaćanje
      </Button>
    </div>
  );
};

export default Checkout;
