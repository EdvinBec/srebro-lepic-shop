import React from "react";
import Image from "next/image";
import StarsLeft from "@/public/assets/stars-left.svg";
import StarsRight from "@/public/assets/stars-right.svg";
import db from "@/db/db";

type Props = {};

const AttentionRow = async ({}: Props) => {
  const shopSettings = await db.shopSettings.findUnique({
    where: { id: 1 },
  });

  return (
    <section className="print:hidden">
      <div className="py-2 bg-accentYellow w-full flex justify-center items-center gap-4">
        <Image src={StarsLeft} alt="stars" className="hidden md:block" />
        <h3 className="text-[12px] text-darkGray">
          {shopSettings?.attentionMessage}
        </h3>
        <Image src={StarsRight} alt="stars" className="hidden md:block" />
      </div>
    </section>
  );
};

export default AttentionRow;
