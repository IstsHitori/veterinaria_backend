import { Token } from "@/domain/entities/auth/Token.entity";
import { TokenType } from "@/domain/entities/auth/TokenType.entity";
import { Schema, model } from "mongoose";

const validTokenType = Object.values(TokenType);
const tokenSchema = new Schema<Token>(
  {
    userId: { type: String, required: true },
    value: { type: String, required: true },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 5 * 60 * 1000),
      index: { expires: "5m" },
    },
    type: { type: String, required: true, enum: validTokenType },
  },
  { timestamps: true }
);

export const TokenModel = model<Token>("Token", tokenSchema);
