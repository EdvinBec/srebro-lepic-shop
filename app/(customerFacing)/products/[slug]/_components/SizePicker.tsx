"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  label: string;
  availableSizes: number[];
  onSave: (number: number) => void;
  className?: string;
  unit?: string;
};

const SizePicker = ({
  label,
  availableSizes,
  onSave,
  className,
  unit,
}: Props) => {
  const [newLabel, setNewLabel] = useState<string | number>(label);

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="w-full">
          <Button
            variant="outline"
            className="rounded-[1px] flex gap-2 items-center focus:outline-none outline-none"
          >
            <span className="capitalize">{newLabel}</span>
            <ChevronDown strokeWidth={1} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-[1px]">
          <DropdownMenuGroup>
            {availableSizes.map((item: number, itemIdx: number) => {
              return (
                <DropdownMenuItem
                  key={itemIdx}
                  className="rounded-[1px]"
                  onClick={() => {
                    onSave(item);
                    setNewLabel(item);
                  }}
                >
                  <span>
                    {item} {unit}
                  </span>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SizePicker;
