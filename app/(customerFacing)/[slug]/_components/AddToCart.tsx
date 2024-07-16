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

type Props = {
  availableSizes: number[];
  product: Product;
  className?: string;
  id: string;
};

const AddToCart = ({ product, availableSizes, className, id }: Props) => {
  const [size, setSize] = useState<number>(0);
  const [error, setError] = useState("");

  const { toast } = useToast();
  const cart = useContext(CartContext);
  const productQuantity = cart.getProductQuantity(product.id, size);

  const handleAddToCart = () => {
    if (availableSizes[0] != 0 && size === 0) {
      toast({
        title: "Molim vas odaberite veličinu.",
        description:
          "Izaberite veličinu proizvoda kako biste ga dodali u korpu.",
        variant: "destructive",
      });
      return;
    }

    cart.addOneToCart(product.id, size, product.priceInCents);

    toast({
      title: "Proizvod dodan u korpu",
    });

    setError("");
  };

  return (
    <div className={className}>
      <div className="flex gap-4">
        <SizePicker
          className={`${
            product.category === "prstenje" || product.category == "ogrlice"
              ? "block"
              : "hidden"
          }`}
          unit={product.category === "ogrlice" ? "cm" : ""}
          onSave={(item) => setSize(item)}
          label="Odaberite veličinu"
          availableSizes={availableSizes}
        />
        {error && <p className="text-destructive text-sm">{error}</p>}
      </div>

      <div className="flex gap-4">
        {productQuantity > 0 ? (
          <>
            <div className="mt-2">
              <Label>Proizvod je u korpi</Label>
              <div className="flex items-center">
                <button
                  onClick={() => cart.removeOneFromCart(product.id, size)}
                  className="border-[1px] px-3 w-10 flex justify-center items-center h-10 cursor-pointer hover:opacity-50 transition-all ease-out duration-100"
                >
                  <Minus size={15} />
                </button>
                <div className="border-[1px] px-3 w-10 h-10 flex justify-center items-center">
                  {productQuantity}
                </div>
                <button
                  onClick={() =>
                    cart.addOneToCart(product.id, size, product.priceInCents)
                  }
                  className="border-[1px] px-3 w-10 h-10 flex justify-center items-center cursor-pointer hover:opacity-50 transition-all ease-out duration-100"
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <Button
            className="mt-2"
            variant="secondary"
            onClick={handleAddToCart}
          >
            Dodaj u korpu
          </Button>
        )}
      </div>
    </div>
  );
};

export default AddToCart;
