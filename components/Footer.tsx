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

type Props = {
  className?: string;
};

const Footer = ({ className }: Props) => {
  return (
    <footer
      className={cn(className, "bg-accentYellow w-full py-11 text-darkGray")}
    >
      <MaxWidthWrapper className="flex flex-col gap-8 md:flex-row justify-between">
        <div className="md:w-1/3">
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
          <div className="mt-0 md:mt-12 flex flex-col items-center md:block">
            <h2 className="text-2xl font-medium text-darkGray">
              Prijavite se na novosti
            </h2>
            <p className="text-sm mt-2">
              Ako želite ostati u skaldu sa našim popustima i akcijama.
              Prijavite se na naše novosti i budite obavješteni o svemu putem
              e-maila.
            </p>
            <input
              type="text"
              placeholder="Unesite svoj email"
              className="rounded-none bg-accentYellow border-b-[1px] border-black py-1
                placeholder:text-darkGray placeholder:text-sm focus:outline-none mt-7"
            />
            <Button className="block mt-4" variant="secondary">
              Prijavi se
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:justify-between md:items-end">
          <div className="flex md:gap-24 justify-between">
            <div className="hidden md:flex flex-col">
              <Label className="text-sm text-darkGray">Navigacija</Label>
              <ul className="flex flex-col gap-5 mt-7">
                <Link
                  href="/kategorije"
                  className=" text-[18px] font-medium hover:opacity-75 transition-all duration-150"
                >
                  Kategorije
                </Link>
                <Link
                  href="/kategorije"
                  className=" text-[18px] font-medium hover:opacity-75 transition-all duration-150"
                >
                  O nama
                </Link>
                <Link
                  href="/kategorije"
                  className=" text-[18px] font-medium hover:opacity-75 transition-all duration-150"
                >
                  Kontakt
                </Link>
              </ul>
            </div>
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
              <div className="flex flex-col md:flex-row gap-2">
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
