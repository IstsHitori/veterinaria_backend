import { Token } from "@/domain/entities/auth/Token.entity";
import { CreateTokenData } from "@/domain/interfaces/auth/token.interface";

export interface TokenRepository {
  createToken(createTokenData: CreateTokenData): Promise<Token>;
  findByValue(value: string): Promise<Token | null>;
  delete(id: string): Promise<void>;
}