import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  variant?: "primary" | "secondary" | "outline";
  children?: React.ReactNode;
  className?: string;
};

const Button = ({ variant = "primary", children, className }: Props) => {
  if (variant === "primary") {
    return (
      <button
        className={cn(
          "bg-white text-darkGray px-5 py-3 font-bold uppercase text-sm tracking-tight rounded-[1px] mt-5 md:mt-8",
          className
        )}
      >
        {children}
      </button>
    );
  } else if (variant === "secondary") {
    return (
      <button
        className={cn(
          "bg-darkGray text-white px-5 py-3 font-bold uppercase text-sm tracking-tight rounded-[1px] mt-5 md:mt-8",
          className
        )}
      >
        {children}
      </button>
    );
  } else if (variant === "outline") {
    return (
      <button
        className={cn(
          "bg-none text-darkGray px-5 py-3 font-bold uppercase text-sm tracking-tight rounded-[1px] mt-5 md:mt-8",
          className
        )}
      >
        {children}
      </button>
    );
  }
};

export default Button;
