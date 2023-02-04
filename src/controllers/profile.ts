import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { Profile, IProfile } from "../models/Profile";

const JWT_SECRET = process.env.JWT_SECRET!;

export const getAllProfiles = async (req: Request, res: Response) => {
  try {
    const profiles = await Profile.find();
    res.json({ message: "Get all profile data successful", profiles });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error - Get profiles" });
  }
};

export const createProfile = async (req: any, res: Response) => {
  try {
    const token = req.headers["authorization"]!.replace("Bearer ", "");
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const userId = decoded.userId;

    const profile = new Profile({
      userId: userId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthdate: req.body.birthdate,
      // address: req.body.address,
    }) as IProfile;

    const savedProfile = await profile.save();
    res
      .status(201)
      .json({ message: "Saving profile data successful", savedProfile });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error - Create profile" });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error - Get profile" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProfile)
      return res.status(404).json({ error: "Profile not found" });
    res.json(updatedProfile);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error - Update profile" });
  }
};

export const deleteProfile = async (req: Request, res: Response) => {
  try {
    const deletedProfile = await Profile.findByIdAndDelete(req.params.id);
    if (!deletedProfile)
      return res.status(404).json({ error: "Profile not found" });
    res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error - Update profile" });
  }
};
