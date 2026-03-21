import mongoose from "mongoose";

const eventSchem = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  link: {
    type: String,
    required: true,
  },
  registrationDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
});

export const Event = mongoose.model("Event", eventSchem);
