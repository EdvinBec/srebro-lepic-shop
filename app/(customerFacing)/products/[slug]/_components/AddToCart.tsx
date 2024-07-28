"use client";

import React, { useState } from "react";
import SizePicker from "./SizePicker";
import Button from "@/components/Button/Button";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

type Props = {
  availableSizes: number[];
  product: {
    id: string;
    name: string;
    image: string[];
    priceInCents: number;
    oldPrice: number;
    availableSizes: number[];
    weightInGrams: number;
    description: string;
    category: string;
  };
  className?: string;
  id: string;
};

const AddToCart = ({ product, availableSizes, className, id }: Props) => {
  const [size, setSize] = useState<number>(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { toast } = useToast();
  const { addItem } = useCart();

  return (
    <div className={className}>
      <div className="flex gap-4">
        <SizePicker
          className={`${
            product.category === "prstenje" || product.category == "ogrlice"
              ? "block"
              : "hidden"
          } w-full`}
          unit={product.category === "ogrlice" ? "cm" : ""}
          onSave={(item) => setSize(item)}
          label="Odaberite veličinu"
          availableSizes={availableSizes}
        />
        {error && <p className="text-destructive text-sm">{error}</p>}
      </div>

      <div
        className={cn("w-full", { hidden: product.category !== "sa-porukom" })}
      >
        <Label>Unesite riječ koju zelite na ogrlici (max. 8 slova)</Label>
        <Input
          onChange={(e) => setMessage(e.target.value)}
          className="w-full py-2 rounded-[4px]"
        />
      </div>

      <div className="flex gap-4">
        <Button
          className="mt-2 w-full"
          variant="secondary"
          onClick={() => {
            if (product.category === "sa-porukom") {
              if (message.length > 8) {
                toast({
                  title: "Unesite rijec do 8 slova",
                  variant: "destructive",
                });
                return;
              }
            }
            if (
              product.category === "prstenje" ||
              product.category === "ogrlice"
            ) {
              if (size <= 0) {
                toast({
                  title: "Odaberite veličinu",
                  description: "Molim vas odaberite veličinu",
                  variant: "destructive",
                });
                return;
              }
            }
            addItem(product, size, message);
            toast({
              title: "Proizvod dodan u košaru",
              variant: "default",
            });
          }}
        >
          Dodaj u korpu
        </Button>
      </div>
    </div>
  );
};

export default AddToCart;
