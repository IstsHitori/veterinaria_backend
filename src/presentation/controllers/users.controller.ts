import { Request, Response } from "express";
import { GetAllUsers } from "@/application/usecases/user/GetAllUsers";

export class UsersController {
  constructor(private readonly getAllUsersUseCase: GetAllUsers) {}

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
    } catch (error) {}
  }
}
