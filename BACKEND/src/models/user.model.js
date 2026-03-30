import mongoose from "mongoose";
import bcrypt from "bcrypt";
// import { required } from "joi";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    // Security & Auth
    emailVerified: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
    },
    provider: {
      type: String,
      default: "local", // 'google', 'local'
    },
    refreshToken: {
      type: [String], // Array for multi-device support
      default: [],
    },
    
    // RBAC & Features
    role: {
      type: String,
      enum: ["student", "admin", "moderator", "content_manager", "canteen_vendor", "stationery_vendor", "teacher"],
      default: "student",
      required: true,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    premiumExpiry: {
      type: Date,
    },

    // Profile & Activity
    profileImage: {
      type: String,
      default: "https://via.placeholder.com/150",
    },
    year: {
      type: String,
      enum: ["year1", "year2", "year3", "year4"],
    },
    phone: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    streak: {
      type: Number,
      default: 0,
    },
    activityLog: [{
      action: String,
      timestamp: { type: Date, default: Date.now }
    }],
    lastVisitedUrl: {
      type: String,
      default: "",
    },
    achievements: [
      {
        title: String,
        description: String,
        date: { type: Date, default: Date.now },
        icon: String, 
        earned: { type: Boolean, default: true } 
      },
    ],
    paymentQRCode: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
