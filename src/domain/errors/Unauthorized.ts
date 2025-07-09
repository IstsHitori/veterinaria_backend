export class Unauthorized extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  constructor(message: string, statusCode: number = 401) {
    super(message);
    this.name = "Unauthorized";
    this.statusCode = statusCode;
    this.code = "UNAUTHORIZED";
  }
}