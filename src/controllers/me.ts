import { Response, Request } from "express";
import { User } from "../models/User";
import { JwtPayload } from "jsonwebtoken";

interface IUserRequest extends Request {
  jwt?: JwtPayload;
  userId?: string;
}

export const me = async (req: IUserRequest, res: Response) => {
  const { userId } = req;

  try {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
