"use client";

import React, { useState } from "react";
import SizePicker from "./SizePicker";
import { Product } from "@prisma/client";
import Button from "@/components/Button/Button";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { CartContext } from "@/lib/CartContext";
import { useContext } from "react";
import { Label } from "@/components/ui/label";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

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

      <div className="flex gap-4">
        <Button
          className="mt-2 w-full"
          variant="secondary"
          onClick={() => {
            if (
              product.category === "prstenje" ||
              product.category === "ogrlice"
            ) {
              if (size > 0) {
                addItem(product, size);
                toast({
                  title: "Proizvod dodan u košaru",
                  variant: "default",
                });
              } else {
                toast({
                  title: "Odaberite veličinu",
                  description: "Molim vas odaberite veličinu",
                  variant: "destructive",
                });
              }
            } else {
              addItem(product, size);
              toast({
                title: "Proizvod dodan u košaru",
                variant: "default",
              });
            }
          }}
        >
          Dodaj u korpu
        </Button>
      </div>
    </div>
  );
};

export default AddToCart;
