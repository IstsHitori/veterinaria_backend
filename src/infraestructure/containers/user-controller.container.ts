import { GetAllUsers } from "@/application/usecases/user/GetAllUsers";
import { MongoUserRepository } from "../database/repositories/user/MongoUserRepository";
import { UserController } from "@/presentation/controllers/user.controller";
import { UpdateProfile } from "@/application/usecases/user/UpdateProfile";

// Repositories
const mongoUserRepository = new MongoUserRepository();

// use cases
const getAllUsersUseCase = new GetAllUsers(mongoUserRepository);
const updateProfileUseCase = new UpdateProfile(mongoUserRepository);

const userController = new UserController(
  getAllUsersUseCase,
  updateProfileUseCase
);

export { userController };
