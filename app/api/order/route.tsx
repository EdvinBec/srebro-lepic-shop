// app/api/delivery-order/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";
import React from "react";

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
      order: { create: { productId, pricePaidInCents, size: 2 } },
      zip: zip,
      address: address,
      phone: phone,
      country: country,
      city: city,
      fullName: fullName,
    };

    const user = await prisma.user.upsert({
      where: { email },
      create: userFields,
      update: userFields,
      select: { order: { orderBy: { createdAt: "desc" }, take: 1 } },
    });

    const order = user.order[0];
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
