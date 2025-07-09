import { BadRequest } from "@/domain/errors/BadRequest";
import { NotFound } from "@/domain/errors/NotFound";
import { AuthRepositorie } from "@/domain/repositories/auth/AuthRepositorie";
import { TokenRepository } from "@/domain/repositories/auth/TokenRepository";
import { SendEmailService } from "@/domain/services/EmailService";
import { EmailTemplateService } from "@/domain/services/EmailTemplateService";
import { TokenType } from "@/domain/entities/auth/TokenType.entity";

export class ResendConfirmationToken {
  constructor(
    private readonly authRepository: AuthRepositorie,
    private readonly tokenRepository: TokenRepository,
    private readonly emailService: SendEmailService,
    private readonly emailTemplateService: EmailTemplateService,
    private readonly FRONT_URL: string
  ) {}

  async execute(email: string): Promise<void> {
    try {
      const user = await this.authRepository.findByEmail(email);
      if (!user) {
        throw new NotFound("User not found");
      }
      const token = await this.tokenRepository.createToken({
        userId: user.id,
        type: TokenType.CONFIRMATION,
      });

      const hasSentEmail = await this.emailService.resendConfirmationToken({
        to: email,
        subject: "Reenvio de token de confirmación",
        htmlBody: this.emailTemplateService.getResendConfirmationTemplate({
          token: token.value,
          FRONT_URL: this.FRONT_URL,
          to: user.email,
        }),
      });

      if (!hasSentEmail) {
        throw new BadRequest("Error al reenviar el token de confirmación");
      }
    } catch (error) {
      if (error instanceof NotFound) {
        throw error;
      }
      if (error instanceof BadRequest) {
        throw error;
      }
      throw new BadRequest("Error al reenviar el token de confirmación");
    }
  }
}
