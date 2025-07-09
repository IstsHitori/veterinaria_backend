import { UserRepository } from "@/domain/repositories/auth/UserRepository";
import { User } from "@/domain/entities/auth/User.entity";

export class GetAllUsers {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return await this.userRepository.getAllUsers();
  }
}