// app/api/delivery-order/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import db from "@/db/db";
import { CartItem } from "@/lib/CartContext";

const prisma = new PrismaClient();

type Customer = {
  email: string;
  zip: string;
  address: string;
  phone: string;
  country: string;
  city: string;
  fullName: string;
};

const createOrder = async (customer: Customer, data: CartItem[]) => {
  const cart: CartItem[] = data;
  let totalPrice = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });

  let user = await db.user.findUnique({
    where: {
      email: customer.email as string,
    },
  });

  if (!user) {
    user = await db.user.create({
      data: {
        id: uuidv4(),
        email: customer.email!,
        zip: customer.zip!,
        address: customer.address!,
        phone: customer.phone!,
        country: customer.country!,
        city: customer.city!,
        fullName: customer.fullName!,
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
        price: (totalPrice + 5) * 100,
        paymentMethod: "Po pouzeću", // "Cash on delivery
        products: {
          create: cart.map((item: CartItem) => ({
            productId: item.id,
            quantity: item.quantity,
            size: item.size,
            price: item.price * 100,
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
  try {
    const { customer, cart } = await req.json();

    if (!customer || !cart) {
      return NextResponse.json(
        { error: "Molim vas unesite sve podatke" },
        { status: 400 }
      );
    }

    createOrder(customer, cart);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error creating or updating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
