import { kMaxLength } from "buffer";
import mongoose from "mongoose";
import { type } from "os";

const itemScema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Item = mongoose.model("Item", itemScema);
