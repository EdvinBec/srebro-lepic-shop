import Heading from "@/components/Heading";
import ProductsCarousel from "@/components/ProductsCarousel";
import db from "@/db/db";
import { CheckCircle2 } from "lucide-react";
import React from "react";
import ClientLineItems from "../_components/ClientLineItems";

type Props = {
  params: {
    slug: string;
  };
};

const Page = async ({ params: { slug } }: Props) => {
  const product = await db.product.findUnique({
    where: {
      id: slug,
    },
  });

  return (
    <>
      <div className="border-[1px] p-2 py-6">
        <div className="text-center flex flex-col items-center">
          <h1 className="font-bold text-2xl mb-4">
            Hvala vam za vašu narudžbu
          </h1>

          <p className="text-sm mb-4">
            Vašu narudžbu ćemo pripremiti u najkraćem mogućem roku.
          </p>

          <p className="text-sm">
            Potvrdu narudžbe i račun smo poslali na vaš e-mail.
          </p>
          <CheckCircle2
            size={72}
            strokeWidth={1}
            className="mt-4 text-accentYellow"
          />
        </div>
      </div>
      <div className="mt-12">
        <Heading className="mb-0">Ostali proizvodi</Heading>
        <ProductsCarousel className="mt-0" />
      </div>
      <ClientLineItems sessionId={slug} />
    </>
  );
};

export default Page;
