import { Request, Response } from "express";
import { IUser, User } from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET!;

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET!);
    return res.status(201).json({ message: "User created", token });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error - Signup" });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    const token = jwt.sign({ userId: user!._id }, JWT_SECRET);
    return res.json({ message: "Signin successful", token });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error - Signin" });
  }
};

export const signout = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Sign out successful" });
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  // Find the user in your database using the id
  User.findByIdAndDelete(id, (err: Error, user: IUser) => {
    if (err) return res.status(500).json({ error: "Error deleting user" });
    if (!user) return res.status(404).json({ error: "User not found" });
    // Return a success response if the user was successfully deleted
    return res.json({ success: true, message: "User successfully deleted" });
  });
};
