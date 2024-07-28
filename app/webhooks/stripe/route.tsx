import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";
import { Resend } from "resend";
import { ReceiptEmailHtml } from "@/components/emails/ReceiptEmail";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY);

export type ProcessedCart = {
  productId: string;
  quantity: number;
  size: number;
  price: number;
  message: string;
};

const createOrder = async (
  customer: Stripe.Customer,
  data: Stripe.Checkout.Session
) => {
  const cart: ProcessedCart[] = JSON.parse(customer.metadata.cart);

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

  // Create the order within a transaction
  await db.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        userId: user.id,
        price: data.amount_total!,
        paymentMethod: "Kartica",
        products: {
          create: cart.map((item: ProcessedCart) => ({
            productId: item.productId,
            quantity: item.quantity,
            size: item.size,
            price: item.price * 100,
            message: item.message,
          })),
        },
      },
      include: {
        products: true, // Include related OrderItems
      },
    });

    console.log("Order created successfully:", order);

    // Send confirmation email using resend
    try {
      await resend.emails.send({
        from: process.env.SENDER_EMAIL!, // Make sure to replace this with your verified sender
        to: user.email,
        subject: `Hvala vam za narudžbu. #${order.id}`,
        html: ReceiptEmailHtml({
          date: new Date(),
          email: user.email,
          orderId: order.id,
          products: cart as ProcessedCart[],
        }),
      });

      console.log("Confirmation email sent successfully.");
    } catch (error) {
      console.error("Error sending confirmation email:", error);
    }
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
    } catch (error) {
      console.error("Error processing checkout session:", error);
      return new NextResponse("Webhook Error", {
        status: 500,
      });
    }
  }

  return new NextResponse("Success", { status: 200 });
}
