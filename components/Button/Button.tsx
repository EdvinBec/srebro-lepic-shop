import React from "react";

type Props = {
  variant?: "primary" | "secondary" | "outline";
  children?: React.ReactNode;
};

const Button = ({ variant = "primary", children }: Props) => {
  if (variant === "primary") {
    return (
      <button className="bg-white text-darkGray px-5 py-3 font-bold uppercase text-sm tracking-tight rounded-[1px] mt-5 md:mt-8">
        {children}
      </button>
    );
  } else if (variant === "secondary") {
    return (
      <button className=" bg-darkGray text-white px-5 py-3 font-bold uppercase text-sm tracking-tight rounded-[1px] mt-5 md:mt-8">
        {children}
      </button>
    );
  } else if (variant === "outline") {
    return (
      <button className="border border-darkGray text-darkGray px-5 py-3 font-bold uppercase text-sm tracking-tight rounded-[1px] mt-5 md:mt-8">
        {children}
      </button>
    );
  }
};

export default Button;
