import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type Props = {
  image: any;
  className?: string;
};

const ShowRow = ({ image, className }: Props) => {
  return (
    <div
      className={cn(
        "w-full py-3 bg-accentYellow flex justify-center items-center gap-7 lg:gap-12 overflow-x-hidden",
        className
      )}
    >
      {Array.from({ length: 20 }).map((item, itemIdx: number) => {
        return (
          <Image
            key={itemIdx}
            src={image}
            alt="logo"
            className="h-[30px] md:h-[45px] lg:h-[60px]"
          />
        );
      })}
    </div>
  );
};

export default ShowRow;
