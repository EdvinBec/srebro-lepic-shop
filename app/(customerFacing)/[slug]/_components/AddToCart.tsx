"use client";

import React, { useState } from "react";
import SizePicker from "./SizePicker";
import { Product } from "@prisma/client";
import Button from "@/components/Button/Button";

type Props = {
  availableSizes: number[];
  product: Product;
  className?: string;
};

const AddToCart = ({ product, availableSizes, className }: Props) => {
  const [size, setSize] = useState<number>();

  return (
    <div className={className}>
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
      <Button className="mt-2" variant="secondary">
        Dodaj u korpu
      </Button>
    </div>
  );
};

export default AddToCart;
