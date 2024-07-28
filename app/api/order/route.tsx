// app/api/delivery-order/route.ts
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import db from "@/db/db";
import { deliveryFee } from "@/config";
import { ReceiptEmailHtml } from "@/components/emails/ReceiptEmail";
import { Resend } from "resend";
import { ProcessedCart } from "@/app/webhooks/stripe/route";

const resend = new Resend(process.env.RESEND_API_KEY);

type Customer = {
  email: string;
  zip: string;
  address: string;
  phone: string;
  country: string;
  city: string;
  fullName: string;
};

type CartItem = {
  price: number;
  quantity: number;
  size: number;
  message: string;
  id: string;
};

const createOrder = async (customer: Customer, data: CartItem[]) => {
  const cart: CartItem[] = data;
  let totalPrice = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });

  let user = await db.user.findUnique({
    where: {
      email: customer.email,
    },
  });

  if (!user) {
    user = await db.user.create({
      data: {
        id: uuidv4(),
        email: customer.email,
        zip: customer.zip,
        address: customer.address,
        phone: customer.phone,
        country: customer.country,
        city: customer.city,
        fullName: customer.fullName,
      },
    });
  }

  await db.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        userId: user.id,
        price: (totalPrice + deliveryFee) * 100,
        paymentMethod: "Po pouzeću", // "Cash on delivery"
        products: {
          create: cart.map((item: CartItem) => ({
            productId: item.id,
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

    const newCart: ProcessedCart[] = [];

    cart.forEach((item) => {
      newCart.push({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
        size: item.size,
        message: item.message,
      });
    });

    await resend.emails.send({
      from: process.env.SENDER_EMAIL!, // Make sure to replace this with your verified sender
      to: user.email,
      subject: `Potvrda narudžbe #${order.id}`,
      html: ReceiptEmailHtml({
        date: new Date(),
        email: user.email,
        orderId: order.id,
        products: newCart as ProcessedCart[],
      }),
    });
  });
};

export async function POST(req: NextRequest) {
  try {
    const { customer, cart } = await req.json();

    if (!customer || !cart) {
      return NextResponse.json(
        { error: "Molim vas unesite sve podatke" },
        { status: 400 }
      );
    }

    await createOrder(customer, cart);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error creating or updating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await db.$disconnect();
  }
}
