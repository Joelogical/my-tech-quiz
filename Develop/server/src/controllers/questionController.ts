import { Request, Response } from "express";
import { Question } from "../models/index.js";

// gets a set of random questions
export const getRandomQuestions = async (req: Request, res: Response) => {
  try {
    // Log total questions in database
    const count = await Question.countDocuments();
    console.log(`Total questions in database: ${count}`);

    const questions = await Question.aggregate([{ $sample: { size: 10 } }]);
    console.log("Random questions:", JSON.stringify(questions, null, 2));

    if (!questions || questions.length === 0) {
      console.log("No questions found");
      return res.status(404).json({ message: "No questions found" });
    }

    res.json(questions);
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({ message: "Error fetching questions" });
  }
};
