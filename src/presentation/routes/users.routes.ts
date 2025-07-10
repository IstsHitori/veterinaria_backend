import { Router } from "express";
import { userController } from "@/infraestructure/containers/user-controller.container";
import { authenticate } from "@/infraestructure/containers/authenticate.container";
export class UsersRoutes {
  static get routes(): Router {
    
    const router = Router();
    // GET /api/users
    router.get("/",authenticate.authenticate, userController.getAllUsers);

    return router;
  }
}
