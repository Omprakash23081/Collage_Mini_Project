import { Banner } from "../models/banner.model.js";
import { Upload } from "../config/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create a new banner
const createBanner = asyncHandler(async (req, res) => {
  const { title, description, link } = req.body;

  if (!title) {
    throw new ApiError(400, "Title is required");
  }

  // Handle Image Upload
  const fileSource = req.file?.buffer || req.file?.path;
  if (!fileSource) {
    throw new ApiError(400, "Banner image is required");
  }

  const imageUrl = await Upload(fileSource, true);
  if (!imageUrl) {
    throw new ApiError(500, "Failed to upload image to Cloudinary");
  }

  const banner = await Banner.create({
    title,
    description,
    link,
    image: imageUrl,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, banner, "Banner created successfully"));
});

// Get all banners (Public)
const getBanners = asyncHandler(async (req, res) => {
  const banners = await Banner.find({ isActive: true }).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, banners, "Banners fetched successfully"));
});

// Delete a banner
const deleteBanner = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const banner = await Banner.findByIdAndDelete(id);

  if (!banner) {
    throw new ApiError(404, "Banner not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Banner deleted successfully"));
});

export { createBanner, getBanners, deleteBanner };
