import { CreateTokenData } from "@/application/usecases/auth/CreateToken";
import { Token } from "../entities/Token.entity";

export interface TokenRepository {
  createToken(createTokenData: CreateTokenData): Promise<Token>;
  findByValue(value: string): Promise<Token | null>;
  delete(id: string): Promise<void>;
}