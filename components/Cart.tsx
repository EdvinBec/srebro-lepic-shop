"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { ShoppingCartIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import { formatCurrency } from "@/lib/formatters";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { useCart } from "@/hooks/use-cart";
import { ScrollArea } from "./ui/scroll-area";
import CartItem from "./CartItem";
import { deliveryFee } from "@/config";

type Props = {};

const Cart = (props: Props) => {
  const { items } = useCart();

  const itemCount = items.length;
  const cartTotal = items.reduce(
    (total, { product, quantity }) => total + product.priceInCents * quantity,
    0
  );

  return (
    <Sheet>
      <SheetTrigger className="group flex -m-2 items-center p-2">
        <ShoppingCartIcon
          aria-hidden="true"
          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
        />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          {itemCount}
        </span>
      </SheetTrigger>
      <SheetContent className="flex flex-col pr-0 sm:max-w-lg w-full">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Košara ({itemCount})</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <div className="flex w-full flex-col pr-6">
              <ScrollArea>
                {items.map(({ product, quantity, size, message }) => (
                  <CartItem
                    message={message!}
                    product={product}
                    size={size}
                    quantity={quantity}
                    key={product.id}
                  />
                ))}
              </ScrollArea>
            </div>
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 pr-6">
                <div className="flex">
                  <span className="flex-1">Dostava</span>
                  <span>
                    {/* {TODO: Add shipping price} */}
                    {formatCurrency(deliveryFee)}
                  </span>
                </div>
                <div className="flex">
                  <span className="flex-1">Ukupna cijena</span>
                  <span>{formatCurrency(cartTotal + deliveryFee)}</span>
                </div>
              </div>
              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href="/cart"
                    className={buttonVariants({
                      className: "w-full rounded-[4px]",
                    })}
                  >
                    Nastavi na plaćanje
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <span className="text-xl font-semibold text-muted-foreground">
              Vaša košara je prazna
            </span>
            <SheetTrigger asChild>
              <Link
                href="/kategorija/ponuda"
                className={buttonVariants({
                  variant: "link",
                  size: "sm",
                  className: "text-sm text-muted-foreground",
                })}
              >
                Dodaj proizvod u košaru
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
