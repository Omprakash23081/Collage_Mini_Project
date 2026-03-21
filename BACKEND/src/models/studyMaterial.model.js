import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    subjectName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    teacherName: {
      type: String,
      required: true,
      lowercase: true,
    },

    year: {
      type: String,
      required: true,
    },

    isFull: {
      type: Boolean,
      default: false,
    },

    chapterName: {
      type: String,
      required: function () {
        return !this.isFull;
      },
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

    // SaaS / CMS Features
    isPremium: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["draft", "approved", "published", "archived"],
      default: "draft",
    },
  },
  { timestamps: true }
);

export const StudyMaterial = mongoose.model("StudyMaterial", notesSchema);
