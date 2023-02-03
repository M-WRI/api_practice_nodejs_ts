import express from "express";
import { Response, Request } from "express";
import { protectRoute } from "../middleware/protectRoute";

const router = express.Router();

router.get("/test", protectRoute, (req: Request, res: Response) => {
  res.json({ success: true, message: "Test route works!" });
});

export default router;
