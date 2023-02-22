import express from "express";
import * as meController from "../controllers/me";
import { protectRoute } from "../middleware/protectRoute";

const router = express.Router();

router.get("/me", protectRoute, meController.me);

export default router;
