import { Document, Schema, model } from "mongoose";
import { IProfile } from "./Profile";

enum UserRole {
  Admin = "admin",
  User = "user",
}

export interface IUser extends Document {
  name: string;
  email: string;
  username: string;
  password: string;
  role: UserRole;
  profile: IProfile;
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: UserRole.User,
    },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
