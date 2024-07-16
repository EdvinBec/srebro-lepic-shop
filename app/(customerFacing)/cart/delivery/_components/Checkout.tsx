"use client";

import Button from "@/components/Button/Button";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { CartContext, CartItem } from "@/lib/CartContext";
import { formatCurrency } from "@/lib/formatters";
import { DeliveryFormData } from "@/types";
import { stripePromise } from "@/utils/helpers";
import { Product } from "@prisma/client";
import { AddressElement, Elements } from "@stripe/react-stripe-js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FormEvent, useContext, useState } from "react";

type Props = {
  products: Product[];
  deliveryFee: number;
};

type CombinedProductCartItem = Product & CartItem;

const Checkout = ({ products, deliveryFee }: Props) => {
  const router = useRouter();
  const cart = useContext(CartContext);
  const { toast } = useToast();

  // Filter products that are in the cart
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
    if (cart.items.length <= 0) {
      toast({
        title: "Korpa je prazna",
        description:
          "Molimo vas dodajte nešto u korpu, da bi izvršili narudžbu",
        variant: "destructive",
      });
      return;
    }

    if (!data) {
      toast({
        title: "Nema podataka za dostavu",
        description: "Molimo unesite podatke za dostavu",
        variant: "destructive",
      });
      return;
    }

    if (!email || email === "") {
      toast({
        title: "Email je obavezan",
        description: "Molimo unesite vaš email",
        variant: "destructive",
      });
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

      if (response.status === 200) {
        router.push("/cart/success");
      }
    } catch (error) {
      toast({
        title: "Greška",
        description: "Došlo je do greške prilikom narudžbe",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <MaxWidthWrapper>
      <div className="mt-4 flex flex-col gap-8 w-full justify-between">
        <div className="flex flex-col justify-between items-start">
          <div className="flex flex-col sm:flex-row gap-6">
            {filteredProducts.map((product) => {
              return (
                <div key={product.id} className="flex gap-2">
                  <Image
                    src={product.image[0]}
                    alt={product.name}
                    className="rounded-sm mb-1"
                    width={50}
                    height={50}
                  />
                  <div>
                    <h1 className="font-semibold text-sm">{product.name}</h1>
                    <p className="text-xs mb-1">Količina: {product.quantity}</p>
                    <p className="text-xs mb-1">Veličina: {product.size}</p>
                    <Label
                      className={`${
                        product.oldPrice && "font-bold text-destructive"
                      }`}
                    >
                      {formatCurrency(product.priceInCents)}
                    </Label>
                  </div>
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
                  {cart.items.length == 0
                    ? formatCurrency(0)
                    : formatCurrency(deliveryFee)}
                </span>
              </div>
            </div>
            <div className="flex items-center mt-8 justify-between">
              <Label className="text-sm">Ukupna cijena</Label>
              <span className="text-sm text-nowrap">
                {cart.items.length == 0
                  ? formatCurrency(cart.getTotalCost())
                  : formatCurrency(cart.getTotalCost() + deliveryFee)}
              </span>
            </div>
          </div>
        </div>
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
                    : `Naruči - ${formatCurrency(
                        cart.getTotalCost() + deliveryFee
                      )}`}
                </Button>
              </CardFooter>
            </Card>
          </Elements>
        </form>
      </div>
    </MaxWidthWrapper>
  );
};

export default Checkout;
