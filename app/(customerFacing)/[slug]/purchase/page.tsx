import db from "@/db/db";
import React from "react";
import Stripe from "stripe";
import CheckoutForm from "./_components/CheckoutForm";

type Props = {
  params: {
    slug: string;
  };
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const page = async ({ params: { slug } }: Props) => {
  const product = await db.product.findUnique({
    where: {
      id: slug,
    },
  });

  const paymentIntent = await stripe.paymentIntents.create({
    amount: product?.priceInCents! * 100,
    currency: "eur", // Use lowercase for currency codes
    payment_method_types: ["card"], // Specify the payment method type(s) you want to accept
    metadata: { productId: product?.id! },
  });

  if (paymentIntent.client_secret === null) {
    throw Error("Stripe failed to create payment intent.");
  }
  return (
    <>
      <CheckoutForm
        product={product!}
        clientSecret={paymentIntent.client_secret}
      />
    </>
  );
};

export default page;
