import Image from "next/image";
import React from "react";
import Button from "./Button/Button";
import { Heading } from "lucide-react";

type Props = {
  side?: "left" | "right";
  heading: string;
  image: any;
  buttonLabel: string;
  children: React.ReactNode;
};

const Article = ({
  image,
  children,
  heading,
  buttonLabel,
  side = "left",
}: Props) => {
  if (side === "left") {
    return (
      <section className="text-darkGray bg-white rounded-[1px] p-10 mt-12 flex flex-col lg:flex-row lg:gap-12 min-w-full">
        <Image src={image} alt="necklace" />
        <div>
          <h2 className="mt-4 uppercase font-boska font-bold text-3xl md:text-5xl lg:text-3xl desktop:text-5xl">
            {heading}
          </h2>
          {children}
          <Button className="w-full" variant="secondary">
            {buttonLabel}
          </Button>
        </div>
      </section>
    );
  } else {
    return (
      <section className="text-darkGray bg-white rounded-[1px] p-10 mt-12 flex flex-col lg:flex-row lg:gap-12 min-w-full">
        <div className="mb-4">
          <h2 className="mt-4 uppercase font-boska font-bold text-3xl md:text-5xl lg:text-3xl desktop:text-5xl">
            {heading}
          </h2>
          {children}
          <Button className="w-full" variant="secondary">
            {buttonLabel}
          </Button>
        </div>
        <Image src={image} alt="necklace" />
      </section>
    );
  }
};

export default Article;
