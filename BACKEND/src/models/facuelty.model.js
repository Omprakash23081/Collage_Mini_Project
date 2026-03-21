import mongoose from "mongoose";

const facueltySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    subject: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Faculty = mongoose.model("Faculty", facueltySchema);
