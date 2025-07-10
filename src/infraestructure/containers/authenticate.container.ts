import { Authenticate } from "@/presentation/middlewares/Authenticate";
import { JwtTokenService } from "../adapters/token/JwtTokenService";
import { MongoAuthRepository } from "../database/repositories/auth/MongoAuthRepository";
import { BcryptPasswordEncrypter } from "../adapters/crypto/BcryptPasswordEncrypter";

//Repositories
const jwtTokenService = new JwtTokenService();
const passwordEncrypter = new BcryptPasswordEncrypter();
const authRepositorie = new MongoAuthRepository(passwordEncrypter);

const authenticate = new Authenticate(jwtTokenService, authRepositorie);

export { authenticate };
