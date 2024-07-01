import db from "@/db/db";
import { CartItem } from "@/lib/CartContext";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export const resend = new Resend("re_Qg6PeTUE_8xEro5FzSr9C74D2q3NDgYiy");

const createOrder = async (
  customer: Stripe.Customer,
  data: Stripe.Checkout.Session
) => {
  const cart: CartItem[] = JSON.parse(customer.metadata.cart);

  let user = await db.user.findUnique({
    where: {
      email: data.customer_details?.email as string,
    },
  });

  if (!user) {
    user = await db.user.create({
      data: {
        id: uuidv4(),
        email: data.customer_details?.email!,
        zip: data.shipping_details?.address?.postal_code!,
        address: data.shipping_details?.address?.line1!,
        phone: data.customer_details?.phone!,
        country: data.shipping_details?.address?.country!,
        city: data.shipping_details?.address?.city!,
        fullName: data.customer_details?.name!,
      },
    });
  }

  console.log("Cart Items:", cart);
  console.log("User ID:", user.id);

  // Create the order within a transaction
  await db.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        userId: user.id,
        price: data.amount_total!,
        products: {
          create: cart.map((item: CartItem) => ({
            productId: item.id,
            quantity: item.quantity,
            size: item.size,
            price: item.price,
          })),
        },
      },
      include: {
        products: true, // Include related OrderItems
      },
    });

    console.log("Order created successfully:", order);
  });
};

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature")!;
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error(`⚠️  Webhook signature verification failed.`, err);
    return new NextResponse("Webhook Error: Invalid signature", {
      status: 400,
    });
  }

  const data = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    try {
      const customer = await stripe.customers.retrieve(data.customer as string);
      await createOrder(customer as Stripe.Customer, data);

      // Send confirmation email
      await resend.emails.send({
        from: `support <${process.env.SENDER_EMAIL}>`,
        to: data.customer_details?.email as string,
        subject: "Potvrda narudžbe",
        react: <h1>Hi</h1>,
      });

      console.log("Confirmation email sent successfully.");
    } catch (error) {
      console.error("Error processing checkout session:", error);
      return new NextResponse("Webhook Error", {
        status: 500,
      });
    }
  }

  return new NextResponse("Success", { status: 200 });
}
