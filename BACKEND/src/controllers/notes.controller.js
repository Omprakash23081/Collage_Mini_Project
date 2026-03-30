import ApiResponse from "../utils/ApiResponse.js";
import { Upload } from "../config/cloudinary.js";
import {
  validateNotes,
  UpdatevalidateNotes,
} from "../validation/notes.validation.js";
import { StudyMaterial } from "../models/studyMaterial.model.js";

const getNotes = async (req, res) => {
  try {
    const data = await StudyMaterial.find({});

    if (data.length > 0) {
      return res.status(200).json(new ApiResponse(200, data, ""));
    } else {
      return res.status(404).json(new ApiResponse(404, [], "No notes found"));
    }
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Error during fetching data"));
  }
};

const getSpecificNotes = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "plase selact valid Subject"));
  }
  const data = await StudyMaterial.findById(id);

  if (data?.length > 0) {
    return res.status(200).json(new ApiResponse(200, data, ""));
  } else {
    return res.status(404).json(new ApiResponse(404, [], "No notes found"));
  }
};

const uploadNotes = async (req, res) => {
  try {
    req.body?.isFull === "undefined" && (req.body.isFull = false);
    const { error } = validateNotes.validate(req.body);

    if (error) {
      return res.status(400).json(new ApiResponse(400, null, error.message));
    }

    if (!req.file) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Please upload a file"));
    }

    const {
      subjectName,
      teacherName,
      year,
      isPremium,
      status,
      isFull,
      chapterName,
    } = req.body;

    const resourcesUrl = await Upload(req.file.buffer || req.file.path, req.file.isImage);
    console.log(resourcesUrl, "response Url is ");

    if (!resourcesUrl) {
      return res
        .status(500)
        .json(new ApiResponse(500, null, "Failed to upload file to storage"));
    }

    const obj = {
      subjectName: subjectName?.toLowerCase(),
      teacherName: teacherName?.toLowerCase(),
      year,
      isPremium: isPremium === "true" || isPremium === true,
      isFull: isFull === "true" || isFull === true,
      status: status || "draft",
      uploadedBy: req.user,
      fileUrl: resourcesUrl,
      chapterName: chapterName || "",
    };

    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json(
          new ApiResponse(403, null, "Notes can only be uploaded by admin"),
        );
    }

    const response = await StudyMaterial.create(obj);

    if (response) {
      return res
        .status(200)
        .json(new ApiResponse(200, response, "Notes uploaded successfully"));
    } else {
      return res
        .status(500)
        .json(new ApiResponse(500, null, "Failed to save notes to database"));
    }
  } catch (error) {
    console.error("Upload Notes Error:", error);
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          error.message || "An unexpected error occurred during upload",
        ),
      );
  }
};

const updateNotes = async (req, res) => {
  try {
    const {
      subjectName,
      description,
      teacherName,
      year,
      type,
      isPremium,
      status,
      difficulty,
      isImportant,
    } = req.body;
    let updateData = {};
    if (subjectName) updateData.subjectName = subjectName.toLowerCase();
    if (description) updateData.description = description;
    if (teacherName) updateData.teacherName = teacherName.toLowerCase();
    if (year) updateData.year = year;
    if (type) updateData.type = type;
    if (isPremium !== undefined)
      updateData.isPremium = isPremium === "true" || isPremium === true;
    if (isImportant !== undefined)
      updateData.isImportant = isImportant === "true" || isImportant === true;
    if (req.body.isFull !== undefined)
      updateData.isFull =
        req.body.isFull === "true" || req.body.isFull === true;
    if (req.body.chapterName !== undefined)
      updateData.chapterName = req.body.chapterName;
    if (status) updateData.status = status;
    if (difficulty) updateData.difficulty = difficulty;

    if (req.file) {
      const resourcesUrl = await Upload(req.file.buffer || req.file.path, req.file.isImage);
      if (resourcesUrl) {
        updateData.fileUrl = resourcesUrl;
      }
    }

    // validation (fix validation call if needed, or skip for partial update if UpdatevalidateNotes is strictly required)
    // Assuming UpdatevalidateNotes exists or we might want to skip explicit validation call here if Joi is strict on required fields
    // For now, let's keep it but ideally we should update UpdatevalidateNotes schema too.

    const { error: validationError } = UpdatevalidateNotes.validate(req.body);
    if (validationError) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, validationError.message));
    }

    if (req.user.role === "admin") {
      const response = await StudyMaterial.findByIdAndUpdate(
        req.params.id, // Fixed: req.params.id
        updateData, // Passed directly
        { new: true, runValidators: true },
      );

      if (response) {
        return res
          .status(200)
          .json(new ApiResponse(200, response, "Notes update Sucessfully"));
      } else {
        return res
          .status(404) // Changed to 404 for not found
          .json(new ApiResponse(404, null, "Note not found"));
      }
    } else {
      return res
        .status(403) // Changed to 403
        .json(new ApiResponse(403, null, "Notes can only update by admin"));
    }
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

const deleteNotes = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json(new ApiResponse(403, null, "Notes can only Delete by admin"));
    }

    const response = await StudyMaterial.findByIdAndDelete(id);

    if (response) {
      return res
        .status(200)
        .json(new ApiResponse(200, response, "Notes Delete Sucessfully"));
    } else {
      return res.status(404).json(new ApiResponse(404, null, "Item not found"));
    }
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

export { uploadNotes, getNotes, updateNotes, deleteNotes, getSpecificNotes };
