"use client";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React, { useContext, useState, useCallback } from "react";
import { formatCurrency } from "@/lib/formatters";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import { CartContext } from "@/lib/CartContext";
import { createCheckoutSession } from "@/hooks/useCart";
import { CreditCard, Truck } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { deliveryFee } from "@/config";

type Product = {
  id: string;
  name: string;
  priceInCents: number;
  oldPrice: number;
  image: string[];
  availableSizes: number[];
  description: string;
};

type Props = {
  products: Product[];
  className?: string;
};

const Checkout = ({ products, className }: Props) => {
  const cart = useContext(CartContext);
  const { toast } = useToast();
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState<"card" | "delivery">();

  const handlePayment = useCallback(() => {
    if (cart.items.length <= 0) {
      toast({
        title: "Korpa je prazna!",
        description: "Molim vas dodajte nešto u korpu",
        variant: "destructive",
      });
      return;
    }

    if (paymentMethod === "card") {
      createCheckoutSession(cart.items, products);
    } else {
      router.push("/cart/delivery");
    }
  }, [cart.items, paymentMethod, products, router, toast]);

  const totalCost = cart.getTotalCost();
  const totalPrice =
    cart.items.length === 0 ? totalCost : totalCost + deliveryFee;

  return (
    <div className={cn(className, "px-4 md:px-8 py-8 border-[1px]")}>
      <h1 className="font-bold text-2xl">Zajedno</h1>
      <div className="border-b-[1px] pb-4">
        <div className="flex items-center mt-8 justify-between">
          <Label className="text-sm">Srednja suma</Label>
          <span className="text-sm">{formatCurrency(totalCost)}</span>
        </div>
        <div className="flex items-center mt-8 justify-between">
          <Label className="text-sm">Dostava</Label>
          <span className="text-sm">
            {formatCurrency(cart.items.length === 0 ? 0 : deliveryFee)}
          </span>
        </div>
      </div>
      <div className="flex items-center mt-8 justify-between">
        <Label className="text-sm">Ukupna cijena</Label>
        <span className="text-sm">{formatCurrency(totalPrice)}</span>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <Label className="mb-1">Izaberite način plaćanja</Label>
        <button
          onClick={() => setPaymentMethod("card")}
          className={`w-full py-2 flex gap-2 items-center justify-center border-[1px] text-sm rounded-sm ${
            paymentMethod === "card" ? "outline outline-[2px]" : ""
          }`}
        >
          <CreditCard strokeWidth={1.5} size={20} />
          Kartica
        </button>
        <button
          onClick={() => setPaymentMethod("delivery")}
          className={`w-full py-2 flex gap-2 items-center justify-center border-[1px] text-sm rounded-sm ${
            paymentMethod === "delivery" ? "outline outline-[2px]" : ""
          }`}
        >
          <Truck strokeWidth={1.5} size={20} />
          Plaćanje pouzećem
        </button>
      </div>
      {paymentMethod && (
        <Button
          onClick={handlePayment}
          variant="secondary"
          className="w-full mt-4"
        >
          Idi na plaćanje
        </Button>
      )}
    </div>
  );
};

export default Checkout;
