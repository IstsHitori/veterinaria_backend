import { GetAllUsers } from "@/application/usecases/user/GetAllUsers";
import { MongoUserRepository } from "../database/repositories/user/MongoUserRepository";
import { UserController } from "@/presentation/controllers/user.controller";

// Repositories
const mongoUserRepository = new MongoUserRepository();

// use cases
const getAllUsersUseCase = new GetAllUsers(mongoUserRepository);

const userController = new UserController(getAllUsersUseCase);

export { userController };
