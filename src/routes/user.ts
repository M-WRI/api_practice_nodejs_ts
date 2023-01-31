import express from "express";
import * as userController from "../controllers/user";
import { validation } from "../middleware/validation";

const router = express.Router();

router.post("/signup", validation.signup, userController.signup);
router.post("/signin", validation.signin, userController.signin);
router.post("/signout", userController.signout);

export default router;
