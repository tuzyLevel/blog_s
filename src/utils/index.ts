import crypto from "crypto";

export const getPasswordForValidation = (password: string, salt: string) => {
  return crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("base64");
};
