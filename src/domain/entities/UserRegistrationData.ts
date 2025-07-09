import { Role } from "./Role.entity";

export interface UserRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
} 