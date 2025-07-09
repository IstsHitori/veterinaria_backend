export class InternalServer extends Error {
  private readonly statusCode: number;
  private readonly code: string;
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.name = "InternalServer";
    this.statusCode = statusCode;
    this.code = "INTERNAL_SERVER_ERROR";
  }
}
