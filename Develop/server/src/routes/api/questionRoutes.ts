import { Router } from "express";
import { getRandomQuestions } from "../../controllers/questionController";

const router = Router();

router.route("/random").get(getRandomQuestions);

export default router;
