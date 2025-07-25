import { Role } from "../auth/Role.entity";

export class UserSummary {
  constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly role: Role,
    public readonly emailValidated: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date | null,
    public readonly deletedAt: Date | null,
    public readonly isDeleted: boolean,
    public readonly isActive: boolean = true,
    public readonly lastLogin: Date | null
  ) {}
}