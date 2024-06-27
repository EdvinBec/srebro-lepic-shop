// app/api/delivery-order/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import db from "@/db/db";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const {
      email,
      zip,
      address,
      phone,
      country,
      city,
      fullName,
      productId,
      pricePaidInCents,
      size,
    } = await req.json();

    if (
      !email ||
      !address ||
      !phone ||
      !country ||
      !city ||
      !fullName ||
      !productId ||
      !pricePaidInCents ||
      !zip
    ) {
      return NextResponse.json(
        { error: "Molim vas unesite sve podatke" },
        { status: 400 }
      );
    }

    const userFields = {
      email,
      order: { create: { productId, pricePaidInCents, size: size } },
      zip: zip,
      address: address,
      phone: phone,
      country: country,
      city: city,
      fullName: fullName,
    };

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
          zip: zip,
          address: address,
          phone: phone,
          country: country,
          city: city,
          fullName: fullName,
        },
      });
    }

    const order = await db.order.create({
      data: {
        userId: user.id,
        products: {
          create: {
            productId,
            size: Number(size),
            quantity: 1,
          },
        },
      },
      include: {
        products: true, // Include related OrderItems
      },
    });

    console.log("Order created or updated successfully:", order);

    await resend.emails.send({
      from: `support <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: "Potvrda narudžbe",
      react: <h1>Hi</h1>, // Customize your email content
    });

    return NextResponse.json({ success: true, order }, { status: 200 });
  } catch (error) {
    console.error("Error creating or updating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
