import { Router } from "express";
import { authController } from "@/infraestructure/containers/auth-controller.container";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    router.post("/register", authController.register);
    router.post("/confirm-email/:token", authController.confirmEmail);
    router.post("/login", authController.login);
    router.post("/send-forgot-password", authController.sendForgotPassword);
    router.post("/validate-token", authController.validateToken);
    router.post("/update-password/:token", authController.updatePassword);
    return router;
  }
}
