"use server";

import db from "@/db/db";
import { z } from "zod";
import { notFound, redirect } from "next/navigation";
import sharp from "sharp";
import minioClient from "@/lib/minioClient";
import { Readable } from "stream";

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

  const segments = product.image.split("/");
  const objectFullName = segments[4];
  const index = objectFullName.indexOf("?");
  const objectName = objectFullName.substring(0, index);

  let imagePath = product.image;

  if (data.image != null && data.image.size > 0) {
    // Delete the old image from Minio Bucket
    await minioClient.removeObject(process.env.MINIO_IMAGE_BUCKET!, objectName);

    const image = await compressBlobImage(data.image);
    const bucket = process.env.MINIO_IMAGE_BUCKET!;
    const sourceFile = await image.arrayBuffer();
    const buffer = Buffer.from(sourceFile);
    const objectNewName = data.image.name;
    const fileSize = data.image.size;

    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);

    const exists = await minioClient.bucketExists(bucket);
    if (exists) {
      console.log("Bucket " + bucket + " exists.");
    } else {
      await minioClient.makeBucket(bucket, "us-east-1");
      console.log("Bucket " + bucket + ' created in "us-east-1".');
    }

    await minioClient.putObject(bucket, objectNewName, stream, fileSize);
    const imageUrl = await minioClient.presignedUrl(
      "GET",
      bucket,
      objectNewName
    );

    imagePath = imageUrl;
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
  const image = await compressBlobImage(data.image);
  const sizes = data.sizes.split(",").map((size) => Number(size)) || [0];

  const bucket = process.env.MINIO_IMAGE_BUCKET!;
  const sourceFile = await image.arrayBuffer();
  const buffer = Buffer.from(sourceFile);
  const objectName = data.image.name;
  const fileSize = data.image.size;

  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);

  const exists = await minioClient.bucketExists(bucket);
  if (exists) {
    console.log("Bucket " + bucket + " exists.");
  } else {
    await minioClient.makeBucket(bucket, "us-east-1");
    console.log("Bucket " + bucket + ' created in "us-east-1".');
  }

  await minioClient.putObject(bucket, objectName, stream, fileSize);
  const imageUrl = await minioClient.presignedUrl("GET", bucket, objectName);

  console.log(
    "File " +
      sourceFile +
      " uploaded as object " +
      objectName +
      " in bucket " +
      bucket
  );

  await db.product.create({
    data: {
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      image: imageUrl,
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

  const segments = product.image.split("/");
  const objectFullName = segments[4];
  const index = objectFullName.indexOf("?");
  const objectName = objectFullName.substring(0, index);

  // Delete the image from Minio Bucket
  await minioClient.removeObject(process.env.MINIO_IMAGE_BUCKET!, objectName);

  redirect("/admin/products");
};
