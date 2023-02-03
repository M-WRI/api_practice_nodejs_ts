import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User";

const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { email, username } = req.body;

  const userWithSameUsername = await User.findOne({ username });
  if (userWithSameUsername) {
    return res.status(400).json({ error: "Username already exists" });
  }
  const userWithSameEmail = await User.findOne({ email });
  if (userWithSameEmail) {
    return res.status(400).json({ error: "Email already exists" });
  }
  next();
};

const signin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: "Email or password incorrect" });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: "Email or password incorrect" });
  }
  next();
};

export const validation = {
  signup,
  signin,
};
