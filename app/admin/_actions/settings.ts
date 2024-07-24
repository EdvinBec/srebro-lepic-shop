"use server";

import db from "@/db/db";

export const saveAttentionRowMessage = async (message: string) => {
  if (await db.shopSettings.findUnique({ where: { id: 1 } })) {
    await db.shopSettings.update({
      where: { id: 1 },
      data: { attentionMessage: message },
    });
  } else {
    await db.shopSettings.create({
      data: { attentionMessage: message },
    });
  }
};
