import Heading from "@/components/Heading";
import ProductsCarousel from "@/components/ProductsCarousel";
import db from "@/db/db";
import { formatCurrency } from "@/lib/formatters";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import Stripe from "stripe";

type Props = {
  searchParams: {
    payment_intent: string;
  };
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const page = async ({ searchParams }: Props) => {
  const paymentIntent = await stripe.paymentIntents.retrieve(
    searchParams.payment_intent
  );

  if (paymentIntent.metadata.productId === null) {
    return notFound();
  }

  const product = await db.product.findUnique({
    where: {
      id: paymentIntent.metadata.productId,
    },
  });

  if (product === null) {
    return notFound();
  }

  const isSuccess = paymentIntent.status === "succeeded";

  return (
    <>
      <div className="border-[1px] p-2 py-6">
        <div className="text-center flex flex-col items-center">
          <h1 className="font-bold text-2xl mb-4">
            {isSuccess
              ? `Hvala vam za narudžbu`
              : "Vaša naružba nije bila uspješna. Probajte kasnije"}
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
      <div className="flex justify-center gap-4 mt-4">
        <div className="flex gap-4 items-center mb-4">
          <Image
            className="border-[1px] p-1 w-[80px] md:w-[120px]"
            src={product.image}
            width={200}
            height={100}
            alt={product.name}
          />
          <div>
            <div className="text-sm md:text-lg flex flex-col justify-between h-full">
              <div>
                <h1 className="font-bold">{product.name}</h1>
                <p className="text-muted-foreground line-clamp-3 text-sm">
                  {product.description}
                </p>
              </div>
              {formatCurrency(product.priceInCents)}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <Heading className="mb-0">Ostali proizvodi</Heading>
        <ProductsCarousel className="mt-0" />
      </div>
    </>
  );
};

export default page;
