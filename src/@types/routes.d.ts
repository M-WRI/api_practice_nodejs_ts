import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface CustomRequest extends Request {
  userId: string;
  jwt: JwtPayload | string;
}
