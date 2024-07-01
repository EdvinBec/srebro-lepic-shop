import { CartItem } from "@/lib/CartContext";
import { Product } from "@prisma/client";

type UntransformedCartItem = {
  quantity: number;
  price: number;
  description: string;
  name: string;
  image: string;
  size: number;
  productId: string;
};

export const transformCartItems = (items: CartItem[], products: Product[]) => {
  const cart: UntransformedCartItem[] = [];

  items.forEach((item) => {
    const product: Product = products.find(
      (product) => product.id === item.id
    )!;
    cart.push({
      quantity: item.quantity,
      price: product.priceInCents,
      description: product.description,
      name: product.name,
      image: product.image,
      size: item.size, // Add size from CartItem
      productId: product.id, // Add productId from Product
    });
  });

  return cart.map((item) => ({
    price_data: {
      currency: "bam",
      unit_amount: Math.floor(item.price) * 100,
      product_data: {
        name: item.name,
        description: item.description,
        images: [item.image],
      },
    },
    quantity: item.quantity,
  }));
};
