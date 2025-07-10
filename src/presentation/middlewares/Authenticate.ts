import { AuthUser } from "@/domain/entities/user/AuthUser";
import { Unauthorized } from "@/domain/errors/Unauthorized";
import { AuthRepositorie } from "@/domain/repositories/auth/AuthRepositorie";

import { TokenService } from "@/domain/services/TokenService";
import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

type TokenPayloadType = {
  id: string;
};

export class Authenticate {
  constructor(
    private readonly jwtTokenService: TokenService,
    private readonly authRepositorie: AuthRepositorie
  ) {}

  authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bearer = req.headers.authorization;
      if (!bearer) throw new Unauthorized("No estás autenticado");

      const token = bearer.split(" ")[1];
      if (!token) throw new Unauthorized("Token no disponible");
      
      const decoded = this.jwtTokenService.verify(token) as TokenPayloadType;
      if (typeof decoded === "object" && decoded.id) {
        const user = await this.authRepositorie.findByIdForAuth(decoded.id);
        if (!user) throw new Unauthorized("Token no válido");

        req.user = user;
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
