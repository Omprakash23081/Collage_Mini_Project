import mongoose from "mongoose";

const adminLogSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      required: true, // e.g., "DELETE_NOTE", "UPDATE_USER_ROLE"
    },
    targetCollection: {
      type: String, // e.g., "StudyMaterial", "User"
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    details: {
      type: Object, // Flexible JSON for details (e.g., "Changed role to admin")
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
  },
  { timestamps: true }
);

export const AdminLog = mongoose.model("AdminLog", adminLogSchema);
