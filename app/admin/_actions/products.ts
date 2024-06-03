"use server";

import db from "@/db/db";
import { z } from "zod";
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
);

const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  priceInCents: z.coerce.number().min(1),
  image: imageSchema.refine((file) => file.size > 0, "Required"),
  category: z.string().min(1),
  weight: z.coerce.number().min(1),
});

const editSchema = addSchema.extend({
  image: imageSchema.optional(),
});

export const updateProduct = async (
  id: string,
  prevState: unknown,
  formData: FormData
) => {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const product = await db.product.findUnique({ where: { id } });

  if (product == null) {
    return notFound();
  }

  let imagePath = product.image;

  if (data.image != null && data.image.size > 0) {
    await fs.unlink(`public${product.image}`);
    imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
    await fs.writeFile(
      `public${imagePath}`,
      Buffer.from(await data.image.arrayBuffer())
    );
  }

  await db.product.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      image: imagePath,
      weightInGrams: data.weight,
      category: data.category,
      availableSizes: "all",
    },
  });

  redirect("/admin/products");
};
export const addProduct = async (prevState: unknown, formData: FormData) => {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  await fs.mkdir("public/products", { recursive: true });
  const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await data.image.arrayBuffer())
  );

  await db.product.create({
    data: {
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      image: imagePath,
      weightInGrams: data.weight,
      category: data.category,
      isAvailabileForPurchase: true,
      availableSizes: "all",
    },
  });

  redirect("/admin/products");
};

export const toggleProductAvailability = async (
  id: string,
  isAvailabileForPurchase: boolean
) => {
  await db.product.update({ where: { id }, data: { isAvailabileForPurchase } });
};

export const deleteProduct = async (id: string) => {
  const product = await db.product.delete({ where: { id } });
  if (product == null) {
    return notFound();
  }

  fs.unlink(product.image);
  fs.unlink(`public${product.image}`);
};
