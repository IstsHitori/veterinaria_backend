import { UserRepositorie } from "@/domain/repositories/user/UserRepositorie";
import { UserSummary } from "@/domain/entities/user/UserSummary";
import { UserModel } from "@/infraestructure/database/models/User.model";
import { Role } from "@/domain/entities/auth/Role.entity";

export class MongoUserRepository implements UserRepositorie {
  isAdmin(rol: Role): boolean {
    return rol === Role.ADMIN;
  }
  async getAllUsers(idUser: string): Promise<UserSummary[]> {
    // Supongamos que tienes una variable llamada excludeId con el id que quieres excluir
    // Por ejemplo: const excludeId = "id_a_excluir";
    const users = await UserModel.find({ _id: { $ne: idUser } }).select(
      "-password -__v"
    );

    return users.map(
      (user) =>
        new UserSummary(
          user._id.toString(),
          user.firstName,
          user.lastName,
          user.email,
          user.role as Role,
          user.emailValidated,
          user.createdAt,
          user.updatedAt,
          user.deletedAt,
          user.isDeleted,
          user.isActive,
          user.lastLogin
        )
    );
  }
}
