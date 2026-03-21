import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String, // "Super", "Premium"
      required: true,
      unique: true,
    },
    prices: {
      monthly: { type: Number, required: true },
      quarterly: { type: Number, required: true },
      yearly: { type: Number, required: true },
    },
    // Array of feature objects to allow flexible rendering
    features: [
      {
        name: { type: String, required: true }, // e.g., "AKTU Video Solutions"
        included: { type: Boolean, default: true }, // true = check, false = cross
        textValue: { type: String }, // e.g., "2", "4" for devices. If present, overrides check/cross
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    highlight: {
      type: Boolean,
      default: false, // For "Most Popular" or styling
    },
  },
  { timestamps: true }
);

export const Plan = mongoose.model("Plan", planSchema);
