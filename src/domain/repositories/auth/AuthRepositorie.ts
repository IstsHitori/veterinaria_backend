import { AuthUser } from "@/domain/entities/user/AuthUser";
import { User } from "@/domain/entities/user/User.entity";

export interface AuthRepositorie {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User>;
  findByIdForAuth(id: string): Promise<AuthUser | null>;
  update(idUser: string, updateData: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
  canCreateAdmin(): Promise<boolean>;
}
