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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/formatters";
import { Edit } from "lucide-react";
import React, { useState } from "react";
import { onSubmit } from "../_actions/settings";

type Props = {
  deliveryFee: number;
};

const ChangeOrderPrice = ({ deliveryFee }: Props) => {
  const [amount, setAmount] = useState<number>();

  return (
    <Drawer>
      <div className="flex items-center gap-2 mt-4">
        <div>
          <Label>Cijena dostave: </Label>
          <span>{formatCurrency(deliveryFee || 0)}</span>
        </div>
        <DrawerTrigger asChild>
          <Button className="border-[1px]" variant="ghost" size="sm">
            <Edit size={12} />
          </Button>
        </DrawerTrigger>
      </div>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Promjeni cijenu dostave</DrawerTitle>
            <DrawerDescription>
              Unesi cijenu u ovom fromatu: 10
            </DrawerDescription>
          </DrawerHeader>
          <div>
            <Input
              type="number"
              placeholder="10"
              onChange={(e: any) => {
                setAmount(e.target.value);
              }}
            />
          </div>

          <DrawerFooter>
            <Button
              onClick={() => {
                if (!amount) return;
                onSubmit(amount);
              }}
            >
              Potvrdi
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Prekini</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ChangeOrderPrice;
