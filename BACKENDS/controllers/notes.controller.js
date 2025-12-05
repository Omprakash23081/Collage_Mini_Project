import ApiResponse from "../util/ApiResponse.js";
import { Upload } from "../config/cloudinary.js";
import {
  validateNotes,
  UpdatevalidateNotes,
} from "../validation/notes.validation.js";
import {
  StudyMaterial,
  TesmpStudyMaterial,
} from "../models/studyMaterial.model.js";

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

const uplodeNotes = async (req, res) => {
  try {
    await validateNotes.validateAsync(req.body).catch((err) => {
      return res.status(400).json(new ApiResponse(400, null, err));
    });

    const { subjectName, description, teacherName, year, type } = req.body;

    const resourcesUrl = await Upload(req.file?.path);

    let response = null;

    const obj = {
      subjectName,
      description,
      teacherName,
      year,
      type,
      uploadedBy: req.user,
      fileUrl: resourcesUrl,
    };

    if (req.user.role === "admin") {
      response = await StudyMaterial.create(obj);
    } else {
      response = await TesmpStudyMaterial.create(obj);
    }

    if (response) {
      return res
        .status(200)
        .json(new ApiResponse(200, response, "Notes Uplode sucessfully"));
    } else {
      return res
        .status(500)
        .json(new ApiResponse(500, null, "Faild to uplode notes "));
    }
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

const updateNotes = async (req, res) => {
  const { subjectName, description, teacherName, year, type } = req.body;
  let updateData = null;
  if (subjectName) updateData.subjectName = subjectName;
  if (description) updateData.description = description;
  if (teacherName) updateData.teacherName = teacherName;
  if (year) updateData.year = year;
  if (type) updateData.type = type;

  await UpdatevalidateNotes.validateAsync(req.body).catch((err) => {
    return res
      .status(400)
      .json(new ApiResponse(400, err, "Enter valid inputs"));
  });

  if (req.user.role === "admin") {
    const response = StudyMaterial.findByIdAndUpdate(
      req.params,
      {
        updateData,
      },
      { new: true, runValidators: true }
    );

    if (response) {
      return res
        .status(200)
        .json(new ApiResponse(200, response, "Notes update Sucessfully"));
    } else {
      return res
        .status(500)
        .json(new ApiResponse(500, null, "Faild to uplode in db"));
    }
  } else {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Notes can only update by admin"));
  }
};

const delateNotes = async (req, res) => {
  const { id } = req.params;

  if (req.user.role !== "admin") {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Notes can only Delete by admin"));
  }

  const response = await StudyMaterial.findByIdAndDelete(id);

  if (response) {
    return res
      .status(200)
      .json(new ApiResponse(200, response, "Notes Delete Sucessfully"));
  } else {
    return res
      .status(500)
      .json(
        new ApiResponse(500, null, "Gating errer or this item is not present ")
      );
  }
};

export { uplodeNotes, getNotes, updateNotes, delateNotes, getSpecificNotes };
