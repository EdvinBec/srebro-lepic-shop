import Image from "next/image";
import React from "react";
import Cart from "@/public/assets/Cart.svg";

type Props = {
  itemsCount: number;
  onClick?: () => void;
};

const CartButton = ({ itemsCount, onClick }: Props) => {
  return (
    <button
      className="flex mt-3.5 hover:opacity-75 transition-all duration-150"
      onClick={onClick}
    >
      <Image src={Cart} alt="cart" />
      <span className="px-2 mt-3 py-1 rounded-full text-white text-[10px] bg-darkGray">
        {itemsCount}
      </span>
    </button>
  );
};

export default CartButton;
