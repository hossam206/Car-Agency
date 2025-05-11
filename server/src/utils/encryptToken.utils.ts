import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const IV_LENGTH = 16;

if (!ENCRYPTION_KEY) {
  throw new Error("ENCRYPTION_KEY is not set in the environment variables");
}
const key = crypto.createHash("sha256").update(ENCRYPTION_KEY!).digest();

export function encryptToken(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);

  // Combine iv + encrypted data and encode in base64
  const result = Buffer.concat([iv, encrypted]).toString("base64");
  return result;
}

export function decryptToken(encryptedText: string): string {
  const input = Buffer.from(encryptedText, "base64");
  const iv = input.slice(0, IV_LENGTH);
  const encrypted = input.slice(IV_LENGTH);

  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
}
