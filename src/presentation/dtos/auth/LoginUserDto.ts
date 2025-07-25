import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {
  @IsNotEmpty({ message: "El email es requerido" })
  email!: string;

  @IsNotEmpty({
    message: "La contraseña es requerida",
  })
  @IsString({ message: "La contraseña debe ser una cadena de texto" })
  password!: string;
}
