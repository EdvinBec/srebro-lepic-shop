import { CartItem } from "@/lib/CartContext";
import { transformCartItems } from "@/utils/helpers";
import { Product } from "@prisma/client";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

export const createCheckoutSession = async (
  cartItems: CartItem[],
  products: Product[]
) => {
  const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

  const transformedItems = transformCartItems(cartItems, products);

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
