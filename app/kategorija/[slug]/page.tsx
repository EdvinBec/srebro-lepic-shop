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
  BarChart,
  DollarSign,
  Euro,
  Minus,
  Newspaper,
  Percent,
  Plus,
  Sparkles,
  Star,
  StarHalf,
  Trash,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Bar, ResponsiveContainer } from "recharts";
import Roza from "@/public/assets/Roza.jpg";
import { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/assets/logo.svg";
import { formatCurrency } from "@/lib/utils";

const ProductsFake: Product[] = [
  {
    image: Roza,
    title: "SLRO - Nausnice 1",
    price: 999,
    category: "nausnice",
  },
  {
    image: Roza,
    title: "SLRO - Nausnice 2",
    price: 560,
    category: "nausnice",
  },
  {
    image: Roza,
    title: "SLRO - Nausnice 3",
    price: 94,
    category: "nausnice",
  },
  {
    image: Roza,
    title: "SLRO - Ogrlica 1",
    price: 10,
    category: "ogrlice",
  },
  {
    image: Roza,
    title: "SLRO - Ogrlica 2",
    price: 200,
    category: "ogrlice",
  },
  {
    image: Roza,
    title: "SLRO - Ogrlica 3",
    price: 300,
    category: "ogrlice",
  },
  {
    image: Roza,
    title: "SLRO - Prsten 1",
    price: 100,
    category: "prstenje",
  },
  {
    image: Roza,
    title: "SLRO - Prsten 2",
    price: 300,
    category: "prstenje",
    material: "Zlato",
  },
  {
    image: Roza,
    title: "SLRO - Prsten 3",
    price: 300,
    category: "prstenje",
  },
];

type Props = {
  params: { slug: string };
};

const CategoryPage = ({ params }: Props) => {
  const [goal, setGoal] = useState(30);
  const [sort, setSort] = useState("random"); // Sorting products by option
  const [material, setMaterial] = useState("all"); // Sorting products by material
  const [ringSize, setRingSize] = useState(goal);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [products, setProducts] = useState(ProductsFake);

  useEffect(() => {
    filterAndSortProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, material, priceRange]);

  const filterAndSortProducts = () => {
    let filteredProducts = ProductsFake.filter(
      (item: Product) =>
        item.category === params.slug &&
        item.price >= priceRange[0] &&
        item.price <= priceRange[1] &&
        (item.material === material || material === "all")
    );

    if (sort === "Skuplje naprijed") {
      filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sort === "Jeftinije naprijed") {
      filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "Veći popust naprijed") {
      // Add logic for discount sorting if applicable
    } else if (sort === "Novije naprijed") {
      // Add logic for date sorting if applicable
    }

    setProducts(filteredProducts);
  };

  const SetPriceRange = (range: number[]) => {
    setPriceRange(range);
  };

  const MaterialSort = (name: string) => {
    setMaterial(name);
  };

  const SortElements = (name: string) => {
    setSort(name);
  };

  function onClick(adjustment: number) {
    setGoal(Math.max(30, Math.min(70, goal + adjustment)));
  }

  const SortButtonOptions = [
    {
      label: "Skuplje naprijed",
      rightIcon: "⇩",
      leftIcon: DollarSign,
      function: () => SortElements("Skuplje naprijed"),
    },
    {
      label: "Jeftinije naprijed",
      rightIcon: "⇧",
      leftIcon: Euro,
      function: () => SortElements("Jeftinije naprijed"),
    },
    {
      label: "Veći popust naprijed",
      rightIcon: "%",
      leftIcon: Percent,
      function: () => SortElements("Veći popust naprijed"),
    },
    {
      label: "Novije naprijed",
      rightIcon: "⌘",
      leftIcon: Newspaper,
      function: () => SortElements("Novije naprijed"),
    },
    {
      label: "Izbriši filter",
      leftIcon: Trash,
      function: () => SortElements("random"),
    },
  ];

  const MaterialButtonOptions = [
    {
      label: "Gvožđe",
      leftIcon: StarHalf,
      function: () => MaterialSort("Gvožđe"),
    },
    {
      label: "Srebro",
      leftIcon: Star,
      function: () => MaterialSort("Srebro"),
    },
    {
      label: "Zlato",
      leftIcon: Sparkles,
      function: () => MaterialSort("Zlato"),
    },
    {
      label: "Izbriši filter",
      leftIcon: Trash,
      function: () => MaterialSort("all"),
    },
  ];

  return (
    <div className="flex gap-4">
      <div className="w-1/4 md:flex flex-col items-start hidden">
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
        <div className="flex gap-5 ml-2 flex-wrap">
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
                          style={{
                            fill: "hsl(var(--foreground))",
                            opacity: 0.9,
                          }}
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
                    currentPrices={priceRange}
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
        <div className="mt-8 grid justify-items-center  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {products.map((item: Product, itemIdx: number) => {
            return (
              <Link
                href="/"
                key={itemIdx}
                className="p-2 hover:shadow-sm transition-all duration-200 hover:opacity-85"
              >
                <div className="">
                  <Image
                    src={item.image}
                    alt={item.title}
                    height={200}
                    width={300}
                    className="object-cover rounded-[1px] h-[200px] w-[300px]"
                  />
                  <Image src={Logo} alt="logo" height={17} className="mt-2.5" />
                  <h3 className="text-sm mt-1.5">{item.title}</h3>
                  <p className=" mt-2.5">{formatCurrency(item.price)}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
