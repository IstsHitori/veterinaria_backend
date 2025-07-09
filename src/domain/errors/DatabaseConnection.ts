export class DatabaseConnectionError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  constructor(message: string, statusCode: number = 503) {
    super(message);
    this.name = "DatabaseConnectionError";
    this.statusCode = statusCode;
    this.code = "DATABASE_CONNECTION_ERROR";
  }
}
