import { ProcessedCart } from "@/app/webhooks/stripe/route";
import { deliveryFee } from "@/config";
import { CartItem } from "@/hooks/use-cart";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return new NextResponse("Method Not Allowed", {
      status: 405,
      headers: { Allow: "POST" },
    });
  }

  try {
    const { transformedItems, cartItems } = await req.json();
    const processedCart: ProcessedCart[] = [];

    cartItems.forEach((item: CartItem) =>
      processedCart.push({
        productId: item.product.id,
        quantity: item.quantity,
        size: item.size,
        price: item.product.priceInCents,
        message: item.message,
      })
    );

    const customer = await stripe.customers.create({
      metadata: {
        userId: uuidv4(),
        cart: JSON.stringify(processedCart),
      },
    });

    const params: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: deliveryFee * 100,
              currency: "bam",
            },
            display_name: "Dostava",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 2 },
              maximum: { unit: "business_day", value: 5 },
            },
          },
        },
      ],
      customer: customer.id,
      line_items: transformedItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart/success/${customer.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
      shipping_address_collection: {
        allowed_countries: ["BA", "HR", "RS", "ME", "MK", "SI", "BG", "AL"],
      },
      phone_number_collection: { enabled: true },
    };

    const checkoutSession = await stripe.checkout.sessions.create(params);

    console.log("Created checkout session:", checkoutSession.id);

    return NextResponse.json(checkoutSession);
  } catch (err) {
    console.error("Error creating checkout session:", err);
    const errorMessage =
      err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json(
      { statusCode: 500, message: errorMessage },
      { status: 500 }
    );
  }
}
