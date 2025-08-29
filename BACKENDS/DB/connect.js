import mongoose from "mongoose";
import { DB_NAME } from "../constent.js";

const connectDB = async () => {
  try {
    const res = await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`);
    console.log(`Connected to MongoDB database: ${res.connection.name}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;
