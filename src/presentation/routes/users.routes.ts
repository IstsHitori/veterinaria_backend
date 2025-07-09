import { Router } from "express";
import { UsersController } from "@/presentation/controllers/users.controller";
import { createUserControllerContainer } from "@/infraestructure/containers/user-controller.container";

export class UsersRoutes {
  static get routes(): Router {
    const router = Router();
    const { getAllUsers } = createUserControllerContainer();
    const usersController = new UsersController(getAllUsers);

    // GET /api/users
    router.get("/", usersController.getAllUsers.bind(usersController));

    return router;
  }
}