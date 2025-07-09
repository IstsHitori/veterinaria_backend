import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class ConfirmEmailDto {
  @IsString({ message: "El token debe ser una cadena de texto" })
  @IsNotEmpty({ message: "El token es requerido" })
  @MinLength(6, { message: "El token debe tener al menos 6 caracteres" })
  @MaxLength(6, { message: "El token debe tener como máximo 6 caracteres" })
  token!: string;
}