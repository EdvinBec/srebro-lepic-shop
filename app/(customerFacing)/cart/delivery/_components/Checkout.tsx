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
import { CartContext, CartItem } from "@/lib/CartContext";
import { formatCurrency } from "@/lib/formatters";
import { stripePromise } from "@/utils/helpers";
import { Product } from "@prisma/client";
import {
  AddressElement,
  Elements,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FormEvent, useContext, useState } from "react";

type Props = {
  products: Product[];
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

type CombinedProductCartItem = Product & CartItem;

const Checkout = ({ products }: Props) => {
  const router = useRouter();
  const cart = useContext(CartContext);

  const filteredProducts: CombinedProductCartItem[] = [];

  products.map((product) => {
    cart.items.find((item) => {
      if (item.id === product.id)
        filteredProducts.push({ ...product, ...item });
    });
  });

  const [data, setData] = useState<DeliveryFormData>();
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!data || !email) {
      setError("Molimo unesite podatke za dostavu");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        body: JSON.stringify({
          customer: {
            email,
            zip: data.address.postal_code,
            address: data.address.line1,
            phone: data.phone,
            country: data.address.country,
            city: data.address.city,
            fullName: data.name,
          },
          cart: cart.items,
        }),
      });

      if (response.ok) {
        router.push("/cart/success");
      }
    } catch (error) {
      setError("Došlo je do greške prilikom narudžbe");
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full justify-between">
      <form onSubmit={handleSubmit} className="w-full">
        <Elements stripe={stripePromise}>
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
              <div>
                <Label className="opacity-80 font-normal">Email</Label>
                <input
                  placeholder="Email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-[1px] shadow-sm rounded-sm py-[8px] w-full px-3 placeholder:text-sm text-sm"
                />
              </div>
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
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-2">
              {error && (
                <CardDescription className="text-destructive">
                  {error}
                </CardDescription>
              )}
              <Button variant="secondary" className="w-full">
                {isLoading
                  ? "Naručujem..."
                  : `Naruči - ${formatCurrency(cart.getTotalCost() + 5)}`}
              </Button>
            </CardFooter>
          </Card>
        </Elements>
      </form>
      <div className="flex flex-col justify-between items-start">
        <div className="space-y-2 space-x-2">
          {filteredProducts.map((product) => {
            return (
              <div key={product.id}>
                <Image
                  src={product.image}
                  alt={product.name}
                  className="rounded-sm mb-1"
                  width={80}
                  height={80}
                />
                <h1 className="font-semibold text-sm">{product.name}</h1>
                <p className="text-xs mb-1">{product.description}</p>
                <p className="text-xs mb-1">Količina: {product.quantity}</p>
                <p className="text-xs mb-1">Veličina: {product.size}</p>
                <Label>{formatCurrency(product.priceInCents)}</Label>
              </div>
            );
          })}
        </div>
        <div className="border-[1px] px-4 py-4 mt-4 rounded-sm w-full">
          <h1 className="font-bold text-2xl">Zajedno</h1>
          <div className="border-b-[1px] pb-4">
            <div className="flex gap-4 items-center mt-8 justify-between">
              <Label className="text-sm">Srednja suma</Label>
              <span className="text-sm text-nowrap">
                {formatCurrency(cart.getTotalCost())}
              </span>
            </div>
            <div className="flex items-center mt-8 justify-between">
              <Label className="text-sm">Dostava</Label>
              <span className="text-sm text-nowrap">
                {cart.items.length == 0 ? formatCurrency(0) : formatCurrency(5)}
              </span>
            </div>
          </div>
          <div className="flex items-center mt-8 justify-between">
            <Label className="text-sm">Ukupna cijena</Label>
            <span className="text-sm text-nowrap">
              {cart.items.length == 0
                ? formatCurrency(cart.getTotalCost())
                : formatCurrency(cart.getTotalCost() + 5)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
