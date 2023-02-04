import { NextFunction, Request, Response } from "express";
import { Profile } from "../models/Profile";

export const deleteReferences = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    await Profile.deleteMany({ userId: id });
    // any other references could be deleted here
    next();
  } catch (error) {
    next(error);
  }
};
