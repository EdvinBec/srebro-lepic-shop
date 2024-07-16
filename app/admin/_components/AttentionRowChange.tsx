"use client";

import { Button } from "@/components/ui/button";
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
import { formatCurrency } from "@/lib/formatters";
import { Edit } from "lucide-react";
import React, { useState } from "react";
import { saveAttentionRowMessage } from "../_actions/settings";

type Props = {
  message: string;
};

const AttentionRowChange = ({ message }: Props) => {
  const [currentMessage, setCurrentMessage] = useState("");

  return (
    <Drawer>
      <div className="flex items-center gap-2 mt-4">
        <div>
          <Label>Trenutna poruka: </Label>
          <span>{message || ""}</span>
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
            <DrawerTitle>Promjeni poruku</DrawerTitle>
          </DrawerHeader>
          <div>
            <Input
              type="string"
              placeholder={message || ""}
              onChange={(e: any) => {
                setCurrentMessage(e.target.value);
              }}
            />
          </div>

          <DrawerFooter>
            <Button
              onClick={() => {
                if (!currentMessage) return;
                saveAttentionRowMessage(currentMessage);
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

export default AttentionRowChange;
