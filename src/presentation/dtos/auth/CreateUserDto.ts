import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty({ message: "El nombre es obligatorio" })
  @IsString({ message: "El nombre debe ser una cadena" })
  firstName!: string;

  @IsNotEmpty({ message: "El apellido es obligatorio" })
  @IsString({ message: "El apellido debe ser una cadena" })
  lastName!: string;

  @IsNotEmpty({ message: "El correo es obligatorio" })
  email!: string;

  @IsNotEmpty({ message: "La contraseña es obligatoria" })
  @IsString({ message: "La contraseña debe ser una cadena" })
  password!: string;

  @IsNotEmpty({ message: "El rol es obligatorio" })
  @IsString({ message: "El rol debe ser una cadena" })
  role!: string;
}
