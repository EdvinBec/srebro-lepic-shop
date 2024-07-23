import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Define CartProduct type
export type CartProduct = {
  id: string;
  name: string;
  image: string[];
  priceInCents: number;
  oldPrice: number;
  availableSizes: number[];
  weightInGrams: number;
  description: string;
  category: string;
};

// Define CartItem type
export type CartItem = {
  product: CartProduct;
  quantity: number;
  size: number;
};

// Define CartState type
type CartState = {
  items: CartItem[];
  getProductQuantity: (id: string, size: number) => number;
  addItem: (product: CartProduct, size: number) => void;
  removeItem: (id: string, size: number) => void;
  deleteFromCart: (id: string, size: number) => void;
  getTotalCost: () => number;
  clearCart: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      getProductQuantity: (id, size) => {
        const item = get().items.find(
          (item) => item.product.id === id && item.size === size
        );
        return item ? item.quantity : 0;
      },
      addItem: (product, size) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id && item.size === size
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id && item.size === size
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return {
              items: [...state.items, { product, quantity: 1, size }],
            };
          }
        }),
      removeItem: (id, size) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === id && item.size === size
          );
          if (existingItem) {
            if (existingItem.quantity === 1) {
              return {
                items: state.items.filter(
                  (item) => !(item.product.id === id && item.size === size)
                ),
              };
            } else {
              return {
                items: state.items.map((item) =>
                  item.product.id === id && item.size === size
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
                ),
              };
            }
          }
          return state;
        }),
      deleteFromCart: (id, size) =>
        set((state) => {
          return {
            items: state.items.filter(
              (item) => !(item.product.id === id && item.size === size)
            ),
          };
        }),
      getTotalCost: () => {
        return get().items.reduce(
          (total, item) => total + item.product.priceInCents * item.quantity,
          0
        );
      },
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
