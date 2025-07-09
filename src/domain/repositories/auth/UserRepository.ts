import { User } from "@/domain/entities/auth/User.entity";

export interface UserRepository {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User>;
  update(idUser: string, updateData: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
  canCreateAdmin(): Promise<boolean>; 
  //Admin
  getAllUsers(): Promise<User[]>;
}