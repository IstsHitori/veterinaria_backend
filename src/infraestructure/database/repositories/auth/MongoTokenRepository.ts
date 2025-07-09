import { Token } from "@/domain/entities/auth/Token.entity";
import { TokenRepository } from "@/domain/repositories/auth/TokenRepository";
import { BadRequest } from "@/domain/errors/BadRequest";
import { generateNumericToken } from "@/domain/utils/generateNumericToken";
import { HydratedDocument } from "mongoose";
import { TokenModel } from "../../models/Token.model";
import { CreateTokenData } from "@/domain/interfaces/auth/token.interface";

export class MongoTokenRepository implements TokenRepository {
  private toToken(token: HydratedDocument<Token>): Token {
    return new Token(
      token._id.toString(),
      token.userId,
      token.value,
      token.expiresAt,
      token.type
    );
  }
  async createToken(createTokenData: CreateTokenData): Promise<Token> {
    try {
      // Generar el valor del token y la fecha de expiración
      const tokenValue = generateNumericToken(6);
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutos

      const tokenDocument = {
        userId: createTokenData.userId,
        value: tokenValue,
        expiresAt: expiresAt,
        type: createTokenData.type,
      };

      const tokenCreated = await TokenModel.create(tokenDocument);

      // Convertir el documento de MongoDB a la entidad Token
      return this.toToken(tokenCreated);
    } catch (error) {
      console.error("Error creating token:", error);
      throw new BadRequest("Error al crear el token");
    }
  }

  async findByValue(value: string): Promise<Token | null> {
    try {
      const tokenFound = await TokenModel.findOne({ value });
      if (!tokenFound) {
        return null;
      }

      return this.toToken(tokenFound);
    } catch (error) {
      console.error("Error finding token by value:", error);
      throw new BadRequest("Error al buscar el token");
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await TokenModel.findByIdAndDelete(id);
    } catch (error) {
      console.error("Error deleting token:", error);
      throw new BadRequest("Error al eliminar el token");
    }
  }
}
