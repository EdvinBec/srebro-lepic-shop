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
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  product: Product;
  clientSecret: string;
};

type DeliveryFormData = {
  name: string;
  phone: string;
  address: {
    line1: string;
    city: string;
    country: string;
    postal_code: string;
  };
};

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!, {
  locale: "hr",
});

const CheckoutForm = ({ product, clientSecret }: Props) => {
  const [paymentMethod, setPaymentMethod] = useState("delivery");

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
      <div className="flex gap-4 items-center mt-4 mb-4">
        <Image
          className="border-[1px] p-1 w-[120px] md:w-[200px]"
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
      <Elements options={{ clientSecret }} stripe={stripePromise}>
        {paymentMethod === "card" && (
          <PaymentForm price={product.priceInCents} />
        )}
        {paymentMethod === "delivery" && (
          <DeliveryForm price={product.priceInCents} productId={product.id} />
        )}
      </Elements>
    </>
  );
};

export default CheckoutForm;

const PaymentForm = ({ price }: { price: number }) => {
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
      .then(({ error }) => {
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

const DeliveryForm = ({
  price,
  productId,
}: {
  price: number;
  productId: string;
}) => {
  const router = useRouter();

  const [data, setData] = useState<DeliveryFormData>();
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOrderSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const pricePaidInCents = price * 100;

    const response = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        address: data!.address.line1,
        phone: data!.phone,
        country: data!.address.country,
        city: data!.address.city,
        fullName: data!.name,
        productId: productId,
        pricePaidInCents: pricePaidInCents,
        zip: data!.address.postal_code,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      setError(responseData.error || "Unknown error occurred");
    } else {
      console.log("Order submitted successfully");
      router.push(`/success/${productId}`);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleOrderSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Blagajna</CardTitle>
          {error && (
            <CardDescription className="text-destructive">
              {error}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <AddressElement
            onChange={(e) => setData(e.value as DeliveryFormData)}
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
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2">
          {error && (
            <CardDescription className="text-destructive">
              {error}
            </CardDescription>
          )}
          <Button variant="secondary" className="w-full">
            {isLoading ? "Naručujem..." : `Naruči - ${formatCurrency(price)}`}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
