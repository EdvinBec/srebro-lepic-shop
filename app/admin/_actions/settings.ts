"use server";

import db from "@/db/db";

export const onSubmit = async (amount: number) => {
  if (await db.shopSettings.findUnique({ where: { id: 1 } })) {
    await db.shopSettings.update({
      where: { id: 1 },
      data: { deliveryFee: Number(amount) },
    });
  } else {
    await db.shopSettings.create({
      data: { deliveryFee: Number(amount), attentionMessage: "" },
    });
  }
};

export const saveAttentionRowMessage = async (message: string) => {
  if (await db.shopSettings.findUnique({ where: { id: 1 } })) {
    await db.shopSettings.update({
      where: { id: 1 },
      data: { attentionMessage: message },
    });
  } else {
    await db.shopSettings.create({
      data: { deliveryFee: Number(0), attentionMessage: message },
    });
  }
};
