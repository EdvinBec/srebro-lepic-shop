import { transformCartItems } from "@/utils/helpers";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { CartProduct } from "./use-cart";

export type CartItem = {
  product: CartProduct;
  quantity: number;
  size: number;
  message: string;
};

export const createCheckoutSession = async (cartItems: CartItem[]) => {
  const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

  const transformedItems = transformCartItems(cartItems);

  const checkoutSession = await axios.post("/api/stripe", {
    transformedItems,
    cartItems,
  });

  const result = await stripe?.redirectToCheckout({
    sessionId: checkoutSession.data.id,
  });

  if (result?.error) {
    alert(result?.error.message);
  }

  return result;
};
