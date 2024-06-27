import db from "@/db/db";
import React from "react";
import CheckoutForm from "./_components/CheckoutForm";

type Props = {
  params: {
    slug: string;
  };
};

const Page = async ({ params: { slug } }: Props) => {
  const products = await db.product.findMany();

  return (
    <>
      <CheckoutForm products={products} />
    </>
  );
};

export default Page;
