"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  ChevronDown,
  DollarSign,
  Euro,
  Icon,
  IconNode,
  Newspaper,
  Percent,
  Trash,
  icons,
} from "lucide-react";
import { ButtonOption } from "@/types";

type Props = {
  label: string;
  onSave: (label: string) => void;
};

const ButtonOptions = [
  {
    label: "Skuplje naprijed",
    rightIcon: "⇩",
    leftIcon: DollarSign,
    value: "priceAsc",
  },
  {
    label: "Jeftinije naprijed",
    rightIcon: "⇧",
    leftIcon: Euro,
    value: "priceDesc",
  },
  {
    label: "Izbriši filter",
    leftIcon: Trash,
    value: "clear",
  },
];

const DropdownButtonShadcn = ({ label, onSave }: Props) => {
  const [newLabel, setNewLabel] = useState(label);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="rounded-[1px] flex gap-2 items-center focus:outline-none outline-none"
        >
          <span className="capitalize">{newLabel}</span>
          <ChevronDown strokeWidth={1} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rounded-[1px]">
        <DropdownMenuGroup>
          {ButtonOptions.map((item: ButtonOption, itemIdx: number) => {
            const LucideIcon = item.leftIcon;
            return (
              <DropdownMenuItem
                key={itemIdx}
                className="rounded-[1px]"
                onClick={() => {
                  onSave(item.value);
                  setNewLabel(item.label);
                }}
              >
                <LucideIcon className="mr-2 h-4 w-4" />
                <span className="capitalize">{item.label}</span>
                <DropdownMenuShortcut>{item.rightIcon}</DropdownMenuShortcut>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownButtonShadcn;
