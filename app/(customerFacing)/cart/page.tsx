import React from "react";
import Products from "./_components/Products";
import db from "@/db/db";
import Checkout from "./_components/Checkout";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

type Props = {};

const Page = async (props: Props) => {
  const products = await db.product.findMany();
  const deliveryFee = await db.shopSettings.findUnique({
    where: { id: 1 },
  });
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col md:flex-row gap-4">
        <Products className="md:w-3/4" products={products} />
        <Checkout
          deliveryFee={deliveryFee?.deliveryFee!}
          className="md:w-1/4"
          products={products}
        />
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
