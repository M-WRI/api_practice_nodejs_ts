import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../@types/routes";

const JWT_SECRET = process.env.JWT_SECRET!;

export const protectRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const request = req as CustomRequest;

  if (request.headers["authorization"]) {
    try {
      let authorization = request.headers["authorization"];

      if (!authorization) {
        return res.status(401).json({ error: "Authorization header missing" });
      }

      let [type, token] = authorization.split(" ");
      if (type !== "Bearer") {
        return res.status(401).json({ error: "Invalid authorization type" });
      }

      request.jwt = jwt.verify(token, JWT_SECRET);
      return next();
    } catch (err) {
      if (err instanceof jwt.JsonWebTokenError) {
        return res.status(403).json({ error: "Invalid or expired token" });
      }
      return res.status(500).json({ error: "Server error" });
    }
  } else {
    return res.status(401).json({ error: "Token is missing" });
  }
};
