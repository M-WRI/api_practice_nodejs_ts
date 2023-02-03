import express from "express";
import { Response, Request } from "express";
import { authenticationMiddleware } from "../middleware/routeProtection";

const router = express.Router();

router.get("/test", authenticationMiddleware, (req: Request, res: Response) => {
  res.json({ success: true, message: "Test route works!" });
});

export default router;
