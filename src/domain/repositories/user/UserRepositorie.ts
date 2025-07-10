import { Role } from "@/domain/entities/auth/Role.entity";
import { UserSummary } from "@/domain/entities/user/UserSummary";

export interface UserRepositorie {
  getAllUsers(): Promise<UserSummary[]>;
  isAdmin(rol:Role):boolean;
}
