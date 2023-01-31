import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET!;

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ userId: user._id }, JWT_SECRET!);
    return res.status(201).json({ message: "User created", token });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    const token = jwt.sign({ userId: user!._id }, JWT_SECRET);
    return res.json({ message: "Signin successful", token });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const signout = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Sign out successful" });
};
