"use client";

import React, { useState } from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Logo from "@/public/assets/logo.svg";
import HamburgerMenu from "@/public/assets/Hamburger.svg";
import Image from "next/image";
import Link from "next/link";
import { Label } from "../ui/label";
import CartButton from "../Button/CartButton";
import { NavLink } from "@/types";
import DropdownButton from "../Button/DropdownButton";

type Props = {};

const NavLinks: NavLink[] = [
  {
    label: "Prstenje",
    href: "/prstenje",
  },
  {
    label: "Ogrlice",
    href: "/ogrlice",
  },
  {
    label: "Naušnice",
    href: "/nausnice",
  },
];

const DropdownLinks: NavLink[] = [
  {
    label: "Satovi",
    href: "/satovi",
  },
  {
    label: "Nakit po narudžbi",
    href: "/po-narudzbi",
  },
  {
    label: "Nakit sa porukom",
    href: "/sa-porukom",
  },
];

const NavigationBar = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MaxWidthWrapper className="px-0 md:px-2 lg:px-20">
      <nav className="flex justify-between items-center px-4 py-4">
        <ul className="gap-6 hidden md:flex w-1/3">
          {NavLinks.map((item: NavLink, itemIdx: number) => {
            return (
              <li
                key={itemIdx}
                className="hover:opacity-75 transition-all ease-in-out duration-150"
              >
                <Link className="text-sm text-darkGray" href={item.href}>
                  {item.label}
                </Link>
              </li>
            );
          })}
          <DropdownButton DropdownLinks={DropdownLinks} label="Više" />
        </ul>
        <Link href="/">
          <Image src={Logo} alt="logo" />
        </Link>
        <div className="flex justify-end items-center gap-2 w-1/3">
          <Label className="hidden md:block">BA</Label>
          <button
            className="md:hidden"
            onClick={() => {
              if (isOpen) {
                setIsOpen(false);
              } else setIsOpen(true);
            }}
          >
            <Image src={HamburgerMenu} alt="hamburger" />
          </button>
          <CartButton itemsCount={3} />
        </div>
      </nav>
      <div className="px-4 md:hidden">
        <ul
          className={`flex flex-col gap-2 md:hidden border-y-[1px] py-4 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          {NavLinks.map((item: NavLink, itemIdx: number) => {
            return (
              <li
                key={itemIdx}
                className="hover:opacity-75 transition-all ease-in-out duration-150 py-1"
              >
                <Link className="text-sm text-darkGray" href={item.href}>
                  {item.label}
                </Link>
              </li>
            );
          })}
          {DropdownLinks.map((item: NavLink, itemIdx: number) => {
            return (
              <li
                key={itemIdx}
                className="hover:opacity-75 transition-all ease-in-out duration-150 py-1"
              >
                <Link className="text-sm text-darkGray" href={item.href}>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </MaxWidthWrapper>
  );
};

export default NavigationBar;
