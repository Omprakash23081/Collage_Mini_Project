import mongoose from "mongoose";

const printRequestSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    documentUrl: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    settings: {
      copies: {
        type: Number,
        default: 1,
      },
      color: {
        type: Boolean,
        default: false,
      },
      doubleSided: {
        type: Boolean,
        default: false,
      },
      pageRange: {
        type: String, // e.g., "1-5", "All"
        default: "All",
      },
    },
    transactionId: {
      type: String,
    },
    building: {
      type: String,
    },
    classNumber: {
      type: String,
    },
    paymentProofUrl: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Printing", "Ready", "Completed", "Rejected"],
      default: "Pending",
    },
    totalEstimatedPrice: {
      type: Number,
    },
  },
  { timestamps: true }
);

const PrintRequest = mongoose.model("PrintRequest", printRequestSchema);

export default PrintRequest;
