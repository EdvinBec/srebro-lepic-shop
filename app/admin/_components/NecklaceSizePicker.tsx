"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

export type OPTION = {
  value: number;
  label: string | number;
};

const OPTIONS = [
  {
    label: "35 cm",
    value: 35,
  },
  {
    label: "36 cm",
    value: 36,
  },
  {
    label: "37 cm",
    value: 37,
  },
  {
    label: "38 cm",
    value: 38,
  },
  {
    label: "39 cm",
    value: 39,
  },
  {
    label: "40 cm",
    value: 40,
  },
  {
    label: "41 cm",
    value: 41,
  },
  {
    label: "42 cm",
    value: 42,
  },
  {
    label: "43 cm",
    value: 43,
  },
  {
    label: "44 cm",
    value: 44,
  },
  {
    label: "45 cm",
    value: 45,
  },
  {
    label: "46 cm",
    value: 46,
  },
  {
    label: "47 cm",
    value: 47,
  },
  {
    label: "48 cm",
    value: 48,
  },
  {
    label: "49 cm",
    value: 49,
  },
  {
    label: "50 cm",
    value: 50,
  },
];

export function NecklaceSizePicker({
  save,
  prevSizes,
}: {
  save: (value: number[]) => void;
  prevSizes: number[];
}) {
  const prevSizesFormatted: OPTION[] = prevSizes
    ? prevSizes.map((size) => {
        return {
          value: size,
          label: size,
        };
      })
    : [];

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<OPTION[]>(prevSizesFormatted);
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    const newArray: number[] = [];
    selected?.forEach((item) => {
      newArray.push(item.value);
    });
    save(newArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const handleUnselect = React.useCallback((framework: OPTION) => {
    setSelected((prev) => prev.filter((s) => s.value !== framework.value));
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );

  const selectables = OPTIONS.filter(
    (framework) => !selected.includes(framework)
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map((framework) => {
            return (
              <Badge key={framework.value} variant="secondary">
                {framework.label}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(framework);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(framework)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Izaberite dostupne veličine"
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((framework) => {
                  return (
                    <CommandItem
                      key={framework.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={(value) => {
                        setInputValue("");
                        setSelected((prev) => [...prev, framework]);
                      }}
                      className={"cursor-pointer"}
                    >
                      {framework.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
}
