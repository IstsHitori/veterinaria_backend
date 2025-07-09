import { Role } from "@/domain/entities/auth/Role.entity";
import { User } from "../entities/auth/User.entity";
import { BadRequest } from "@/domain/errors/BadRequest";
import { RegisterUserData } from "../interfaces/auth/user.interfaces";

export class UserFactory {
  static fromObject(obj: { [key: string]: any }): User {
    const {
      id,
      _id,
      firstName,
      lastName,
      email,
      password,
      role,
      emailValidated,
      createdAt,
      updatedAt,
      deletedAt,
      isActive,
      isDeleted,
      lastLogin,
    } = obj;
    const validRoles = Object.values(Role);
    if (!id && !_id) throw new BadRequest("El id es requerido");
    if (!firstName) throw new BadRequest("El nombre es requerido");
    if (!lastName) throw new BadRequest("El apellido es requerido");
    if (!email) throw new BadRequest("El email es requerido");
    if (!password) throw new BadRequest("La contraseña es requerida");
    if (!role) throw new BadRequest("El rol es requerido");
    if (!validRoles.includes(role)) throw new BadRequest("El rol no es válido");
    if (!emailValidated) throw new BadRequest("El email no ha sido validado");
    if (!createdAt) throw new BadRequest("La fecha de creación es requerida");

    return new User(
      id || _id,
      firstName,
      lastName,
      email,
      password,
      role,
      emailValidated,
      createdAt,
      updatedAt,
      deletedAt,
      isActive,
      isDeleted,
      lastLogin
    );
  }
  static createUserToRegister(user: RegisterUserData): User {
    return new User(
      "",
      user.firstName,
      user.lastName,
      user.email,
      user.password,
      user.role,
      false, // emailValidated
      new Date(), // createdAt
      null, // updatedAt
      null, // deletedAt
      false, // isDeleted
      true, // isActive
      null // lastLogin
    );
  }
}
