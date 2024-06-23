"use server";

import db from "@/db/db";
import { z } from "zod";
import { notFound, redirect } from "next/navigation";
import minioClient from "@/lib/minioClient";
import { Readable } from "stream";
import { revalidatePath } from "next/cache";

// Define schemas using zod
const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  priceInCents: z.coerce.number().min(1),
  image: z
    .any()
    .refine((file) => file && file.size > 0, { message: "Required" }),
  category: z.string().min(1),
  weight: z.coerce.number().min(1),
  sizes: z.string(),
});

const editSchema = addSchema.extend({
  image: z.any().optional(),
});

// Function to upload file to MinIO
const uploadFileToMinio = async (bucket: string, file: File) => {
  const buffer = Buffer.from(await file.arrayBuffer());
  const objectName = file.name;

  const stream = new Readable();
  stream._read = () => {};
  stream.push(buffer);
  stream.push(null);

  await minioClient.putObject(bucket, objectName, stream, file.size);
  return await minioClient.presignedUrl("GET", bucket, objectName);
};

// Function to get object name from URL
const getObjectNameFromUrl = (url: string) => {
  const segments = url.split("/");
  const objectFullName = segments[4];
  const index = objectFullName.indexOf("?");
  const objectName = objectFullName.substring(0, index);

  return objectName;
};

// Function to update product
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

  if (!product) {
    return notFound();
  }

  const objectName = getObjectNameFromUrl(product.image);
  let imagePath = product.image;

  if (data.image && data.image.size > 0) {
    await minioClient.removeObject(
      process.env.MINIO_IMAGE_BUCKET!,
      objectName!
    );
    imagePath = await uploadFileToMinio(
      process.env.MINIO_IMAGE_BUCKET!,
      data.image
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
      availableSizes: sizes,
    },
  });

  revalidatePath(`/products`);
  revalidatePath("/");
  redirect("/admin/products");
};

// Function to add new product
export const addProduct = async (prevState: unknown, formData: FormData) => {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const sizes = data.sizes.split(",").map((size) => Number(size)) || [0];

  const imagePath = await uploadFileToMinio(
    process.env.MINIO_IMAGE_BUCKET!,
    data.image
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
      availableSizes: sizes,
    },
  });

  revalidatePath(`/products`);
  revalidatePath("/");
  redirect("/admin/products");
};

// Function to toggle product availability
export const toggleProductAvailability = async (
  id: string,
  isAvailabileForPurchase: boolean
) => {
  await db.product.update({ where: { id }, data: { isAvailabileForPurchase } });

  revalidatePath(`/products`);
  revalidatePath("/");
};

// Function to delete a product
export const deleteProduct = async (id: string) => {
  const product = await db.product.delete({ where: { id } });
  if (!product) {
    return notFound();
  }

  const objectName = getObjectNameFromUrl(product.image);
  await minioClient.removeObject(process.env.MINIO_IMAGE_BUCKET!, objectName!);

  revalidatePath(`/products`);
  revalidatePath("/");
  redirect("/admin/products");
};
