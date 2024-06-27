import { configureStore } from "@reduxjs/toolkit";
import OrderSlice from "./slices/createOrder";
import CartSlice from "./slices/cartSlice";

export const makeStore = () => {
  return configureStore({
    reducer: { order: OrderSlice, cart: CartSlice },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
