import { Role } from "@/domain/entities/auth/Role.entity";
import { UserSummary } from "@/domain/entities/user/UserSummary";

export interface UserRepositorie {
  getAllUsers(idUser:string): Promise<UserSummary[]>;
  isAdmin(rol:Role):boolean;
}
