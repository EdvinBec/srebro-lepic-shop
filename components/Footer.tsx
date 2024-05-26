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
            <Button className="block" variant="secondary">
              Prijavi se
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:justify-between md:items-end">
          <div className="flex md:gap-24 justify-between">
            <div className="hidden md:flex flex-col">
              <Label className="text-sm text-darkGray">Navigacija</Label>
              <ul className="flex flex-col gap-5 mt-7">
                <Link href="/kategorije" className=" text-[18px] font-medium">
                  Kategorije
                </Link>
                <Link href="/kategorije" className=" text-[18px] font-medium">
                  O nama
                </Link>
                <Link href="/kategorije" className=" text-[18px] font-medium">
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
                  Sa zadovoljstvom ispunjavamo vaše želje.
                </Label>
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <Link href="privacy-policy" className="text-sm opacity-90">
                  Uslovi korištenja
                </Link>
                <Link href="privacy-policy" className="text-sm opacity-90">
                  Politika privatnosti
                </Link>
              </div>
            </div>

            <div>
              <Label className="text-sm text-darkGray">Nadjite nas na</Label>
              <div className="flex gap-4 md:gap-8 mt-7">
                <Image src={Facebook} alt="Facebook" />
                <Image src={Instagram} alt="Instagram" />
              </div>
              <div className="flex gap-4 md:gap-8 mt-6 md:mt-10">
                <Image src={TikTok} alt="Tiktok" />
                <Image src={Youtube} alt="Youtube" />
              </div>
            </div>
          </div>
          <div className="hidden md:flex flex-col md:flex-row gap-5">
            <Link href="privacy-policy" className="text-sm opacity-90">
              Uslovi korištenja
            </Link>
            <Link href="privacy-policy" className="text-sm opacity-90">
              Politika privatnosti
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
