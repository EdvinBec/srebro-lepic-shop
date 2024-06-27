import React from "react";
import Products from "./_components/Products";
import db from "@/db/db";
import Checkout from "./_components/Checkout";

type Props = {};

const Page = async (props: Props) => {
  const products = await db.product.findMany();
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Products className="md:w-3/4" products={products} />
      <Checkout className="md:w-1/4" products={products} />
    </div>
  );
};

export default Page;
