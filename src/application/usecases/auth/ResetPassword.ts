import { TokenType } from "@/domain/entities/auth/TokenType.entity";
import { BadRequest } from "@/domain/errors/BadRequest";
import { NotFound } from "@/domain/errors/NotFound";
import { TokenRepository } from "@/domain/repositories/auth/TokenRepository";
import { UserRepository } from "@/domain/repositories/auth/UserRepository";
import { PasswordEncrypter } from "@/domain/services/PasswordEncrypter";
import { Password } from "@/domain/value-objects/Password";

interface ResetPasswordProps {
  token: string;
  newPassword: string;
  confirmNewPassword: string;
}

export class ResetPassword {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository,
    private readonly passwordEncrypter: PasswordEncrypter
  ) {}

  async execute({
    token,
    newPassword,
    confirmNewPassword,
  }: ResetPasswordProps) {
    try {
      //Validar si las contraseñas coinciden
      if (newPassword !== confirmNewPassword)
        throw new BadRequest("Las contraseñas no coinciden");

      //Validar que la contraseña cumpla con la logica de negocio del dominio
      const passwordValidated = Password.create(newPassword);

      //Validar si el token es válido
      const foundToken = await this.tokenRepository.findByValue(token);
      if (!foundToken) throw new NotFound("Token no encontrado");
      if (foundToken.type !== TokenType.PASSWORD_RESET)
        throw new BadRequest("Token no válido");

      //Validar si el token ha expirado
      if (foundToken.isExpired()) throw new BadRequest("Token expirado");

      //Validar si el usuario existe
      const user = await this.userRepository.findById(foundToken.userId);
      if (!user) throw new NotFound("Usuario no encontrado");

      //Validar si el usuario está activo
      if (!user.isActive) throw new BadRequest("Usuario inactivo");
      if (user.isDeleted) throw new BadRequest("Este usuario no existe");

      //Encriptar la contraseña
      const encryptedPassword = await this.passwordEncrypter.hash(
        passwordValidated.getValue()
      );

      //Actualizar la contraseña
      await this.userRepository.update(user.id, {
        password: encryptedPassword,
      });
    } catch (error) {
      if (error instanceof NotFound) throw error;
      if (error instanceof BadRequest) throw error;
      throw new BadRequest("Error al restablecer la contraseña");
    }
  }
}
