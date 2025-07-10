import { Role } from "../auth/Role.entity";

export class AuthUser {
  constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly role: Role,
    public readonly emailValidated: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date | null
  ) {}
}
