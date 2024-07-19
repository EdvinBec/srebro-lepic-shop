import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Label } from "./ui/label";
import Button from "@/components/Button/Button";
import MaxWidthWrapper from "./MaxWidthWrapper";

import Logo from "@/public/assets/LogoWhiteStar.svg";
import Facebook from "@/public/assets/Facebook.svg";
import Instagram from "@/public/assets/Instagram.svg";
import Youtube from "@/public/assets/Youtube.svg";
import TikTok from "@/public/assets/Tiktok.svg";
import { cn } from "@/lib/utils";
import { Shell, ShieldQuestion, ShoppingBag } from "lucide-react";

type Props = {
  className?: string;
};

const Footer = ({ className }: Props) => {
  return (
    <footer
      className={cn(
        className,
        "bg-accentYellow w-full py-4 md:py-10 text-darkGray print:hidden"
      )}
    >
      <MaxWidthWrapper className="flex flex-col gap-8 md:flex-row justify-between">
        <div className="md:w-2/3">
          <div className="hidden md:block">
            <Image
              src={Logo}
              alt="Srebro Lepic logo"
              className="max-w-[200px]"
            />
            <Label className="text-sm mt-1">
              Sa zadovoljstvom ispunjavamo vaše želje.
            </Label>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-12 md:mt-12 mb-4 md:mb-0">
            <div className="mt-8">
              <div className="flex items-center gap-2">
                <Shell />
                <span className="text-2xl uppercase tracking-wide font-black font-boska">
                  Naša obećanja
                </span>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <Link
                  className="text-sm font-semibold hover:underline text-nowrap"
                  href="#"
                >
                  Besplatna dostava iznad 49,00 KM
                </Link>
                <Link
                  className="text-sm font-semibold hover:underline text-nowrap"
                  href="#"
                >
                  Dostupni načini plaćanja
                </Link>
                <Link
                  className="text-sm font-semibold hover:underline text-nowrap"
                  href="#"
                >
                  Politika povrata
                </Link>
              </div>
            </div>
            <div className="mt-8">
              <div className="flex items-center gap-2">
                <ShieldQuestion />
                <span className="text-2xl uppercase tracking-wide font-black font-boska">
                  Pomoć i kontakt
                </span>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <Link
                  className="text-sm font-semibold hover:underline text-nowrap"
                  href="#"
                >
                  Informacije o dostavi
                </Link>
                <Link
                  className="text-sm font-semibold hover:underline text-nowrap"
                  href="#"
                >
                  Nadji pravu veličinu
                </Link>
                <Link
                  className="text-sm font-semibold hover:underline text-nowrap"
                  href="#"
                >
                  Kontaktne informacije
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:justify-between md:items-end">
          <div className="flex md:gap-24 justify-between">
            <div className="flex flex-col justify-between md:hidden">
              <div>
                <Image
                  src={Logo}
                  alt="Srebro Lepic logo"
                  className="max-w-[150px]"
                />
                <Label className="text-sm mt-1">
                  Sa zadovoljstvom ispunjavamo <br /> vaše želje.
                </Label>
              </div>
              <div className="flex gap-2">
                <Link
                  href="privacy-policy"
                  className="text-sm opacity-90 hover:opacity-75 transition-all duration-150"
                >
                  Uslovi korištenja
                </Link>
                <Link
                  href="privacy-policy"
                  className="text-sm opacity-90 hover:opacity-75 transition-all duration-150"
                >
                  Politika privatnosti
                </Link>
              </div>
            </div>

            <div>
              <Label className="text-sm text-darkGray">Nadjite nas na</Label>
              <div className="flex gap-4 md:gap-8 mt-7">
                <Link href="#">
                  <Image
                    src={Facebook}
                    alt="Facebook"
                    className="hover:opacity-75 transition-all duration-150"
                  />
                </Link>
                <Link href="#">
                  <Image
                    src={Instagram}
                    alt="Instagram"
                    className="hover:opacity-75 transition-all duration-150"
                  />
                </Link>
              </div>
              <div className="flex gap-4 md:gap-8 mt-6 md:mt-10">
                <Link href="#">
                  <Image
                    src={TikTok}
                    alt="Tiktok"
                    className="hover:opacity-75 transition-all duration-150"
                  />
                </Link>
                <Link href="#">
                  <Image
                    src={Youtube}
                    alt="Youtube"
                    className="hover:opacity-75 transition-all duration-150"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:flex flex-col md:flex-row gap-5">
            <Link
              href="privacy-policy"
              className="text-sm opacity-90 hover:opacity-75 transition-all duration-150"
            >
              Uslovi korištenja
            </Link>
            <Link
              href="privacy-policy"
              className="text-sm opacity-90 hover:opacity-75 transition-all duration-150"
            >
              Politika privatnosti
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
