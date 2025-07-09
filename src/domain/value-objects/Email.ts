import { BadRequest } from "../errors/BadRequest";

export class Email {
  constructor(private value: string) {}

  static create(email: string): Email {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email))
      throw new BadRequest("El email no es correcto");

    return new Email(email);
  }

  getValue(): string {
    return this.value;
  }
}
