import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type Props = {
  slug?: string;
};

const Buttons = [
  {
    label: "prstenje",
  },
  {
    label: "ogrlice",
  },
  {
    label: "nausnice",
  },
  {
    label: "satovi",
  },
];

const Sidebar = ({ slug }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {Buttons.map((button, idx) => {
        return (
          <Button
            key={idx}
            className={`px-4 py-2 border-b-[1px] rounded-none ${
              slug === button.label && " bg-darkGray text-white"
            }`}
            variant="link"
            asChild
          >
            <Link
              className="capitalize"
              href={`/admin/products/categories/${button.label}`}
            >
              {button.label}
            </Link>
          </Button>
        );
      })}
    </div>
  );
};

export default Sidebar;
