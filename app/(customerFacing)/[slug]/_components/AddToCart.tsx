"use client";

import React, { useState } from "react";
import SizePicker from "./SizePicker";
import { Product } from "@prisma/client";
import Button from "@/components/Button/Button";
import Link from "next/link";

type Props = {
  availableSizes: number[];
  product: Product;
  className?: string;
  id: string;
};

const AddToCart = ({ product, availableSizes, className, id }: Props) => {
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
      <div className="flex gap-4">
        <Button className="mt-2" variant="secondary">
          Dodaj u korpu
        </Button>
        <Link href={`/${id}/purchase`}>
          <Button className="mt-2 border-[1px]">Kupi odmah</Button>
        </Link>
      </div>
    </div>
  );
};

export default AddToCart;
