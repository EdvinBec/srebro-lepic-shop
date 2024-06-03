import Heading from "@/components/Heading";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";
import ProductForm from "../_components/ProductForm";

type Props = {};

const page = (props: Props) => {
  return (
    <MaxWidthWrapper>
      <Heading className="mt-8" side="left" star={false}>
        Dodaj artikal
      </Heading>
      <ProductForm className="mt-8" />
    </MaxWidthWrapper>
  );
};

export default page;
