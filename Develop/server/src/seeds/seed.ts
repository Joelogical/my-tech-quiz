import { db } from "../config/connection.js";
import { Question } from "../models/index.js";
import cleanDB from "./cleanDb.js";
import questionData from "./pythonQuestions.json" assert { type: "json" };

const seedDatabase = async () => {
  try {
    await db();
    await cleanDB();
    await Question.deleteMany({});
    await Question.insertMany(questionData);
    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
