"use client";

import Heading from "@/components/Heading";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductsCarousel from "@/components/ProductsCarousel";
import { CartContext } from "@/lib/CartContext";
import { CheckCircle2 } from "lucide-react";
import React, { useContext, useEffect } from "react";

type Props = {};

const Page = ({}: Props) => {
  const cart = useContext(CartContext);

  useEffect(() => {
    if (cart.items.length > 0) cart.clearCart();
  });

  return (
    <MaxWidthWrapper>
      <div className="mt-4 border-[1px] p-2 py-6">
        <div className="text-center flex flex-col items-center">
          <h1 className="font-bold text-2xl mb-4">
            Hvala vam za vašu narudžbu
          </h1>

          <p className="text-sm mb-4">
            Vašu narudžbu ćemo pripremiti u najkraćem mogućem roku.
          </p>

          <p className="text-sm">
            Potvrdu narudžbe i račun smo poslali na vaš e-mail.
          </p>
          <CheckCircle2
            size={72}
            strokeWidth={1}
            className="mt-4 text-accentYellow"
          />
        </div>
      </div>
      <div className="mt-12">
        <Heading className="mb-0">Ostali proizvodi</Heading>
        <ProductsCarousel className="mt-0" />
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
