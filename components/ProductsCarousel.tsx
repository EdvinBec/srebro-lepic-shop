import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Logo from "@/public/assets/logo.svg";
import { Product } from "@/types";
import Link from "next/link";

type Props = {
  Products: Product[];
};

const ProductsCarousel = ({ Products }: Props) => {
  return (
    <Carousel className="w-full max-w-[90%] mx-auto mt-8 md:mt-8 text-darkGray">
      <CarouselContent>
        {Products.map((item: Product, itemIdx: number) => {
          return (
            <CarouselItem
              key={itemIdx}
              className="md:basis-1/2 lg:basis-1/3 md:block flex justify-center"
            >
              <Link href={item.url}>
                <div className="bg-white p-5 rounded-[1px] shadow-sm ">
                  <Image
                    src={item.imageURL}
                    alt={item.title}
                    height={200}
                    width={300}
                    className="object-cover rounded-[1px] h-[200px] w-[300px]"
                  />
                  <Image src={Logo} alt="logo" height={17} className="mt-2.5" />
                  <h3 className="text-sm mt-1.5">{item.title}</h3>
                  <p className=" mt-2.5">{item.price}</p>
                </div>
              </Link>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="ml-5 md:ml-0" />
      <CarouselNext className="mr-5 md:mr-0" />
    </Carousel>
  );
};

export default ProductsCarousel;
