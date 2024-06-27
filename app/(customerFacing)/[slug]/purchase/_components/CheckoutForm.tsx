"use client";

import Button from "@/components/Button/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/formatters";
import { Product } from "@prisma/client";
import {
  AddressElement,
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CreditCard, Truck } from "lucide-react";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { CartContext } from "@/lib/CartContext";

type Props = {
  products: Product[];
};

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!, {
  locale: "hr",
});

const CheckoutForm = ({ products }: Props) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [clientSecret, setClientSecret] = useState<string>();
  const cart = useContext(CartContext);

  useEffect(() => {
    // Fetch the client secret for the Payment Intent
    async function fetchClientSecret() {
      try {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart: cart.items,
            totalPrice: cart.getTotalCost(products),
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    }

    if (cart.items.length > 0) {
      fetchClientSecret();
    }
  }, [cart, products]);

  return (
    <>
      <div className="flex items-center gap-2">
        <div
          className={`flex shadow-sm items-center border-[1px] py-6 px-4 gap-2 rounded-sm hover:opacity-75 transition-all ease-in-out duration-100 cursor-pointer ${
            paymentMethod === "card"
              ? "border-[3px] border-darkGray cursor-default"
              : "border-[1px]"
          }`}
          onClick={() => setPaymentMethod("card")}
        >
          <CreditCard size={32} strokeWidth={1.5} />
          <Label className="">Plaćanje karticom, paypalom</Label>
        </div>
        <div
          className={`flex shadow-sm items-center border-[1px] py-6 px-4 gap-2 rounded-sm hover:opacity-75 transition-all ease-in-out duration-100 cursor-pointer ${
            paymentMethod === "delivery"
              ? "border-[3px] border-darkGray cursor-default"
              : "border-[1px]"
          }`}
          onClick={() => setPaymentMethod("delivery")}
        >
          <Truck size={32} strokeWidth={1.5} />
          <Label>Plaćanje pouzećem</Label>
        </div>
      </div>

      {clientSecret && (
        <Elements options={{ clientSecret }} stripe={stripePromise}>
          {paymentMethod === "card" && (
            <PaymentForm price={cart.getTotalCost(products)} />
          )}
        </Elements>
      )}
    </>
  );
};

export default CheckoutForm;

export const PaymentForm = ({ price }: { price: number }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [email, setEmail] = useState<string>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (stripe == null || elements == null || email == null) {
      return;
    }
    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success`,
        },
      })
      .then(({ error }: { error: any }) => {
        if (error.type === "card_error") {
          setErrorMessage(error.message!);
        } else {
          setErrorMessage(error.message);
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Blagajna</CardTitle>
          {errorMessage && (
            <CardDescription className="text-destructive">
              {errorMessage}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <AddressElement
            options={{
              mode: "shipping",
              validation: {
                phone: {
                  required: "always",
                },
              },
              fields: { phone: "always" },
            }}
          />
          <LinkAuthenticationElement
            onChange={(e) => setEmail(e.value.email)}
          />
          <PaymentElement />
        </CardContent>
        <CardFooter>
          <Button
            disabled={stripe == null || elements == null || isLoading}
            variant="secondary"
            className="w-full"
          >
            {isLoading ? "Naručujem..." : `Naruči - ${formatCurrency(price)}`}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
