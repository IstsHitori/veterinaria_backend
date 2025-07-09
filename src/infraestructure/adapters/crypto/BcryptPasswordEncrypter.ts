import { PasswordEncrypter } from "@/domain/services/PasswordEncrypter";
import bcrypt from "bcryptjs";

export class BcryptPasswordEncrypter implements PasswordEncrypter {
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
