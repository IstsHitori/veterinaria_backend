import { TokenService } from "@/domain/services/TokenService";
import { envs } from "@/infraestructure/config/envs";
import jwt, { JwtPayload } from "jsonwebtoken";

export class JwtTokenService implements TokenService {
  generate(payload: object, options: object) {
    const token = jwt.sign(payload, envs.JWT_SEED, options);
    return token;
  }
  verify(token: string): JwtPayload {
    const decoded = jwt.verify(token, envs.JWT_SEED);
    return decoded as JwtPayload;
  }
}
