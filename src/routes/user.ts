import express from "express";
import * as userController from "../controllers/user";
import { validation } from "../middleware/validation";
// Middleware
import { deleteReferences } from "../middleware/deleteReferences";

const router = express.Router();

router.post("/signup", validation.signup, userController.signup);
router.post("/signin", validation.signin, userController.signin);
router.post("/signout", userController.signout);
router.delete("/delete/user/:id", deleteReferences, userController.deleteUser);

export default router;
