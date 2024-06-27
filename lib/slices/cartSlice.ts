import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  productId: string;
  size: number;
  quantity: number;
}

const CartSlice = createSlice({
  name: "order",
  initialState: [],
  reducers: {
    addCartItem(
      state: CartItem[],
      action: PayloadAction<{ productId: string; size: number }>
    ) {
      const { productId, size } = action.payload;
      const existingItem = state.find(
        (item: CartItem) => item.productId === productId && item.size === size
      );

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.push({
          productId,
          size,
          quantity: 1,
        });
      }
    },

    incrementQunatity(state: CartItem[], action: PayloadAction<CartItem>) {
      const item = state.find(
        (item: CartItem) => item.productId === action.payload.productId
      );
      item!.quantity++;
    },
    decrementQunatity(state: CartItem[], action: PayloadAction<CartItem>) {
      const item = state.find(
        (item: CartItem) => item.productId === action.payload.productId
      );
      item!.quantity--;
    },
    removeFromCart(
      state: CartItem[],
      action: PayloadAction<{ productId: string }>
    ) {
      const index = state.findIndex(
        (item: CartItem) => item.productId === action.payload.productId
      );
      state.splice(index, 1);
    },
  },
});

export const {
  addCartItem,
  incrementQunatity,
  decrementQunatity,
  removeFromCart,
} = CartSlice.actions;
export default CartSlice.reducer;
