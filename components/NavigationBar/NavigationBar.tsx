"use client";

import React, { useState } from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Link from "next/link";
import { Icons } from "../Icons";
import NavItems from "./NavItems";
import Cart from "../Cart";
import { PRODUCT_CATEGORIES } from "@/config";
import { MenuIcon, XIcon } from "lucide-react";

type Props = {};

const MobileNavItems = ({ closeMenu }: { closeMenu: () => void }) => (
  <div className="lg:hidden">
    {PRODUCT_CATEGORIES.map((category) =>
      category.featured.map((item, i) => {
        return (
          <Link href={`${item.href}`} key={i}>
            <div className="py-2 px-4" onClick={closeMenu}>
              {item.name}
            </div>
          </Link>
        );
      })
    )}
  </div>
);

const NavigationBar = (props: Props) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <Icons.logo />
                </Link>
              </div>

              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>

              <div className="flex ml-auto">
                <div className="ml-auto flex items-center lg:hidden">
                  <button
                    type="button"
                    className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
                    onClick={toggleMobileMenu}
                  >
                    {isMobileMenuOpen ? (
                      <XIcon className="h-6 w-6" />
                    ) : (
                      <MenuIcon className="h-6 w-6" />
                    )}
                  </button>
                </div>

                <div className="ml-auto flex items-center lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-y-6">
                  <div className="flow-root ml-4 lg:ml-6">
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden">
              <MobileNavItems closeMenu={() => setIsMobileMenuOpen(false)} />
            </div>
          )}
        </MaxWidthWrapper>
      </header>
    </nav>
  );
};

export default NavigationBar;
