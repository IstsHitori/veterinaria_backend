import { Router } from "express";
import { AuthRoutes } from "./auth.routes";
import { PatientsRoutes } from "./patients.routes";
import { UsersRoutes } from "./users.routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api/patients", PatientsRoutes.routes);
    router.use("/api/users", UsersRoutes.routes);

    return router;
  }
}
