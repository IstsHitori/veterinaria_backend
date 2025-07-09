import { BadRequest } from "../errors/BadRequest";

export class Password {
  constructor(private readonly value: string) {}

  static create(password: string): Password {
    if (password.length < 8)
      throw new BadRequest(
        "La contraseña debe tener al menos 8 caracteres",
        "password"
      );
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!¡¿?*.,;:_\-])[A-Za-z\d@#$%^&+=!¡¿?*.,;:_\-]{8,}$/.test(
        password
      )
    )
      throw new BadRequest(
        "La contraseña debe tener al menos una letra minúscula, una mayúscula, un número y un caracter especial (@, #, $, %, etc.)",
        "password"
      );

    return new Password(password);
  }

  getValue(): string {
    return this.value;
  }
}
