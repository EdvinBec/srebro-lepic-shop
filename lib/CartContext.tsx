"use client";

import db from "@/db/db";
import { Product } from "@prisma/client";
import { createContext, useState } from "react";

// Define CartItem type
export type CartItem = {
  id: string;
  quantity: number;
  size: number;
  price: number;
};

// Define CartContextType
type CartContextType = {
  items: CartItem[];
  getProductQuantity: (id: string, size: number) => number;
  addOneToCart: (id: string, size: number, price: number) => void;
  removeOneFromCart: (id: string, size: number) => void;
  deleteFromCart: (id: string, size: number) => void;
  getTotalCost: () => number;
};

export const CartContext = createContext<CartContextType>({
  items: [],
  getProductQuantity: () => {
    throw new Error("getProductQuantity function not implemented");
  },
  addOneToCart: () => {
    throw new Error("addOneToCart function not implemented");
  },
  removeOneFromCart: () => {
    throw new Error("removeOneFromCart function not implemented");
  },
  deleteFromCart: () => {
    throw new Error("deleteFromCart function not implemented");
  },
  getTotalCost: () => {
    throw new Error("getTotalCost function not implemented");
  },
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartProducts, setCartProducts] = useState<CartItem[]>([]);

  const getProductQuantity = (id: string, size: number) => {
    const quantity = cartProducts.find(
      (item) => item.id === id && item.size === size
    )?.quantity;
    return quantity || 0;
  };

  const addOneToCart = (id: string, size: number, price: number) => {
    const existingItem = cartProducts.find(
      (item) => item.id === id && item.size === size
    );

    if (existingItem) {
      const updatedCart = cartProducts.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartProducts(updatedCart);
    } else {
      setCartProducts([...cartProducts, { id, size, quantity: 1, price }]);
    }
  };

  const removeOneFromCart = (id: string, size: number) => {
    const existingItem = cartProducts.find(
      (item) => item.id === id && item.size === size
    );

    if (existingItem) {
      if (existingItem.quantity === 1) {
        deleteFromCart(id, size);
      } else {
        const updatedCart = cartProducts.map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        setCartProducts(updatedCart);
      }
    }
  };

  const deleteFromCart = (id: string, size: number) => {
    const updatedCart = cartProducts.filter(
      (item) => item.id !== id && item.size !== size
    );
    setCartProducts(updatedCart);
  };

  const getTotalCost = () => {
    let totalPrice = 0;
    cartProducts.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });

    return totalPrice;
  };

  const contextValue: CartContextType = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
