"use client";

import { NavLink } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import ArrowDown from "@/public/assets/ArrowDown.svg";
import Link from "next/link";

type Props = {
  DropdownLinks: NavLink[];
  label: string;
  onClick?: () => void;
};

const DropdownButton = ({ DropdownLinks, label, onClick }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      onMouseEnter={() => {
        setIsOpen(true);
      }}
      onMouseLeave={() => {
        setIsOpen(false);
      }}
      onClick={onClick}
    >
      <span className="flex items-center gap-[5px] text-sm text-darkGray hover:opacity-75 transition-all ease-in-out duration-150">
        {label}
        <Image className="w-[12px]" src={ArrowDown} alt="arrow-down" />
      </span>
      <ul
        className={`absolute shadow-md rounded-sm ${!isOpen && "hidden"} ${
          isOpen && "block"
        }`}
      >
        {DropdownLinks.map((item: NavLink, itemIdx: number) => {
          return (
            <li
              className="px-4 py-2 text-left text-sm hover:opacity-75 transition-all ease-in-out duration-150"
              key={itemIdx}
            >
              <Link href={item.href}>{item.label}</Link>
            </li>
          );
        })}
      </ul>
    </button>
  );
};

export default DropdownButton;
