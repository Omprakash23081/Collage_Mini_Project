import ApiResponse from "../util/ApiResponse.js";
import { Upload } from "../config/cloudinary.js";
import mongoose from "mongoose";
import {
  validatePYQ,
  validatePYQUpdate,
} from "../validation/pyq.validation.js";
import { PYQ } from "../models/pyq.model.js";

const addPYQ = async (req, res) => {
  try {
    const { questionNumber, subjectName, question, tag, years, answer } =
      req.body;

    await validatePYQ.validateAsync(req.body);

    if (req.user.role !== "admin") {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "PYQ can only be submitted by admin"));
    }

    let imageUrl = null;
    if (req.file?.path) {
      imageUrl = await Upload(req.file.path);
    }

    const response = await PYQ.create({
      questionNumber,
      subjectName,
      question,
      tag,
      years,
      answer,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, response, "PYQ uploaded successfully"));
  } catch (err) {
    return res
      .status(400)
      .json(new ApiResponse(400, err, "Please enter valid inputs"));
  }
};

const getPYQ = async (req, res) => {
  const data = await PYQ.find({});

  if (data.length > 0) {
    return res.status(200).json(new ApiResponse(200, data, ""));
  } else {
    return res.status(404).json(new ApiResponse(404, [], "No pyq found"));
  }
};

const getPYQById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Plase select valsid pyq"));
  }

  const response = await PYQ.findById(id);
  if (response) {
    return res
      .status(200)
      .json(new ApiResponse(200, response, "Has benn Uplode sucessfully"));
  }

  return res
    .status(500)
    .json(new ApiResponse(500, null, "faild to fatch data"));
};

const updatePYQ = async (req, res) => {
  if (!req.params.id) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Please select valid pyq"));
  }

  try {
    const { questionNumber, subjectName, question, tag, years, answer } =
      req.body;

    await validatePYQUpdate.validateAsync(req.body);

    let updateData = {};

    if (questionNumber) updateData.questionNumber = questionNumber;
    if (subjectName) updateData.subjectName = subjectName;
    if (question) updateData.question = question;
    if (tag) updateData.tag = tag;
    if (years) updateData.years = years;
    if (answer) updateData.answer = answer;

    const response = await PYQ.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (response) {
      return res
        .status(200)
        .json(new ApiResponse(200, response, "PYQ updated successfully"));
    }

    return res.status(500).json(new ApiResponse(500, null, "Failed to update"));
  } catch (err) {
    return res
      .status(400)
      .json(new ApiResponse(400, err, "Please enter valid inputs"));
  }
};

const delatePYQ = async (req, res) => {
  const { id } = req.params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Please select valid pyq"));
  }

  try {
    const response = await PYQ.findByIdAndDelete(id);

    if (!response) {
      return res.status(404).json(new ApiResponse(404, null, "PYQ not found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, response, "PYQ deleted successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Failed to delete PYQ"));
  }
};
export { getPYQ, updatePYQ, delatePYQ, addPYQ, getPYQById };
