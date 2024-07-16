import React from "react";
import Checkout from "./_components/Checkout";
import db from "@/db/db";

type Props = {};

const page = async (props: Props) => {
  const products = await db.product.findMany();
  const deliveryFee = await db.shopSettings.findUnique({
    where: { id: 1 },
  });

  return (
    <div>
      <Checkout deliveryFee={deliveryFee?.deliveryFee!} products={products} />
    </div>
  );
};

export default page;
