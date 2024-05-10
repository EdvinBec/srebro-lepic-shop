import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const MaxWidthWrapper = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        "h-full mx-auto w-full max-w-screen-xl px-5 md:px-20",
        className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
