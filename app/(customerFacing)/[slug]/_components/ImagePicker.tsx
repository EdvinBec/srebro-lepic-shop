"use client";

import Image from "next/image";
import React, { useState } from "react";

type Props = {
  imagess: string[];
  productName: string;
};

const swapPlaces = (arr: any[], index1: number, index2: number) => {
  const temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
};

const ImagePicker = ({ imagess, productName }: Props) => {
  const [images, setImages] = useState<string[]>(imagess);

  const handleImageClick = (index1: number, index2: number) => {
    const newImages = [...images];
    swapPlaces(newImages, index1, index2);
    setImages(newImages);
  };

  return (
    <div className="flex flex-col xl:flex-row gap-5">
      <div
        className={`flex xl:flex-col gap-4 ${images.length == 1 && "hidden"}`}
      >
        <div className="relative w-24 h-24 flex items-center overflow-hidden">
          <Image
            alt={productName}
            src={images[1]}
            layout="responsive"
            width={100}
            height={100}
            className="cursor-pointer hover:opacity-75 transition-all ease-in-out duration-150"
            onClick={() => handleImageClick(0, 1)}
          />
        </div>
        <div
          className={`relative w-24 h-24 flex items-center overflow-hidden ${
            images.length < 3 && "hidden"
          }`}
        >
          <Image
            alt={productName}
            src={images[2]}
            layout="responsive"
            width={100}
            height={100}
            className="cursor-pointer hover:opacity-75 transition-all ease-in-out duration-150"
            onClick={() => handleImageClick(0, 2)}
          />
        </div>
        <div
          className={`relative w-24 h-24 flex items-center overflow-hidden ${
            images.length < 4 && "hidden"
          }`}
        >
          <Image
            alt={productName}
            src={images[3]}
            layout="responsive"
            width={100}
            height={100}
            className="cursor-pointer hover:opacity-75 transition-all ease-in-out duration-150"
            onClick={() => handleImageClick(0, 3)}
          />
        </div>
      </div>
      <div className="xl:w-4/5 h-[500px] flex justify-center items-center overflow-hidden">
        <Image alt={productName} src={images[0]} width={600} height={500} />
      </div>
    </div>
  );
};

export default ImagePicker;
