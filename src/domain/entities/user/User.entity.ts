import { Role } from "../auth/Role.entity";


export class User {
  constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public email: string,
    public password: string,
    public role: Role,
    public emailValidated: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date | null,
    public readonly deletedAt: Date | null,
    public readonly isDeleted: boolean,
    public readonly isActive: boolean,
    public readonly lastLogin: Date | null
  ) {}

  confirmEmail(): void {
    this.emailValidated = true;
  }
  updatePassword(passwordValidated: string): void {
    this.password = passwordValidated;
  }

  updateEmail(emailValidated: string): void {
    this.email = emailValidated;
  }

  updateRol(rolValidated: Role): void {
    this.role = rolValidated;
  }
}
