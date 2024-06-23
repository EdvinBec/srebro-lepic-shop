"use client";

import React, { useState } from "react";
import SizePicker from "./SizePicker";
import { Product } from "@prisma/client";
import Button from "@/components/Button/Button";
import { useAppDispatch } from "@/lib/hooks";
import { saveCurrentOrder } from "@/lib/slices/createOrder";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {
  availableSizes: number[];
  product: Product;
  className?: string;
  id: string;
};

const AddToCart = ({ product, availableSizes, className, id }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [size, setSize] = useState<number>(0);
  const [error, setError] = useState("");

  const handleSubmit = (path: string) => {
    if (availableSizes && size === 0) {
      setError("Molim vas odaberite veličinu.");
      return;
    }

    dispatch(saveCurrentOrder({ productId: product.id, size: size }));

    router.push(path);
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
        <Button className="mt-2" variant="secondary">
          Dodaj u korpu
        </Button>

        <Button
          onClick={() => handleSubmit(`/${id}quantity${size}/purchase`)}
          className="mt-2 border-[1px]"
        >
          Kupi odmah
        </Button>
      </div>
    </div>
  );
};

export default AddToCart;
