import { Token } from "@/domain/entities/auth/Token.entity";
import { CreateTokenData } from "@/domain/interfaces/auth/token.interface";
import { TokenRepository } from "@/domain/repositories/auth/TokenRepository";

export class CreateToken {
  constructor(private readonly tokenRepository: TokenRepository) {}

  async execute({ userId, type }: CreateTokenData): Promise<Token> {
    const token = await this.tokenRepository.createToken({
      userId,
      type,
    });
    return token;
  }
}
