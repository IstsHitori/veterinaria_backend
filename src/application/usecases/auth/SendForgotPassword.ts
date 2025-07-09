import { TokenType } from "@/domain/entities/TokenType.entity";
import { BadRequest } from "@/domain/errors/BadRequest";
import { NotFound } from "@/domain/errors/NotFound";
import { Unauthorized } from "@/domain/errors/Unauthorized";
import { TokenRepository } from "@/domain/repositories/TokenRepository";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { SendEmailService } from "@/domain/services/EmailService";
import { EmailTemplateService } from "@/domain/services/EmailTemplateService";
import { Email } from "@/domain/value-objects/Email";


export class SendForgotPassword {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository,
    private readonly emailService: SendEmailService,
    private readonly emailTemplateService:EmailTemplateService,
    private readonly FRONT_URL: string
  ) {}

  async execute(email: string) {
    try {
      const emailValidated = Email.create(email);
      const user = await this.userRepository.findByEmail(emailValidated.getValue());
      if (!user) throw new NotFound("Usuario no encontrado");
      if (!user.isActive) throw new Unauthorized("Usuario no activo");
      if (user.isDeleted) throw new NotFound("Usuario no encontrado");
      if (!user.emailValidated) throw new Unauthorized("Email no validado");

      const { value } = await this.tokenRepository.createToken({
        userId: user.id,
        type: TokenType.PASSWORD_RESET,
      });

      const isMailSent = await this.emailService.sendResetPasswordEmail({
        to: email,
        subject: "Recuperación de contraseña",
        htmlBody: this.emailTemplateService.getResetPasswordTemplate({
          to: email,
          token: value,
          FRONT_URL: this.FRONT_URL,
        }),
      });

      if (!isMailSent) throw new BadRequest("Error al enviar el correo");
      
      return { message: "Correo de recuperación de contraseña enviado" };
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
      throw new BadRequest(
        "Error al enviar el correo de recuperación de contraseña"
      );
    }
  }
}
