"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useState, useTransition } from "react";
import {
  addDiscount,
  deleteProduct,
  removeDiscount,
  toggleIsFeatured,
  toggleProductAvailability,
} from "../../_actions/products";
import { useRouter } from "next/navigation";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

export const ActiveToggleDropdownItem = ({
  id,
  isAvailabileForPurchase,
}: {
  id: string;
  isAvailabileForPurchase: boolean;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await toggleProductAvailability(id, !isAvailabileForPurchase);
          router.refresh();
        });
      }}
    >
      {isAvailabileForPurchase ? "Deaktiviraj" : "Aktiviraj"}
    </DropdownMenuItem>
  );
};

export const FeaturedToggleDropdownItem = ({
  id,
  isFeatured,
}: {
  id: string;
  isFeatured: boolean;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <DropdownMenuItem
      onClick={() => {
        startTransition(async () => {
          await toggleIsFeatured(id, !isFeatured);
          router.refresh();
        });
      }}
    >
      {isFeatured ? "Ukloni iz istaknutih" : "Dodaj u istaknute"}
    </DropdownMenuItem>
  );
};

export const DeleteDropdownItem = ({
  id,
  disabled,
}: {
  id: string;
  disabled: boolean;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <DropdownMenuItem
      className="text-red-500"
      disabled={disabled || isPending}
      onClick={() => {
        startTransition(async () => {
          await deleteProduct(id);
        });
      }}
    >
      Izbriši
    </DropdownMenuItem>
  );
};

export const RemoveDiscountDropdown = ({
  id,
  oldPrice,
}: {
  id: string;
  oldPrice: number;
}) => {
  return (
    <DropdownMenuItem
      onClick={async () => {
        await removeDiscount(id, oldPrice);
      }}
    >
      Izbrisi popust
    </DropdownMenuItem>
  );
};

export const AddDiscountDrawer = ({
  id,
  oldPrice,
}: {
  id: string;
  oldPrice: number;
}) => {
  const [newPrice, setNewPrice] = useState(0);

  return (
    <DrawerContent>
      <div className="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle>Dodaj popust</DrawerTitle>
        </DrawerHeader>
        <div>
          <Input
            type="number"
            onChange={(e) => setNewPrice(Number(e.target.value))}
          />
        </div>
        <DrawerFooter>
          <Button
            variant="secondary"
            onClick={async () => {
              await addDiscount(id, newPrice, oldPrice);
            }}
          >
            Potvrdi
          </Button>
          <DrawerClose asChild>
            <Button className="border-[1px]">Prekini</Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  );
};
