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
    value: 3,
    label: 3,
  },
  {
    value: 3.5,
    label: 3.5,
  },
  {
    value: 4,
    label: 4,
  },
  {
    value: 4.5,
    label: 4.5,
  },
  {
    value: 5,
    label: 5,
  },
  {
    value: 6,
    label: 6,
  },
  {
    value: 6.5,
    label: 6.5,
  },
  {
    value: 7,
    label: 7,
  },
  {
    value: 7.5,
    label: 7.5,
  },
  {
    value: 8,
    label: 8,
  },
  {
    value: 8.5,
    label: 8.5,
  },
  {
    value: 9,
    label: 9,
  },
  {
    value: 9.5,
    label: 9.5,
  },
  {
    value: 10,
    label: 10,
  },
  {
    value: 10.5,
    label: 10.5,
  },
  {
    value: 11,
    label: 11,
  },
  {
    value: 11.5,
    label: 11.5,
  },
  {
    value: 12,
    label: 12,
  },
  {
    value: 12.5,
    label: 12.5,
  },
  {
    value: 13,
    label: 13,
  },
  {
    value: 13.5,
    label: 13.5,
  },
  {
    value: 14,
    label: 14,
  },
] satisfies OPTION[];

export function RingSizePicker({
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
