export class DatabaseError extends Error {
  public readonly statusCode: number;
  public readonly originalError?: any;
  constructor(message: string, originalError?: any) {
    super(message);
    this.name = "DatabaseConnectionError";
    this.statusCode = 503;
    this.originalError = originalError;
  }
}
