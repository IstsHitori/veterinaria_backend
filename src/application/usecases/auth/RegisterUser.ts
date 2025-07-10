import { TokenType } from "@/domain/entities/auth/TokenType.entity";
import { BadRequest } from "@/domain/errors/BadRequest";
import { TokenRepository } from "@/domain/repositories/auth/TokenRepository";
import { AuthRepositorie } from "@/domain/repositories/auth/AuthRepositorie";
import { SendEmailService } from "@/domain/services/EmailService";
import { ResendConfirmationToken } from "./ResendConfirmationToken";
import { Email } from "@/domain/value-objects/Email";
import { Password } from "@/domain/value-objects/Password";
import { UserRole } from "@/domain/value-objects/UserRole";
import { Unauthorized } from "@/domain/errors/Unauthorized";
import { RegisterUserData } from "@/domain/interfaces/auth/user.interfaces";
import { UserFactory } from "@/domain/factories/User.factory";
import { Role } from "@/domain/entities/auth/Role.entity";
import { EmailTemplateService } from "@/domain/services/EmailTemplateService";

type RegisterUserResult = { status: "created" } | { status: "resent" };
type validateFieldsType = { email: string; password: string; rol: Role };

export class RegisterUser {
  constructor(
    private readonly authRepository: AuthRepositorie,
    private readonly emailService: SendEmailService,
    private readonly tokenRepository: TokenRepository,
    private readonly FRONT_URL: string,
    private readonly resendConfirmationToken: ResendConfirmationToken,
    private readonly emailTemplateService: EmailTemplateService
  ) {}
  private validateFields(
    email: string,
    password: string,
    rol: string
  ): validateFieldsType {
    //Validar que la contaseña y orreo cumplan con la logica de negocio

    const emailValidated = Email.create(email);
    const passwordValidated = Password.create(password);
    const rolValidated = UserRole.create(rol);

    return {
      email: emailValidated.getValue(),
      password: passwordValidated.getValue(),
      rol: rolValidated.getValue(),
    };
  }

  async execute(user: RegisterUserData): Promise<RegisterUserResult> {
    try {
      //Validar que solo haya un administrador
      
      if (user.role === Role.ADMIN) {
        const canCreateAdmin = await this.authRepository.canCreateAdmin();
        
        if (!canCreateAdmin)
          throw new BadRequest("No se puede crear otro administrador.");
      }

      const { email, password, rol } = this.validateFields(
        user.email,
        user.password,
        user.role
      );

      const userEntity = UserFactory.createUserToRegister(user);
      userEntity.updateEmail(email);
      userEntity.updatePassword(password);
      userEntity.updateRol(rol);

      //Buscar usuario por email
      const userFound = await this.authRepository.findByEmail(userEntity.email);
      if (userFound) {
        if (userFound.emailValidated)
          throw new BadRequest("El usuario ya existe");

        await this.resendConfirmationToken.execute(user.email);
        return { status: "resent" };
      }
      // Crear usuario
      const userCreated = await this.authRepository.create(userEntity);
      // Crear token de confirmación
      const token = await this.tokenRepository.createToken({
        userId: userCreated.id,
        type: TokenType.CONFIRMATION,
      });

      // Enviar correo de confirmación
      const hasSentEmail = await this.emailService.sendConfirmationEmail({
        to: user.email,
        subject: "Confirm your email",
        htmlBody: this.emailTemplateService.getConfirmationTemplate({
          token: token.value,
          FRONT_URL: this.FRONT_URL,
          to: user.firstName + " " + user.lastName,
        }),
      });

      if (!hasSentEmail) {
        throw new BadRequest("Error al enviar el correo de confirmación");
      }
      return { status: "created" };
    } catch (error) {
      // Si ya es un BadRequest, lo re-lanzamos
      if (error instanceof BadRequest) throw error;
      if (error instanceof Unauthorized) throw error;
      throw new BadRequest("Error al registrar el usuario");
    }
  }
}
