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
import db from "@/db/db";
import ProductReel from "@/components/ProductReel";

type Props = {
  params: { slug: string };
};

const CategoryPage = async ({ params }: Props) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 mt-4">
      <div className="md:flex flex-col items-start hidden">
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
      <ProductReel className="pt-2 lg:pt-8" category={params.slug} />
    </div>
  );
};

export default CategoryPage;
