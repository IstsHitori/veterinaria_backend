import { IsNotEmpty, IsString } from "class-validator";

export class ResetPasswordDto {
  @IsNotEmpty({ message: "La contraseña es obligatoria" })
  @IsString({ message: "La contraseña debe ser una cadena" })
  newPassword!: string;

  @IsNotEmpty({ message: "La confirmación de la contraseña es obligatoria" })
  @IsString({ message: "La confirmación de la contraseña debe ser una cadena" })
  confirmNewPassword!: string;
}
