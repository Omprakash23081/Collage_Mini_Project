import mongoose from "mongoose";

const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    teacher: {
      type: String,
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
      required: true,
    },
  },
  { timestamps: true }
);

export const StudyMaterial = mongoose.model("StudyMaterial", notesSchema);
