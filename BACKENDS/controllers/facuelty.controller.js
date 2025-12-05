import ApiResponse from "../util/ApiResponse.js";
import { Faculty } from "../models/facuelty.model.js";
import { Upload } from "../config/cloudinary.js";
import {
  validateFaculty,
  UpdatevalidateFaculty,
} from "../validation/faculty.validation.js";

const createFaculty = async (req, res) => {
  const { err } = validateFaculty.validate(req.body);
  if (err) {
    return res
      .status(400)
      .json(new ApiResponse(400, err, "Plse enter valid Inputs"));
  }
  const { name, departement, exprence, subject, description } = req.body;

  if (req.user.role !== "admin") {
    return res
      .status(400)
      .json(
        new ApiResponse(400, null, "Faculty detais only can upolde by Admin")
      );
  }

  let imageUrl = null;

  if (req.file?.path) {
    imageUrl = await Upload(req.file.path);
  }

  const response = await Faculty.create({
    name,
    departement,
    description,
    exprence,
    image: imageUrl,
    subject,
  });

  if (response) {
    return res
      .status(200)
      .json(new ApiResponse(200, response, "Faculty Data uplode sucessfully"));
  } else {
    return res
      .status(500)
      .json(
        new ApiResponse(500, null, "faild to Uplode Details of Faculty on Db ")
      );
  }
};

const getFaculty = async (req, res) => {
  const response = await Faculty.find({});

  if (response) {
    return res.status(200).json(new ApiResponse(200, response, ""));
  } else {
    return res
      .status(400)
      .json(new ApiResponse(500, null, "Faild to uplode on Db"));
  }
};

const getSpicificFaculityDetails = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "plase selact valid Faculity"));
  }
  const response = await Faculty.findById(id);
  if (response) {
    return res.status(200).json(new ApiResponse(200, response, ""));
  } else {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Faild to fatch data"));
  }
};

const updateFaculty = async (req, res) => {
  const { name, departement, exprence, subject, description } = req.body;

  if (req.user.role !== "admin") {
    return res
      .status(400)
      .json(
        new ApiResponse(400, null, "Faculty detais only can update by Admin")
      );
  }

  await UpdatevalidateFaculty.validateAsync(req.body).catch((err) => {
    return res
      .status(400)
      .json(new ApiResponse(400, err, "Plase enter valid enputes"));
  });

  let updateData = {};
  if (name) updateData.name = name;
  if (departement) updateData.departement = departement;
  if (exprence) updateData.exprence = exprence;
  if (subject) updateData.subject = subject;
  if (description) updateData.description = description;

  if (req.file?.path) {
    const imageUrl = await Upload(req.file.path);
    updateData.image = imageUrl;
  }

  const response = await Faculty.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });

  if (response) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, response, "Faculty details updates Sucessfily")
      );
  } else {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Faild to uplode on Db"));
  }
};

const delateFaculty = async (req, res) => {
  if (req.user.role !== "admin") {
    return res
      .status(400)
      .json(
        new ApiResponse(400, null, "Faculty data only can be delated by admin")
      );
  }

  const { id } = req.params;

  const response = await Faculty.findByIdAndDelete(id);

  if (response) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, response, "Faculty Detaild Delate sucessfully")
      );
  } else {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Faculty Detaild delation faild"));
  }
};

export {
  createFaculty,
  getFaculty,
  updateFaculty,
  delateFaculty,
  getSpicificFaculityDetails,
};
