"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { CartProduct, useCart } from "@/hooks/use-cart";
import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import Price from "./Price";

type Props = {
  product: CartProduct;
  quantity: number;
  size: number;
  message: string;
};

const CartItem = ({ product, size, quantity, message }: Props) => {
  const { removeItem } = useCart();

  return (
    <div className="space-y-3 py-3">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
            <Image
              className="absolute object-cover"
              src={product.image[0]}
              alt="Product image"
              fill
            />
          </div>
          <div className="flex flex-col self-start">
            <span className="line-clamp-1 text-sm font-medium mb-1">
              {product.name}
            </span>
            <span className="line-clamp-1 text-xs text-mute capitalized">
              Veličina: <span className="font-bold">{size}</span>
            </span>
            <span className="line-clamp-1 text-xs text-mute capitalized">
              Količina: <span className="font-bold">{quantity}</span>
            </span>
            <span className="line-clamp-1 text-xs text-mute capitalized">
              Poruka: <span className="font-bold">{message}</span>
            </span>

            <div className="mt-3 text-xs text-muted-foreground">
              <button
                className="flex items-start gap-0.5 hover:text-darkGray"
                onClick={() => removeItem(product.id, size)}
              >
                <XIcon className="w-3 h-4" />
                Ukloni
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-1 font-medium">
          <Price oldPrice={product.oldPrice} price={product.priceInCents} />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
