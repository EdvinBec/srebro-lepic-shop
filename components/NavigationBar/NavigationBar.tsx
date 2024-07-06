"use client";

import React, { useContext, useState } from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Logo from "@/public/assets/logo.svg";
import HamburgerMenu from "@/public/assets/Hamburger.svg";
import Image from "next/image";
import Link from "next/link";
import CartButton from "../Button/CartButton";
import { NavLink } from "@/types";
import DropdownButton from "../Button/DropdownButton";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { CartContext } from "@/lib/CartContext";

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
    href: "/kategorija/satovi",
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
  const cart = useContext(CartContext);

  const productsCount = cart.items.length;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <MaxWidthWrapper className="px-0 md:px-2 lg:px-20 print:hidden">
      <nav className="flex justify-between items-center py-4 pl-8 pr-4 md:px-0 print:hidden">
        <ul className="gap-6 hidden md:flex w-1/3">
          {NavLinks.map((item: NavLink, itemIdx: number) => {
            return (
              <li
                key={itemIdx}
                className="hover:opacity-90 transition-all ease-in-out duration-150"
              >
                <div className="group inline-block">
                  <Link
                    className="text-sm text-darkGray relative pb-1"
                    href={`/kategorija${item.href}`}
                  >
                    {item.label}
                    <span className="absolute left-1/2 bottom-0 h-[1px] w-0 bg-current transition-all duration-500 group-hover:w-full group-hover:left-0"></span>
                  </Link>
                </div>
              </li>
            );
          })}
          <DropdownButton DropdownLinks={DropdownLinks} label="Više" />
        </ul>
        <Link href="/">
          <Image src={Logo} alt="logo" />
        </Link>
        <div className="flex justify-end items-center gap-2 w-1/3">
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
          <CartButton itemsCount={productsCount} />
        </div>
      </nav>
      <div className="px-4 md:hidden mb-4">
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
                onClick={() => setIsOpen(false)}
              >
                <Link
                  className="text-sm text-darkGray"
                  href={`/kategorija${item.href}`}
                >
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
                onClick={() => setIsOpen(false)}
              >
                <Link className="text-sm text-darkGray" href={`${item.href}`}>
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
