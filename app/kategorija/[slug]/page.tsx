"use client";

import DropdownButtonShadcn from "@/components/Button/DropdownButtonShadcn";
import Heading from "@/components/Heading";
import PriceRangeSelector from "@/components/RangeSelector";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BarChart,
  ChevronDown,
  DollarSign,
  Euro,
  Minus,
  Newspaper,
  Percent,
  Plus,
  Sparkles,
  Star,
  StarHalf,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Bar, ResponsiveContainer } from "recharts";

type Props = {
  params: { slug: string };
};

const CategoryPage = ({ params }: Props) => {
  const [goal, setGoal] = useState(30);
  const [sort, setSort] = useState("random"); //Sorting products by option
  const [material, setMaterial] = useState("all"); //Sorting products by material
  const [ringSize, setRingSize] = useState(goal);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const SetPriceRange = (range: number[]) => {
    setPriceRange(range);
  };

  const MaterialSort = (name: string) => {
    setMaterial(name);
  };

  const SortElements = (name: string) => {
    setSort(name);
    console.log(sort);
  };

  function onClick(adjustment: number) {
    setGoal(Math.max(30, Math.min(70, goal + adjustment)));
  }

  const SortButtonOptions = [
    {
      label: "Skuplje naprijed",
      rightIcon: "⇩",
      leftIcon: DollarSign,
      function: SortElements,
    },
    {
      label: "Jeftinije naprijed",
      rightIcon: "⇧",
      leftIcon: Euro,
      function: SortElements,
    },
    {
      label: "Veći popust naprijed",
      rightIcon: "%",
      leftIcon: Percent,
      function: SortElements,
    },
    {
      label: "Novije naprijed",
      rightIcon: "⌘",
      leftIcon: Newspaper,
      function: SortElements,
    },
  ];
  const MaterialButtonOptions = [
    {
      label: "Gvožđe",
      leftIcon: StarHalf,
      function: MaterialSort,
    },
    {
      label: "Srebro",
      leftIcon: Star,
      function: MaterialSort,
    },
    {
      label: "Zlato",
      leftIcon: Sparkles,
      function: MaterialSort,
    },
  ];

  return (
    <div className="flex">
      <div className="w-1/4 flex flex-col items-start">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Početak</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize">
                {params.slug}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Heading star={false} side="left" className="mt-8">
          {params.slug}
        </Heading>
      </div>
      <div className="w-full">
        <div className="flex gap-5">
          <DropdownButtonShadcn
            label="Poredaj po"
            ButtonOptions={SortButtonOptions}
          />

          <Drawer>
            <DrawerTrigger asChild>
              <Button
                variant="outline"
                className={`rounded-[1px] flex gap-2 items-center focus:outline-none outline-none ${
                  params.slug === "nausnice" && "hidden"
                }`}
              >
                Veličina
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Veličina</DrawerTitle>
                  <DrawerDescription>
                    Izaberite veličinu {params.slug === "ogrlice" && "ogrlice"}{" "}
                    {params.slug === "prstenje" && "prstena"} koja vam odgovara
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0">
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                      onClick={() => onClick(-1)}
                      disabled={goal <= 30}
                    >
                      <Minus className="h-4 w-4" />
                      <span className="sr-only">Decrease</span>
                    </Button>
                    <div className="flex-1 text-center">
                      <div className="text-7xl font-bold tracking-tighter">
                        {goal}
                      </div>
                      <div className="text-[0.70rem] uppercase text-muted-foreground">
                        milimetara / mm
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                      onClick={() => onClick(1)}
                      disabled={goal >= 70}
                    >
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Increase</span>
                    </Button>
                  </div>
                  <div className="mt-3 h-[120px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart>
                        <Bar
                          dataKey="goal"
                          style={
                            {
                              fill: "hsl(var(--foreground))",
                              opacity: 0.9,
                            } as React.CSSProperties
                          }
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button
                      className="rounded-[1px]"
                      onClick={() => {
                        setRingSize(goal);
                      }}
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
                    className="mt-4 mb-12"
                    onChange={SetPriceRange}
                    min={0}
                    max={1000}
                  />
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button className="rounded-[1px]">Potvrdi</Button>
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

          <DropdownButtonShadcn
            label="Material"
            ButtonOptions={MaterialButtonOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
