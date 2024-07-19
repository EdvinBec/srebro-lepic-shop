import React from "react";
import Checkout from "./_components/Checkout";
import db from "@/db/db";

const Page = async () => {
  // Fetch products and delivery fee from the database
  const products = await db.product.findMany();
  const shopSettings = await db.shopSettings.findUnique({ where: { id: 1 } });
  const deliveryFee = shopSettings?.deliveryFee ?? 0;

  // Render the Checkout component with fetched data
  return (
    <div>
      <Checkout deliveryFee={deliveryFee} products={products} />
    </div>
  );
};

export default Page;
