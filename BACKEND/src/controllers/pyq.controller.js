import ApiResponse from "../utils/ApiResponse.js";
import { Upload } from "../config/cloudinary.js";
import mongoose from "mongoose";
import {
  validatePYQ,
  validatePYQUpdate,
} from "../validation/pyq.validation.js";
import { PYQ } from "../models/pyq.model.js";

const uploadPYQ = async (req, res) => {
  const {
    subjectName,
    teacherName,
    year,
    isPremium,
    status,
    isAll,
    examType,
    chapter,
    chapterName,
  } = req.body;

  // Handle Joi validation
  const resp = validatePYQ.validate(req.body);
  if (resp.error) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Validation Failed: " + resp.error));
  }

  // if (req.user.role !== "admin") {
  //   return res
  //     .status(400)
  //     .json(new ApiResponse(400, null, "PYQ can only be submitted by admin"));
  // }

  let fileUrl = null;
  if (req.file?.path) {
    fileUrl = await Upload(req.file.path, req.file.isImage);
  }

  const response = await PYQ.create({
    subjectName,
    teacherName,
    year,
    fileUrl,
    isPremium: isPremium === 'true' || isPremium === true,
    status,
    isAll: isAll === 'true' || isAll === true,
    chapter,
    chapterName,
    examType,
    uploadedBy: req.user,
  });

  if (response) {
    return res
      .status(200)
      .json(new ApiResponse(200, response, "PYQ uploaded successfully"));
  } else {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Failed to upload PYQ"));
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
    const {
      questionNumber,
      subjectName,
      question,
      tag,
      years,
      answer,
      isPremium,
      status,
      difficulty,
    } = req.body;

    const { error: validationError } = validatePYQUpdate.validate(req.body);
    if (validationError) {
      return res.status(400).json(new ApiResponse(400, null, validationError.message));
    }

    let updateData = {};

    if (questionNumber) updateData.questionNumber = questionNumber;
    if (subjectName) updateData.subjectName = subjectName;
    if (question) updateData.question = question;
    if (tag) updateData.tag = tag;
    if (years) updateData.years = years;
    if (req.body.year) updateData.year = req.body.year;
    if (answer) updateData.answer = answer;
    if (isPremium !== undefined) updateData.isPremium = isPremium === 'true' || isPremium === true;
    if (req.body.isAll !== undefined) updateData.isAll = req.body.isAll === 'true' || req.body.isAll === true;
    if (req.body.teacherName) updateData.teacherName = req.body.teacherName;
    if (req.body.chapter) updateData.chapter = req.body.chapter;
    if (req.body.chapterName) updateData.chapterName = req.body.chapterName;
    if (req.body.examType) updateData.examType = req.body.examType;
    if (status) updateData.status = status;
    if (difficulty) updateData.difficulty = difficulty;

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
    console.log("Update PYQ Error:", err);
    return res
      .status(400)
      .json(new ApiResponse(400, err, "Please enter valid inputs"));
  }
};

const deletePYQ = async (req, res) => {
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
export { getPYQ, updatePYQ, deletePYQ, uploadPYQ, getPYQById };
