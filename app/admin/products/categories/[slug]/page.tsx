import Heading from "@/components/Heading";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";
import Sidebar from "../../_components/Sidebar";
import Link from "next/link";
import Button from "@/components/Button/Button";
import { ProductsTable } from "../../page";

type Props = {
  params: {
    slug: string;
  };
};

const page = ({ params: { slug } }: Props) => {
  return (
    <div>
      <MaxWidthWrapper>
        <div className="flex gap-4 justify-between items-end">
          <Heading className="mt-8" side="left" star={false}>
            {slug}
          </Heading>
          <Button variant="secondary">
            <Link href="/admin/products/new">Dodaj novi artikal</Link>
          </Button>
        </div>
        <div className="mt-12 flex gap-8">
          <Sidebar slug={slug} />
          <ProductsTable category={slug} />
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default page;
