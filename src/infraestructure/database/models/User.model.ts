import { Role } from "@/domain/entities/auth/Role.entity";
import { User } from "@/domain/entities/User.entity";
import { Document, model, Schema } from "mongoose";

const validRole = Object.values(Role);
const userSchema = new Schema<User>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: validRole },
    emailValidated: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<User>("User", userSchema);
