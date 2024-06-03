export const isValidPassword = async (
  password: string,
  hashedPassword: string
) => {
  console.log(hashPassword(password));

  return (await hashPassword(password)) === hashedPassword;
};

export const hashPassword = async (password: string) => {
  const arrayBuffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(password)
  );

  return Buffer.from(arrayBuffer).toString("base64");
};
