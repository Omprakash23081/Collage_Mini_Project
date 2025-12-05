import { Career } from "../models/career.model.js";
import { asyncHandler } from "../util/asyncHandler.js";
import { ApiError } from "../util/ApiError.js";
import ApiResponse from "../util/ApiResponse.js";

// Get all career opportunities
const getAllCareers = asyncHandler(async (req, res) => {
  const careers = await Career.find().sort({ createdAt: -1 });
  return res
    .status(200)
    .json(new ApiResponse(200, careers, "Career opportunities fetched successfully"));
});

// Get specific career opportunity by ID
const getCareerById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const career = await Career.findById(id);

  if (!career) {
    throw new ApiError(404, "Career opportunity not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, career, "Career opportunity fetched successfully"));
});

// Create a new career opportunity (Admin only)
const createCareer = asyncHandler(async (req, res) => {
  const { title, company, description, link, type, location, salary } = req.body;

  if (!title || !company || !description || !link || !location) {
    throw new ApiError(400, "All required fields must be provided");
  }

  const career = await Career.create({
    title,
    company,
    description,
    link,
    type,
    location,
    salary,
    postedBy: req.user?._id, // Assuming req.user is populated by auth middleware
  });

  return res
    .status(201)
    .json(new ApiResponse(201, career, "Career opportunity created successfully"));
});

// Delete a career opportunity (Admin only)
const deleteCareer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const career = await Career.findById(id);

  if (!career) {
    throw new ApiError(404, "Career opportunity not found");
  }

  await Career.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Career opportunity deleted successfully"));
});

// Update a career opportunity
const updateCareer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, company, description, link, type, location, salary } =
    req.body;

  const career = await Career.findByIdAndUpdate(
    id,
    {
      title,
      company,
      description,
      link,
      type,
      location,
      salary,
    },
    { new: true }
  );

  if (!career) {
    throw new ApiError(404, "Career opportunity not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, career, "Career opportunity updated successfully"));
});

export {
  getAllCareers,
  getCareerById,
  createCareer,
  deleteCareer,
  updateCareer,
};
