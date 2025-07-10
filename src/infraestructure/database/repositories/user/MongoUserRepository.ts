import { UserRepositorie } from "@/domain/repositories/user/UserRepositorie";
import { UserSummary } from "@/domain/entities/user/UserSummary";
import { UserModel } from "@/infraestructure/database/models/User.model";
import { Role } from "@/domain/entities/auth/Role.entity";
import { DatabaseError } from "@/domain/errors/DatabaseError";

export class MongoUserRepository implements UserRepositorie {
  async existsEmail(email: string): Promise<boolean> {
    try {
      const user = await UserModel.findOne({ email });
      return user !== null;
    } catch (error) {
      throw new DatabaseError("Error al buscar el usuario por email", error);
    }
  }

  async updateProfile(
    idUser: string,
    updateData: Partial<UserSummary>
  ): Promise<void> {
    try {
      const userUpdate = await UserModel.findByIdAndUpdate(idUser, updateData, {
        new: true,
      });
      if (!userUpdate)
        throw new DatabaseError("No se pudo actualizar el usuario");

    } catch (error) {
      if (error instanceof DatabaseError) throw error;
      throw new DatabaseError("Error técnico al actualizar el usuario", error);
    }
  }

  async findUserByID(idUser: string): Promise<UserSummary | null> {
    try {
      return await UserModel.findById(idUser);
    } catch (error) {
      throw new DatabaseError("Error al buscar el usuario", error);
    }
  }
  isAdmin(rol: Role): boolean {
    return rol === Role.ADMIN;
  }
  async getAllUsers(idUser: string): Promise<UserSummary[]> {
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
