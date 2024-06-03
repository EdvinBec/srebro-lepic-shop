"use client";

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
import { BarChart, Minus, Plus } from "lucide-react";
import React, { useState } from "react";
import { Bar, ResponsiveContainer } from "recharts";

type Props = {
  slug: string;
  onSubmit: (goal: number) => void;
};

const SizePicker = ({ slug, onSubmit }: Props) => {
  const [goal, setGoal] = useState(30);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className={`rounded-[1px] flex gap-2 items-center focus:outline-none outline-none ${
            slug === "nausnice" && "hidden"
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
              Izaberite veličinu {slug === "ogrlice" && "ogrlice"}{" "}
              {slug === "prstenje" && "prstena"} koja vam odgovara
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => setGoal(goal - 1)}
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
                onClick={() => setGoal(goal + 1)}
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
                  onSubmit(goal);
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
  );
};

export default SizePicker;
