import mongoose from "mongoose";

const facueltySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    departement: {
      type: String,
      required: true,
    },
    exprence: {
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
