import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectionString =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/tech_quiz";

export const db = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log("Successfully connected to MongoDB.");
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Database connection failed.");
  }
};
