import { IsNotEmpty } from "class-validator";

export class SendForgotPasswordDto {
  @IsNotEmpty({ message: "El email es requerido" })
  
  email!: string;
}