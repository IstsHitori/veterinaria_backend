import { UserModel } from "../../models/User.model";
import { BadRequest } from "@/domain/errors/BadRequest";
import { PasswordEncrypter } from "@/domain/services/PasswordEncrypter";
import { NotFound } from "@/domain/errors/NotFound";
import { HydratedDocument } from "mongoose";
import { Role } from "@/domain/entities/auth/Role.entity";
import { AuthRepositorie } from "@/domain/repositories/auth/AuthRepositorie";
import { User } from "@/domain/entities/user/User.entity";

export class MongoAuthRepository implements AuthRepositorie {
  constructor(private readonly passwordEncrypter: PasswordEncrypter) {}

  async canCreateAdmin(): Promise<boolean> {
    const adminCount = await UserModel.countDocuments({ role: Role.ADMIN });
    return adminCount === 0;
  }

  async create(userData: User): Promise<User> {
    try {
      const hashedPassword = await this.passwordEncrypter.hash(
        userData.password
      );
      const userDocument = {
        ...userData,
        password: hashedPassword,
      };

      const userCreated = await UserModel.create(userDocument);

      // Convertir el documento de MongoDB a la entidad User
      return this.toUser(userCreated);
    } catch (error) {
      console.error("Error creating user:", error);
      throw new BadRequest("Error al crear el usuario");
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const userFound = await UserModel.findOne({ email });
      return userFound;
    } catch (error) {
      throw new BadRequest("Error al buscar el usuario por email");
    }
  }
  async findById(id: string): Promise<User> {
    try {
      const userFound = await UserModel.findById(id);
      if (!userFound) {
        throw new NotFound("El usuario no existe");
      }
      const user = this.toUser(userFound);
      return user;
    } catch (error) {
      throw new BadRequest("Error al buscar el usuario por id");
    }
  }
  async update(idUser: string, updateData: Partial<User>): Promise<User> {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        idUser,
        updateData,
        { new: true }
      );

      if (!updatedUser) {
        throw new NotFound("Usuario no encontrado");
      }

      return updatedUser;
    } catch (error) {
      if (error instanceof NotFound) {
        throw error;
      }
      throw new BadRequest("Error al actualizar el usuario");
    }
  }
  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  private toUser(userCreated: HydratedDocument<User>): User {
    return new User(
      userCreated._id.toString(), // id
      userCreated.firstName, // firstName
      userCreated.lastName, // lastName
      userCreated.email, // email
      userCreated.password, // password
      userCreated.role, // role
      userCreated.emailValidated, // emailValidated
      userCreated.createdAt, // createdAt
      userCreated.updatedAt, // updatedAt
      userCreated.deletedAt, // deletedAt
      userCreated.isDeleted, // isDeleted
      userCreated.isActive, // isActive
      userCreated.lastLogin // lastLogin
    );
  }

}
