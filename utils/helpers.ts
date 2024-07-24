import { CartItem } from "@/hooks/useCart";
import { loadStripe } from "@stripe/stripe-js";

type UntransformedCartItem = {
  quantity: number;
  price: number;
  description: string;
  name: string;
  images: string[];
  size: number;
  productId: string;
};

export const transformCartItems = (items: CartItem[]) => {
  const cart: UntransformedCartItem[] = [];

  items.forEach((item) => {
    cart.push({
      quantity: item.quantity,
      price: item.product.priceInCents,
      description: item.product.description,
      name: item.product.name,
      images: item.product.image, // Ensure this is an array of strings
      size: item.size, // Add size from CartItem
      productId: item.product.id, // Add productId from Product
    });
  });

  return cart.map((item) => ({
    price_data: {
      currency: "bam",
      unit_amount: Math.round(item.price * 100),
      product_data: {
        name: item.name,
        description: item.description,
        images: item.images, // Ensure this is an array of strings
      },
    },
    quantity: item.quantity,
  }));
};

export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!,
  {
    apiVersion: "2024-04-10",
    locale: "hr",
  }
);
