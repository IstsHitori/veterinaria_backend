export interface TokenService {
  generate(payload: object, options: object): string;
  verify(token: string): object;
}
