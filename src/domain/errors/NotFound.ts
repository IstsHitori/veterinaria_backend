export class NotFound extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  constructor(message: string, statusCode: number = 404) {
    super(message);
    this.name = "NotFound";
    this.statusCode = statusCode;
    this.code = "NOT_FOUND";
  }
}
