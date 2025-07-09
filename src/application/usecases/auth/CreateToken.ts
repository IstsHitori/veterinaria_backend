import { Token } from "@/domain/entities/Token.entity";
import { TokenType } from "@/domain/entities/TokenType.entity";
import { TokenRepository } from "@/domain/repositories/TokenRepository";

export interface CreateTokenData {
  userId: string;
  type: TokenType;
}

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
