"use server";

import db from "@/db/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { startOfDay, endOfDay } from "date-fns";

export const toggleIsSent = async (id: number, isSent: boolean) => {
  const isOrderSent = isSent;

  await db.order.update({
    where: { id },
    data: { isSent: isOrderSent },
  });

  revalidatePath(`/products`);
  revalidatePath("/");
  redirect("/admin");
};

export async function getOrdersForToday() {
  try {
    // Get the current date
    const currentDate = new Date();
    // Extract the year, month, and date from the current date
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // Month is zero-indexed in JavaScript
    const currentDay = currentDate.getDate();

    // Start date is the beginning of today (midnight)
    const startDate = new Date(currentYear, currentMonth, currentDay);
    // End date is the beginning of tomorrow (midnight)
    const endDate = new Date(currentYear, currentMonth, currentDay + 1);

    // Query orders created within today
    const orders = await db.order.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
      include: {
        products: true,
        user: true,
      },
    });

    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  } finally {
    await db.$disconnect();
  }
}

export async function getOrdersForCurrentYear() {
  try {
    // Get the current date
    const currentDate = new Date();
    // Extract the year from the current date
    const currentYear = currentDate.getFullYear();

    // Start date is the beginning of the current year (January 1st)
    const startDate = new Date(currentYear, 0, 1);
    // End date is the beginning of the next year (January 1st of the next year)
    const endDate = new Date(currentYear + 1, 0, 1);

    // Query orders created within the current year
    const orders = await db.order.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
      include: {
        products: true,
        user: true,
      },
    });

    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  } finally {
    await db.$disconnect();
  }
}

export async function getOrdersForCurrentMonth() {
  try {
    // Get the current date
    const currentDate = new Date();
    // Extract the year and month from the current date
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // Month is zero-indexed in JavaScript

    // Start date is the first day of the current month
    const startDate = new Date(currentYear, currentMonth, 1);
    // End date is the first day of the next month
    const endDate = new Date(currentYear, currentMonth + 1, 1);

    // Query orders created within the current month
    const orders = await db.order.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
      include: {
        products: true,
        user: true,
      },
    });

    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  } finally {
    await db.$disconnect();
  }
}
