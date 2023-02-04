import express from "express";
import * as profileController from "../controllers/profile";

const router = express.Router();

router.get("/", profileController.getAllProfiles);
router.post("/", profileController.createProfile);
router.get("/:id", profileController.getProfile);
router.patch("/:id", profileController.updateProfile);
router.delete("/:id", profileController.deleteProfile);

export default router;
