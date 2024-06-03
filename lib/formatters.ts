const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  currency: "BAM",
  style: "currency",
  minimumFractionDigits: 2,
});

const NUMBER_FORMATTER = new Intl.NumberFormat("en-US");

export const formatNumber = (amount: number) => {
  return NUMBER_FORMATTER.format(amount);
};

export const formatCurrency = (input: number | string) => {
  // Convert the input to a number
  const number = typeof input === "string" ? parseFloat(input) : input;

  // Check if the input is a valid number
  if (isNaN(number)) {
    throw new Error("Invalid input, please provide a valid number.");
  }

  // Ensure the number has two decimal places
  let formattedNumber = number.toFixed(2);

  // Replace the decimal point with a comma
  formattedNumber = formattedNumber.replace(".", ",");

  // Append the currency label
  return `${formattedNumber} KM`;
};

export const formatWeight = (weight: number) => {
  const inputStr = weight.toFixed(2);

  // Replace the dot with a comma
  const formattedStr = inputStr.replace(".", ",");

  // Add the unit
  return `${formattedStr} g`;
};
