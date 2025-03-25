import { Router } from "express";
import questionRoutes from "./questionRoutes.js";

const router = Router();

router.use("/questions", questionRoutes);

export default router;
