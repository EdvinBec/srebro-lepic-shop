import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (number: number) => {
  // Ensure the number has two decimal places
  let formattedNumber = number.toFixed(2);

  // Replace the decimal point with a comma
  formattedNumber = formattedNumber.replace(".", ",");

  // Append the currency label
  return `${formattedNumber} KM`;
};
