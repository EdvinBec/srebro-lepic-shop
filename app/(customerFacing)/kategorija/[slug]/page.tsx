import Heading from "@/components/Heading";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import React from "react";
import ProductSortAndGallery from "../_components/ProductSortAndGallery";
import db from "@/db/db";

type Props = {
  params: { slug: string };
};

const CategoryPage = async ({ params }: Props) => {
  const products = await db.product.findMany({
    where: {
      isAvailabileForPurchase: true,
      ...(params.slug !== "ponuda" && { category: params.slug }),
    },
  });

  return (
    <div className="flex gap-4">
      <div className="w-1/4 md:flex flex-col items-start hidden">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Početak</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize">
                {params.slug}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Heading star={false} side="left" className="mt-8">
          {params.slug}
        </Heading>
      </div>
      <ProductSortAndGallery products={products} />
    </div>
  );
};

export default CategoryPage;
