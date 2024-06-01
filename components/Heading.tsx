import Image from "next/image";
import React from "react";
import Star from "@/public/assets/Star.svg";
import { cn } from "@/lib/utils";

type Props = {
  children?: React.ReactNode;
  className?: string;
  side?: "left" | "right" | "center";
  star?: boolean;
};

const Heading = ({
  children,
  className,
  side = "center",
  star = true,
}: Props) => {
  return (
    <div
      className={cn(
        `w-full flex text-darkGray ${side == "center" && "md:justify-center"} ${
          side == "left" && "md:justify-start"
        } ${side == "right" && "md:justify-end"} justify-center`,
        className
      )}
    >
      <div className="flex items-start gap-5 md:gap-14">
        <Image
          src={Star}
          alt="star"
          className={`h-[70px] md:h-full ${!star && "hidden"}`}
        />
        <h1 className="font-boska text-center font-bold uppercase text-3xl md:text-5xl">
          {children}
        </h1>
        <Image
          src={Star}
          alt="star"
          className={`h-[70px] md:h-full ${!star && "hidden"}`}
        />
      </div>
    </div>
  );
};

export default Heading;
