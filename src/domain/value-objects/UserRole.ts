import { Role } from "../entities/auth/Role.entity";
import { BadRequest } from "../errors/BadRequest";
import { Unauthorized } from "../errors/Unauthorized";

export class UserRole {
  constructor(private readonly value: Role) {}

  static create(role: string): UserRole {
    console.log(role);

    if (!Object.values(Role).includes(role as Role))
      throw new BadRequest("El rol no es válido");
    return new UserRole(role as Role);
  }

  getValue(): Role {
    return this.value;
  }
}
