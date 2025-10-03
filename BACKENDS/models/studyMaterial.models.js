import mongoose from "mongoose";

const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["NOTES", "PYQ"],
      required: true,
    },
  },
  { timestamps: true }
);

export const StudyMaterial = mongoose.model("StudyMaterial", notesSchema);
