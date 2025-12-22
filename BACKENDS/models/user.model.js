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

    refreshToken: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      required: true,
    },
    year: {
      type: String,
      enum: ["year1", "year2", "year3", "year4"],
    },
    bio: {
      type: String,
      default: "",
    },
    courses: [
      {
        name: String,
        progress: Number,
        timeSpent: String,
        lastAccessed: { type: Date, default: Date.now },
      },
    ],
    achievements: [
      {
        title: String,
        description: String,
        date: { type: Date, default: Date.now },
        icon: String, 
        earned: { type: Boolean, default: true } 
      },
    ],
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
