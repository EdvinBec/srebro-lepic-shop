"use client";

import PriceRangeSelector from "@/components/RangeSelector";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import React, { useState } from "react";

type Props = {
  onSubmit: (prices: number[]) => void;
};

const PriceRangePicker = ({ onSubmit }: Props) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="rounded-[1px] flex gap-2 items-center focus:outline-none outline-none"
        >
          Cena
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Cijena</DrawerTitle>
            <DrawerDescription>
              Izaberite raspon cijene koji vam odgovara
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <PriceRangeSelector
              currentPrices={priceRange}
              className="mt-4 mb-12"
              onChange={(prices) => setPriceRange(prices)}
              min={0}
              max={1000}
            />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button
                className="rounded-[1px]"
                onClick={() => onSubmit(priceRange)}
              >
                Potvrdi
              </Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button variant="outline" className="rounded-[1px]">
                Prekini
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default PriceRangePicker;
