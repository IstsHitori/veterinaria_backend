import { UserRepositorie } from "@/domain/repositories/user/UserRepositorie";
import { UserSummary } from "@/domain/entities/user/UserSummary";
import { UserModel } from "@/infraestructure/database/models/User.model";
import { Role } from "@/domain/entities/auth/Role.entity";

export class MongoUserRepository implements UserRepositorie {
  isAdmin(rol: Role): boolean {
    return rol === Role.ADMIN;
  }
  async getAllUsers(): Promise<UserSummary[]> {
    const users = await UserModel.find({ isDeleted: false })
      .select("-password -__v")
      .lean();

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
