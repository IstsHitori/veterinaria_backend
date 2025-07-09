import { UserSummary } from "@/domain/entities/user/UserSummary";
import { UserRepositorie } from "@/domain/repositories/user/UserRepositorie";

export class GetAllUsers {
  constructor(private readonly userRepositorie: UserRepositorie) {}

  async execute(): Promise<UserSummary[]> {
    return await this.userRepositorie.getAllUsers();
  }
}
