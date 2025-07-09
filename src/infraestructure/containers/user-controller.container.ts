import { MongoUserSummaryRepository } from "@/infraestructure/database/repositories/user/MongoUserRepository";
import { GetAllUsers } from "@/application/usecases/user/GetAllUsers";

export const createUserControllerContainer = () => {
  // Repositories
  const userRepository = new MongoUserSummaryRepository();

  // Use cases
  const getAllUsers = new GetAllUsers(userRepository);

  return {
    getAllUsers,
  };
}; 