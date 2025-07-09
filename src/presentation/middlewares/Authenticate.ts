import { User } from "@/domain/entities/auth/User.entity";
import { Unauthorized } from "@/domain/errors/Unauthorized";
import { UserRepository } from "@/domain/repositories/auth/UserRepository";
import { TokenService } from "@/domain/services/TokenService";
import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

type TokenPayloadType = {
  id: string;
};

export class Authenticate {
  constructor(
    private readonly jwtTokenService: TokenService,
    private readonly userRepository: UserRepository
  ) {}

  async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const bearer = req.headers.authorization;
      if (!bearer) throw new Unauthorized("No estás autorizado");

      const token = bearer.split(" ")[1];
      if (!token) throw new Unauthorized("Token no disponible");

      const decoded = this.jwtTokenService.verify(token) as TokenPayloadType;
      if (typeof decoded === "object" && decoded.id) {
        const user = await this.userRepository.findById(decoded.id);
        if (!user) throw new Unauthorized("Token no válido");
        req.user = user;
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}
