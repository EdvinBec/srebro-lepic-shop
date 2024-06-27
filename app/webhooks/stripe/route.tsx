import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { v4 as uuidv4 } from "uuid";
import { CartItem } from "@/lib/CartContext";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export const resend = new Resend("re_Qg6PeTUE_8xEro5FzSr9C74D2q3NDgYiy");

export const POST = async (req: NextRequest) => {
  const event = await stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature")!,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  if (event.type === "charge.succeeded") {
    const charge = event.data.object as Stripe.Charge;
    const cart: CartItem[] = JSON.parse(charge.metadata.cart);
    const email = charge.billing_details.email;

    if (!cart || !email) {
      return new NextResponse("Bad request", { status: 400 });
    }

    // Check if the user already exists
    let user = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      // Create a new user
      user = await db.user.create({
        data: {
          id: uuidv4(),
          email,
          zip: charge.billing_details.address!.postal_code!,
          address: charge.billing_details.address!.line1!,
          phone: charge.billing_details.phone!,
          country: charge.billing_details.address!.country!,
          city: charge.billing_details.address!.city!,
          fullName: charge.billing_details.name!,
        },
      });
    }

    // Create the order
    const order = await db.order.create({
      data: {
        userId: user.id,
        products: {
          create: cart.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            size: item.size,
          })),
        },
      },
      include: {
        products: true, // Include related OrderItems
      },
    });

    // Send confirmation email
    await resend.emails.send({
      from: `support <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: "Potvrda narudžbe",
      react: <h1>Hi</h1>,
    });

    return new NextResponse(JSON.stringify(order), { status: 201 });
  }

  return new NextResponse();
};
