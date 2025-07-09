import { BcryptPasswordEncrypter } from "@/infraestructure/adapters/crypto/BcryptPasswordEncrypter";
import { NodemailerEmail } from "@/infraestructure/adapters/email/NodemailerEmail";
import { envs } from "@/infraestructure/config/envs";
import { MongoTokenRepository } from "@/infraestructure/database/repositories/auth/MongoTokenRepository";
import { ResendConfirmationToken } from "@/application/usecases/auth/ResendConfirmationToken";
import { RegisterUser } from "@/application/usecases/auth/RegisterUser";
import { ConfirmEmail } from "@/application/usecases/auth/ConfirmEmail";
import { LoginUser } from "@/application/usecases/auth/LoginUser";
import { JwtTokenService } from "@/infraestructure/adapters/token/JwtTokenService";
import { AuthController } from "@/presentation/controllers/auth.controller";
import { SendForgotPassword } from "@/application/usecases/auth/SendForgotPassword";
import { ValidateResetToken } from "@/application/usecases/auth/ValidateResetToken";
import { ResetPassword } from "@/application/usecases/auth/ResetPassword";
import { EmailsTemplates } from "../adapters/email/templates/emails.templates";
import { MongoAuthRepository } from "../database/repositories/auth/MongoAuthRepository";

//* Instancias de dependencias
const passwordEncrypter = new BcryptPasswordEncrypter();
const userRepository = new MongoAuthRepository(passwordEncrypter);
const emailService = new NodemailerEmail(
  envs.MAILER_SERVICE,
  envs.MAILER_EMAIL,
  envs.MAILER_SECRET_KEY,
  envs.SEND_EMAIL
);
const emailTemplates = new EmailsTemplates();
const mongoTokenRepository = new MongoTokenRepository();
const resendConfirmationToken = new ResendConfirmationToken(
  userRepository,
  mongoTokenRepository,
  emailService,
  emailTemplates,
  envs.FRONT_URL
);
const tokenService = new JwtTokenService();

//* Casos de uso
const registerUser = new RegisterUser(
  userRepository,
  emailService,
  mongoTokenRepository,
  envs.FRONT_URL,
  resendConfirmationToken,
  emailTemplates
);
const confirmEmail = new ConfirmEmail(userRepository, mongoTokenRepository);
const loginUser = new LoginUser(
  userRepository,
  passwordEncrypter,
  tokenService,
  resendConfirmationToken
);
const sendForgotPassword = new SendForgotPassword(
  userRepository,
  mongoTokenRepository,
  emailService,
  emailTemplates,
  envs.FRONT_URL
);
const validateResetToken = new ValidateResetToken(mongoTokenRepository);
const resetPassword = new ResetPassword(
  userRepository,
  mongoTokenRepository,
  passwordEncrypter
);

//* Controlador
const authController = new AuthController(
  registerUser,
  confirmEmail,
  loginUser,
  sendForgotPassword,
  validateResetToken,
  resetPassword
);

export { authController };
