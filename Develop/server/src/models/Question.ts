import { Schema, model } from "mongoose";

export interface IQuestion {
  question: string;
  answers: string[];
  correctAnswer: number;
}

const questionSchema = new Schema<IQuestion>({
  question: {
    type: String,
    required: true,
    trim: true,
  },
  answers: [
    {
      type: String,
      required: true,
    },
  ],
  correctAnswer: {
    type: Number,
    required: true,
  },
});

const Question = model<IQuestion>("Question", questionSchema);

export { Question };
