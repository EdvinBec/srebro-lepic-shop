import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  price: number;
  oldPrice: number;
  className?: string;
};

const Price = ({ price, oldPrice, className }: Props) => {
  return (
    <div className={cn("flex gap-4 items-end mt-3", className)}>
      <p
        className={cn("font-medium text-sm text-gray-900", {
          "font-bold text-destructive": oldPrice > 0,
        })}
      >
        {formatCurrency(price)}
      </p>
      <p
        className={cn("font-medium text-sm text-gray-900", {
          "text-gray-400 font-normal text-xs": oldPrice > 0,
          hidden: oldPrice <= 0,
        })}
      >
        {formatCurrency(oldPrice)}
      </p>
    </div>
  );
};

export default Price;
