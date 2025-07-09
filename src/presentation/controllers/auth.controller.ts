import { RegisterUser } from "@/application/usecases/auth/RegisterUser";
import { ConfirmEmail } from "@/application/usecases/auth/ConfirmEmail";
import { plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { CreateUserDto } from "@/presentation/dtos/auth";
import { validateOrReject } from "class-validator";
import { Role } from "@/domain/entities/Role.entity";
import { BadRequest } from "@/domain/errors/BadRequest";
import { NotFound } from "@/domain/errors/NotFound";
import { ConfirmEmailDto } from "@/presentation/dtos/auth/ConfirmEmailDto";
import { LoginUser } from "@/application/usecases/auth/LoginUser";
import { Unauthorized } from "@/domain/errors/Unauthorized";
import { SendForgotPassword } from "@/application/usecases/auth/SendForgotPassword";
import { LoginUserDto } from "@/presentation/dtos/auth/LoginUserDto";
import { SendForgotPasswordDto } from "../dtos/auth/SendForgotPasswordDto";
import { ValidateTokenPasswordDto } from "../dtos/auth/ValidateTokenPasswordDto";
import { ValidateResetToken } from "@/application/usecases/auth/ValidateResetToken";
import { ResetPassword } from "@/application/usecases/auth/ResetPassword";
import { ResetPasswordDto } from "../dtos/auth/ResetPasswordDto";

export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUser,
    private readonly confirmEmailUseCase: ConfirmEmail,
    private readonly loginUserUseCase: LoginUser,
    private readonly sendForgotPasswordUseCase: SendForgotPassword,
    private readonly validateResetTokenUseCase: ValidateResetToken,
    private readonly resetPasswordUseCase: ResetPassword
  ) {}

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = plainToInstance(LoginUserDto, req.body);
      await validateOrReject(dto);

      const { email, password } = dto;
      const { status, token } = await this.loginUserUseCase.execute(
        email,
        password
      );
      if (status === "success") {
        res.status(200).send({ token });
        return;
      }
      res.status(200).send({ message: "Token de confirmación reenviado" });
    } catch (error) {
      next(error);
    }
  };

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = plainToInstance(CreateUserDto, req.body);
      await validateOrReject(dto);
      const result = await this.registerUserUseCase.execute({
        ...dto,
        role: dto.role as Role,
      });

      if (result.status === "created") {
        res.status(201).send({ message: "Usuario registrado correctamente" });
      } else {
        res.status(200).send({ message: "Token de confirmación reenviado" });
      }
    } catch (error) {
      next(error);
    }
  };

  confirmEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = req.params;

      const dto = plainToInstance(ConfirmEmailDto, { token });
      await validateOrReject(dto);

      if (!token) {
        res.status(400).send({ message: "Token es requerido" });
        return;
      }

      await this.confirmEmailUseCase.execute({ token });

      res.status(200).send({ message: "Email confirmado correctamente" });
    } catch (error) {
      next(error);
    }
  };

  sendForgotPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const dto = plainToInstance(SendForgotPasswordDto, req.body);
      await validateOrReject(dto);

      const { email } = dto;
      await this.sendForgotPasswordUseCase.execute(email);
      res
        .status(200)
        .send({ message: "Correo de recuperación de contraseña enviado" });
    } catch (error) {
      next(error);
    }
  };

  validateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = req.body;
      const dto = plainToInstance(ValidateTokenPasswordDto, { token });
      await validateOrReject(dto);
      await this.validateResetTokenUseCase.execute(token);
      res.status(200).send({ message: "Token válido" });
    } catch (error) {
      next(error);
    }
  };

  updatePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dtoPassword = plainToInstance(ResetPasswordDto, req.body);
      await validateOrReject(dtoPassword);
      const dtoToken = plainToInstance(ValidateTokenPasswordDto, {
        token: req.params["token"],
      });
      await validateOrReject(dtoToken);
      const updatePasswordData = {
        ...dtoPassword,
        ...dtoToken,
      };
      await this.resetPasswordUseCase.execute(updatePasswordData);
      res
        .status(200)
        .send({ message: "Contraseña restablecida correctamente" });
    } catch (error) {
      next(error);
    }
  };
}
