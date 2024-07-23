"use client";

import Image from "next/image";
import React, { useState } from "react";

type Props = {
  imagess: string[];
  productName: string;
};

const ImagePicker = ({ imagess, productName }: Props) => {
  const [images, setImages] = useState<string[]>(imagess);

  const handleImageClick = (index: number) => {
    if (index !== 0) {
      setImages((prevImages) => {
        const newImages = [...prevImages];
        [newImages[0], newImages[index]] = [newImages[index], newImages[0]];
        return newImages;
      });
    }
  };

  return (
    <div className="flex flex-col xl:flex-row gap-5">
      {images.length > 1 && (
        <div className="flex xl:flex-col gap-4">
          {images.slice(1, 4).map((image, idx) => (
            <div
              key={idx}
              className="relative w-24 h-24 flex items-center overflow-hidden"
            >
              <Image
                loading="lazy"
                alt={productName}
                src={image}
                layout="responsive"
                width={100}
                height={100}
                className="cursor-pointer hover:opacity-75 transition-all ease-in-out duration-150"
                onClick={() => handleImageClick(idx + 1)}
              />
            </div>
          ))}
        </div>
      )}
      <div className="xl:w-4/5 flex justify-center items-center overflow-hidden">
        <Image
          alt={productName}
          src={images[0]}
          width={600}
          height={500}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default ImagePicker;
