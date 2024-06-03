import Heading from "@/components/Heading";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import db from "@/db/db";
import React from "react";
import ProductForm from "../../_components/ProductForm";

type Props = {
  params: { id: string };
};

const page = async ({ params: { id } }: Props) => {
  const product = await db.product.findUnique({ where: { id } });

  return (
    <MaxWidthWrapper>
      <Heading className="mt-8" side="left" star={false}>
        Uredi artikal
      </Heading>
      <ProductForm className="mt-8" product={product} />
    </MaxWidthWrapper>
  );
};

export default page;
