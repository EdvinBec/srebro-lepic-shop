"use client";

import { useCart } from "@/hooks/use-cart";
import React, { useEffect } from "react";

const CartClear = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default CartClear;
