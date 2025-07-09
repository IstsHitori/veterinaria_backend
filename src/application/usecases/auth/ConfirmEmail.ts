import { BadRequest } from "@/domain/errors/BadRequest";
import { NotFound } from "@/domain/errors/NotFound";
import { TokenRepository } from "@/domain/repositories/TokenRepository";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { TokenType } from "@/domain/entities/TokenType.entity";

export interface ConfirmEmailData {
  token: string;
}

export class ConfirmEmail {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository
  ) {}

  async execute(data: ConfirmEmailData): Promise<void> {
    try {
      // 1. Validar que el token existe y es válido
      const token = await this.tokenRepository.findByValue(data.token);
      if (!token) {
        throw new NotFound("Token de confirmación no válido");
      }

      // 2. Verificar que el token es de tipo CONFIRMATION
      if (token.type !== TokenType.CONFIRMATION) {
        throw new BadRequest("Tipo de token inválido");
      }

      // 3. Verificar que el token no ha expirado
      if (token.isExpired()) {
        throw new BadRequest("Token de confirmación expirado");
      }

      // 4. Buscar el usuario asociado al token
      const user = await this.userRepository.findById(token.userId);
      if (!user) {
        throw new NotFound("Usuario no encontrado");
      }

      // 5. Verificar que el usuario no esté ya confirmado
      if (user.emailValidated) {
        throw new BadRequest("El email ya está confirmado");
      }
      // 6. Actualizar el usuario para marcar el email como confirmado
      await this.userRepository.update(user.id, {
        emailValidated: true,
      });

      // 7. Eliminar el token de confirmación (opcional)
      await this.tokenRepository.delete(token.id);
    } catch (error) {
      // Si ya es un error conocido, lo re-lanzamos
      if (error instanceof BadRequest || error instanceof NotFound) {
        throw error;
      }

      // Para otros errores, lanzamos un error genérico
      throw new BadRequest("Error al confirmar el email");
    }
  }
}
