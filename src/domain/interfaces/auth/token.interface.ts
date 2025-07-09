import { TokenType } from "@/domain/entities/auth/TokenType.entity";

export interface CreateTokenData {
  userId: string;
  type: TokenType;
}
