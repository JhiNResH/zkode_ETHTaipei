import crypto from "crypto";
import { env } from "@env";

export class EncryptionService {
  encryptionKey: string;
  algorithm = "aes-256-cbc";
  ivSize = 16;

  constructor() {
    this.encryptionKey = env.NEXTAUTH_SECRET;
  }

  encrypt(plainText: string): string {
    const iv = crypto.randomBytes(this.ivSize);

    const cipher = crypto.createCipheriv(
      this.algorithm,
      Buffer.from(this.encryptionKey),
      iv
    );

    const encrypted = Buffer.concat([cipher.update(plainText), cipher.final()]);

    return iv.toString("hex") + ":" + encrypted.toString("hex");
  }

  decrypt(encryptedString: string): string {
    const [iv, encryptedText] = encryptedString.split(":");

    if (!iv || !encryptedText) throw new Error("Invalid encrypted string");

    const encryptedBuffer = Buffer.from(encryptedText, "hex");

    const decipher = crypto.createDecipheriv(
      this.algorithm,
      Buffer.from(this.encryptionKey),
      Buffer.from(iv, "hex")
    );

    const decrypted = Buffer.concat([
      decipher.update(encryptedBuffer),
      decipher.final(),
    ]);

    return decrypted.toString();
  }
}

export default EncryptionService;
