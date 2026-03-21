import mongoose from "mongoose";

const PYQSchem = new mongoose.Schema(
  {
    subjectName: {
      type: String,
      required: true,
      lowercase: true,
    },
    year: {
      type: String,
      required: true,
    },
    teacherName: {
      type: String,
      required: function () {
        return this.isAll;
      },
      lowercase: true,
    },
    // SaaS / CMS Features
    isPremium: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["draft", "approved"],
      default: "draft",
    },

    isAll: {
      type: Boolean,
      default: false,
    },

    examType: {
      type: String,
    },

    chapter: {
      type: String,
    },
    chapterName: {
      type: String,
      required: function () {
        return !this.isAll;
      },
    },

    fileUrl: {
      type: String,
      required: true,
    },

    // Audit
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const PYQ = mongoose.model("PYQ", PYQSchem);
