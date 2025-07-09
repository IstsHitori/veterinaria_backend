import { Role } from "../../entities/auth/Role.entity";

export interface RegisterUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
}
