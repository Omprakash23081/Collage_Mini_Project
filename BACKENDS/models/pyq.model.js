import mongoose from "mongoose";

const PYQSchem = new mongoose.Schema(
  {
    questionNumber: {
      type: Number,
      required: true,
    },
    subjectName: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    tag: {
      type: String,
      required: true,
    },
    years: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

export const PYQ = mongoose.model("PYQ", PYQSchem);
