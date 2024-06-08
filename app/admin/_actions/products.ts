"use server";

import db from "@/db/db";
import { z } from "zod";
import { notFound, redirect } from "next/navigation";
import { put, del } from "@vercel/blob";
import sharp from "sharp";

const compressBlobImage = async (image: File) => {
  const buffer = Buffer.from(await image.arrayBuffer());
  const compressedBuffer = await sharp(buffer)
    .resize({ width: 1920, height: 1920, fit: "inside" })
    .jpeg({ quality: 80 })
    .toBuffer();
  return new File([compressedBuffer], image.name, { type: image.type });
};

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
  sizes: z.string().min(1),
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
  const sizes = data.sizes.split(",").map((size) => Number(size)) || [0];

  if (product == null) {
    return notFound();
  }

  let imagePath = product.image;

  if (data.image != null && data.image.size > 0) {
    // Delete the old image from Vercel Blob
    await del(`public${product.image}`);

    // Upload the new image to Vercel Blob
    const compressedImage = await compressBlobImage(data.image);
    const blob = await put(compressedImage.name, compressedImage, {
      access: "public",
    });

    imagePath = blob.url;
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
      availableSizes: sizes,
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
  const sizes = data.sizes.split(",").map((size) => Number(size)) || [0];

  // Upload the image to Vercel Blob
  const compressedImage = await compressBlobImage(data.image);
  const blob = await put(compressedImage.name, compressedImage, {
    access: "public",
  });

  await db.product.create({
    data: {
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      image: blob.url,
      weightInGrams: data.weight,
      category: data.category,
      isAvailabileForPurchase: true,
      availableSizes: sizes,
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

  // Delete the image from Vercel Blob
  await del(`public${product.image}`);
};
