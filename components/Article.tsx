import Image from "next/image";
import React from "react";
import Button from "./Button/Button";
import Link from "next/link";

type Props = {
  side?: "left" | "right";
  heading: string;
  image: any;
  buttonLabel: string;
  children: React.ReactNode;
  href: string;
};

const Article = ({
  image,
  children,
  heading,
  buttonLabel,
  side = "left",
  href,
}: Props) => {
  if (side === "left") {
    return (
      <section className="text-darkGray bg-white rounded-[1px] py-6 mt-12 flex flex-col lg:flex-row lg:gap-10 min-w-full">
        <div className="lg:w-2/3">
          <Image src={image} alt="necklace" className="w-full" />
        </div>
        <div className="lg:w-2/5">
          <h2 className="lg:mt-0 mt-4 uppercase font-boska font-bold text-3xl md:text-5xl lg:text-3xl desktop:text-5xl">
            {heading}
          </h2>
          {children}

          <Link href={href}>
            <Button className="w-full mt-5 md:mt-8" variant="secondary">
              {buttonLabel}
            </Button>
          </Link>
        </div>
      </section>
    );
  } else {
    return (
      <section className="text-darkGray bg-white rounded-[1px] py-6 mt-12 flex flex-col lg:flex-row lg:gap-12 min-w-full">
        <div className="lg:w-2/5 mb-4">
          <h2 className="md:mt-4 uppercase font-boska font-bold text-3xl md:text-5xl lg:text-3xl desktop:text-5xl">
            {heading}
          </h2>
          {children}

          <Link href={href}>
            <Button className="w-full mt-5 md:mt-8" variant="secondary">
              {buttonLabel}
            </Button>
          </Link>
        </div>
        <div className="lg:w-2/3">
          <Image src={image} alt="necklace" className="w-full" />
        </div>
      </section>
    );
  }
};

export default Article;
