export class BadRequest extends Error {
  public readonly statusCode: number = 400;
  public readonly field: string | undefined;

  constructor(message: string, field?: string) {
    super(message);
    this.name = "BadRequest";
    this.field = field;
  }
}
