import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { cn } from "@/lib/utils";

const PriceRangeSelector = ({
  min = 0,
  max = 1000,
  className,
  onChange,
}: {
  onChange: (value: number[]) => void;
  className?: string;
  max: number;
  min: number;
}) => {
  const [priceRange, setPriceRange] = useState([min, max]);

  const handleSliderChange = (value: any) => {
    setPriceRange(value);
    onChange(value);
  };

  const handleInputChange = (e: any, index: number) => {
    const newRange = [...priceRange];
    newRange[index] = Number(e.target.value);
    setPriceRange(newRange);
    onChange(newRange);
  };

  return (
    <div className={cn(className, "price-range-selector")}>
      <div className="flex w-full items-center justify-center space-x-4 mb-4">
        <input
          type="number"
          value={priceRange[0]}
          onChange={(e) => handleInputChange(e, 0)}
          className="w-20 text-center border-[1px] rounded-[1px] pl-4 py-2"
        />
        <span className="text-xl">-</span>
        <input
          type="number"
          value={priceRange[1]}
          onChange={(e) => handleInputChange(e, 1)}
          className="w-20 text-center border-[1px] rounded-[1px] pl-4 py-2"
        />
      </div>
      <Slider
        range
        min={min}
        max={max}
        value={priceRange}
        onChange={handleSliderChange}
        className="w-full"
        trackStyle={[{ backgroundColor: "#191919" }]}
        handleStyle={{ borderColor: "#191919" }}
      />
    </div>
  );
};

export default PriceRangeSelector;
