import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  variant?: "primary" | "secondary" | "outline";
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
};

const Button = ({
  variant = "primary",
  children,
  className,
  disabled,
  onClick,
}: Props) => {
  if (variant === "primary") {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "px-5 py-3 font-bold uppercase text-sm tracking-tight rounded-[1px] text-red hover:before:bg-red border-darkGray relative overflow-hidden bg-white text-darkGray  transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-darkGray before:transition-all before:duration-300 hover:text-white hover:before:left-0 hover:before:w-full",
          className
        )}
      >
        <span className="relative z-10">{children}</span>
      </button>
    );
  } else if (variant === "secondary") {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "px-5 py-3 font-bold uppercase text-sm tracking-tight rounded-[1px] border-[1px] text-red hover:before:bg-red border-darkGray relative overflow-hidden bg-darkGray text-white  transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-white before:transition-all before:duration-300 hover:text-darkGray hover:before:left-0 hover:before:w-full",
          className
        )}
      >
        <span className="relative z-10">{children}</span>
      </button>
    );
  } else if (variant === "outline") {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
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
