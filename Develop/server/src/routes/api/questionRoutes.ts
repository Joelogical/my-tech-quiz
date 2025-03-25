import { Router } from "express";
import { getRandomQuestions } from "../../controllers/questionController.js";

const router = Router();

router.route("/random").get(getRandomQuestions);

export default router;
