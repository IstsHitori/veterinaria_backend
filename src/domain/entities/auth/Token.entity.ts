import { TokenType } from "./TokenType.entity";

export class Token {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly value: string,
    public readonly expiresAt: Date,
    public readonly type: TokenType
  ) {}
  
  isExpired(): boolean {
    return new Date() > this.expiresAt;
  }
}
