import { TokenType } from "@/domain/entities/TokenType.entity";
import { BadRequest } from "@/domain/errors/BadRequest";
import { NotFound } from "@/domain/errors/NotFound";
import { TokenRepository } from "@/domain/repositories/TokenRepository";

export class ValidateResetToken {
  constructor(private readonly tokenRepository: TokenRepository) {}

  async execute(token: string) {
    try {
      const foundToken = await this.tokenRepository.findByValue(token);
      if (!foundToken) throw new NotFound("Token no encontrado");
      if (foundToken.type !== TokenType.PASSWORD_RESET)
        throw new BadRequest("Token no válido");
      if (foundToken.isExpired()) throw new BadRequest("Token expirado");
    } catch (error) {
      if (error instanceof NotFound) throw error;
      if (error instanceof BadRequest) throw error;
      throw new BadRequest("Error al validar el token");
    }
  }
}
