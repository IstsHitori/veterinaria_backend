import { UserSummary } from "@/domain/entities/user/UserSummary";

export interface UserRepositorie {
  getAllUsers(): Promise<UserSummary[]>;
}
