import React from "react";
import Checkout from "./_components/Checkout";
import db from "@/db/db";

type Props = {};

const page = async (props: Props) => {
  const products = await db.product.findMany();

  return (
    <div>
      <Checkout products={products} />
    </div>
  );
};

export default page;
