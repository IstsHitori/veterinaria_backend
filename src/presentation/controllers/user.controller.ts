import { NextFunction, Request, Response } from "express";
import { GetAllUsers } from "@/application/usecases/user/GetAllUsers";
import { Unauthorized } from "@/domain/errors/Unauthorized";

export class UserController {
  constructor(private readonly getAllUsersUseCase: GetAllUsers) {}

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
}
