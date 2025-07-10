import { BadRequest } from "@/domain/errors/BadRequest";
import { Unauthorized } from "@/domain/errors/Unauthorized";
import { TokenService } from "@/domain/services/TokenService";
import { envs } from "@/infraestructure/config/envs";
import jwt, { JwtPayload } from "jsonwebtoken";

export class JwtTokenService implements TokenService {
  generate(payload: object, options: object) {
    const token = jwt.sign(payload, envs.JWT_SEED, options);
    return token;
  }

  verify(token: string): JwtPayload {
    try {
      const decoded = jwt.verify(token, envs.JWT_SEED);
      return decoded as JwtPayload;
    } catch (error: any) {
      if (error.name === "JsonWebTokenError") {
        throw new Unauthorized("Token malformado o inválido");
      }

      if (error.name === "TokenExpiredError") {
        throw new Unauthorized("Token expirado");
      }

      if (error.name === "NotBeforeError") {
        throw new Unauthorized("Token no válido aún");
      }

      throw new BadRequest("Error interno al verificar el token");
    }
  }
}
