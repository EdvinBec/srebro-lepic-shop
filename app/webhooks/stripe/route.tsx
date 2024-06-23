import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

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
    const productId = charge.metadata.productId;
    const email = charge.billing_details.email;
    const pricePaidInCents = charge.amount;

    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (product == null || email == null) {
      return new NextResponse("Bad request", { status: 400 });
    }

    const userFields = {
      email,
      order: { create: { productId, pricePaidInCents, size: 2 } },
      zip: charge.billing_details.address!.postal_code!,
      address: charge.billing_details.address!.line1!,
      phone: charge.billing_details.phone!,
      country: charge.billing_details.address!.country!,
      city: charge.billing_details.address!.city!,
      fullName: charge.billing_details.name!,
    };

    const {
      order: [order],
    } = await db.user.upsert({
      where: { email },
      create: userFields,
      update: userFields,
      select: { order: { orderBy: { createdAt: "desc" }, take: 1 } },
    });

    await resend.emails.send({
      from: `support <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: "Potvrda narudžbe",
      react: <h1>Hi</h1>,
    });
  }
  return new NextResponse();
};
