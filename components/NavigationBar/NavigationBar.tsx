import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Link from "next/link";
import { Icons } from "../Icons";
import NavItems from "./NavItems";
import Cart from "../Cart";

type Props = {};

const NavigationBar = (props: Props) => {
  return (
    <nav className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              {/* TODO: Mobile navigation */}

              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <Icons.logo />
                </Link>
              </div>

              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-y-6">
                  <div className="flow-root ml-4 lg:ml-6">
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </nav>
  );
};

export default NavigationBar;
