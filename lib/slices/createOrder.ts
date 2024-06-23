import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface OrderState {
  productId: string;
  size: number;
}

const initialState = {
  productId: "",
  size: 0,
} satisfies OrderState as OrderState;

const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clear(state) {
      state.productId = "";
      state.size = 0;
    },
    saveCurrentOrder(state, action: PayloadAction<OrderState>) {
      state.productId = action.payload.productId;
      state.size = action.payload.size;
    },
  },
});

export const { clear, saveCurrentOrder } = OrderSlice.actions;
export default OrderSlice.reducer;
