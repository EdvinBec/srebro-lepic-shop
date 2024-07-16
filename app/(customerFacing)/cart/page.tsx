import React from "react";
import Products from "./_components/Products";
import db from "@/db/db";
import Checkout from "./_components/Checkout";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

type Props = {};

const Page = async (props: Props) => {
  const products = await db.product.findMany({
    select: {
      id: true,
      name: true,
      priceInCents: true,
      oldPrice: true,
      image: true,
      availableSizes: true,
      description: true,
    },
  });

  const shopSettings = await db.shopSettings.findUnique({
    where: { id: 1 },
    select: { deliveryFee: true },
  });

  const deliveryFee = shopSettings?.deliveryFee;

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col md:flex-row gap-4">
        <Products className="md:w-3/4" products={products} />
        {deliveryFee !== undefined && (
          <Checkout
            deliveryFee={deliveryFee}
            className="md:w-1/4"
            products={products}
          />
        )}
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
