import { Router } from "express";
import { userController } from "@/infraestructure/containers/user-controller.container";
import { authenticate } from "@/infraestructure/containers/authenticate.container";
export class UsersRoutes {
  static get routes(): Router {
    const router = Router();
    router.get("/", authenticate.authenticate, userController.getAllUsers);
    router.put("/", authenticate.authenticate, userController.updateProfile);

    return router;
  }
}
