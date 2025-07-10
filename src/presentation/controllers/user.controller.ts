import { NextFunction, Request, Response } from "express";
import { GetAllUsers } from "@/application/usecases/user/GetAllUsers";
import { Unauthorized } from "@/domain/errors/Unauthorized";
import { UpdateProfile } from "@/application/usecases/user/UpdateProfile";
import { plainToInstance } from "class-transformer";
import { UpdateProfileDto } from "../dtos/user/UpdateProfile";
import { validateOrReject } from "class-validator";

export class UserController {
  constructor(
    private readonly getAllUsersUseCase: GetAllUsers,
    private readonly updateProfileUseCase: UpdateProfile
  ) {}

  getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user) throw new Unauthorized("No has iniciado sesión");
      const usersSummary = await this.getAllUsersUseCase.execute(
        user.role,
        user.id
      );
      res.send({ users: usersSummary });
    } catch (error) {
      next(error);
    }
  };
  updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user) throw new Unauthorized("No estás autenticado");
      //Actualizar el perfil
      const updateProfileDto = plainToInstance(UpdateProfileDto, req.body);
      await validateOrReject(updateProfileDto);
      const { emailChanged } = await this.updateProfileUseCase.execute(
        user.id,
        updateProfileDto
      );
      if (emailChanged) {
        res.json({
          message:
            "Se ha actualizado el email, por favor vuelve a iniciar sesión",
          logout: true,
        });
        return;
      }
      res.send({ message: "Perfil actualizado correctamente" });
    } catch (error) {
      next(error);
    }
  };
}
