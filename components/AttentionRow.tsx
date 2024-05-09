import React from "react";
import Image from "next/image";
import StarsLeft from "@/assets/stars-left.svg";
import StarsRight from "@/assets/stars-right.svg";

type Props = {
  label: string;
};

const AttentionRow = ({ label }: Props) => {
  return (
    <section>
      <div className="py-2 bg-accentYellow w-full flex justify-center items-center gap-4">
        <Image src={StarsLeft} alt="stars" className="hidden md:block" />
        <h3 className="text-[12px] text-darkGray">{label}</h3>
        <Image src={StarsRight} alt="stars" className="hidden md:block" />
      </div>
    </section>
  );
};

export default AttentionRow;
