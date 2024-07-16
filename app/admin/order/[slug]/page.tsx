import Button from "@/components/Button/Button";
import Heading from "@/components/Heading";
import { Label } from "@/components/ui/label";
import db from "@/db/db";
import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import React from "react";
import OrderData from "./_components/OrderData";

type Props = {
  params: {
    slug: string;
  };
};

const page = async ({ params: { slug } }: Props) => {
  const order = await db.order.findUnique({
    where: {
      id: Number(slug),
    },
  });

  const orderItems = await db.orderItem.findMany({
    where: {
      orderId: Number(slug),
    },
  });

  const user = await db.user.findUnique({
    where: {
      id: order?.userId,
    },
  });

  const products = [];

  for (const item of orderItems) {
    const product = await db.product.findUnique({
      where: {
        id: item.productId,
      },
    });

    products.push({ ...product!, quantity: item.quantity, size: item.size });
  }

  const deliveryFee = await db.shopSettings.findUnique({
    where: { id: 1 },
  });

  console.log(user);
  return (
    <OrderData
      order={order!}
      deliveryFee={Number(deliveryFee?.deliveryFee)}
      user={user!}
      products={products!}
    />
  );
};

export default page;
