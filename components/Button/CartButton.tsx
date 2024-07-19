import Image from "next/image";
import React from "react";
import Cart from "@/public/assets/Cart.svg";
import Link from "next/link";

type Props = {
  itemsCount: number;
};

const CartButton = ({ itemsCount }: Props) => {
  return (
    <Link
      href="/cart"
      className="flex p-0 mt-3.5 hover:opacity-75 transition-all duration-150"
    >
      <Image src={Cart} alt="cart" />
      <span className="px-2 mt-3 py-1 rounded-full text-white text-[10px] bg-darkGray">
        {itemsCount}
      </span>
    </Link>
  );
};

export default CartButton;
