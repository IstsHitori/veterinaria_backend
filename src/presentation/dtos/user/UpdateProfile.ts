import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateProfileDto {
  @IsString({ message: "El nombre debe ser una cadena de texto" })
  @IsOptional()
  firstName!: string;
  @IsString({ message: "El apellido debe ser una cadena de texto" })
  @IsOptional()
  lastName!: string;

  @IsOptional()
  @IsNotEmpty({ message: "El email no puede estar vacío" })
  email!: string;
}
