import { Router, Request, Response } from "express";
import path from "path";
import apiRoutes from "./api/index.js";

const router = Router();

router.use("/", apiRoutes);

// serve up react front-end in production
router.use((_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../../client/dist/index.html"));
});

export default router;
