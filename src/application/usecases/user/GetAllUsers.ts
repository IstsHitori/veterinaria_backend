import { Role } from "@/domain/entities/auth/Role.entity";
import { UserSummary } from "@/domain/entities/user/UserSummary";
import { BadRequest } from "@/domain/errors/BadRequest";
import { Unauthorized } from "@/domain/errors/Unauthorized";
import { UserRepositorie } from "@/domain/repositories/user/UserRepositorie";

export class GetAllUsers {
  constructor(private readonly userRepositorie: UserRepositorie) {}

  async execute(rol: Role): Promise<UserSummary[]> {
    try {
      if (!this.userRepositorie.isAdmin(rol))
        throw new Unauthorized("No tienes permiso para esta acción");
      return await this.userRepositorie.getAllUsers();
    } catch (error) {
      if (error instanceof Unauthorized) throw error;
      throw new BadRequest("Ha ocurrido un error al obtener los usuarios");
    }
  }
}
