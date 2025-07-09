import { BadRequest } from "@/domain/errors/BadRequest";
import { NotFound } from "@/domain/errors/NotFound";
import { Unauthorized } from "@/domain/errors/Unauthorized";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { PasswordEncrypter } from "@/domain/services/PasswordEncrypter";
import { TokenService } from "@/domain/services/TokenService";
import { ResendConfirmationToken } from "./ResendConfirmationToken";
import { Email } from "@/domain/value-objects/Email";

type LoginUserResult =
  | { status: "success"; token: string }
  | { status: "resend"; token: null };

export class LoginUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordEncrypter: PasswordEncrypter,
    private readonly tokenService: TokenService,
    private readonly resendConfirmationToken: ResendConfirmationToken
  ) {}
  async execute(email: string, password: string): Promise<LoginUserResult> {
    try {
      Email.create(email);

      const user = await this.userRepository.findByEmail(email);
      if (!user) throw new NotFound("Usuario no encontrado");

      if (!user.isActive) throw new Unauthorized("Usuario no activo");
      if (user.isDeleted) throw new NotFound("Usuario no encontrado");

      if (!user.emailValidated) {
        await this.resendConfirmationToken.execute(email);

        return { status: "resend", token: null };
      }

      const isPasswordValid = await this.passwordEncrypter.compare(
        password,
        user.password
      );
      if (!isPasswordValid) throw new BadRequest("Contraseña incorrecta");

      const payload = {
        id: user.id,
      };
      const token = this.tokenService.generate(payload, { expiresIn: "2d" });

      return { status: "success", token };
    } catch (error) {
      if (error instanceof NotFound) {
        throw error;
      }
      if (error instanceof Unauthorized) {
        throw error;
      }
      if (error instanceof BadRequest) {
        throw error;
      }
      console.log("error", error);
      throw new BadRequest("Error al iniciar sesión");
    }
  }
}
