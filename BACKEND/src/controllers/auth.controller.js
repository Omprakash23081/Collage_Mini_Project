import User from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import GenerateToken from "../services/auth.service.js";
import jwt from "jsonwebtoken";
import { Upload } from "../config/cloudinary.js";

const security = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
};

const loginUser = async (req, res) => {
  let { email, password: reqPassword, role } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json(new ApiResponse(404, null, "User not found"));
  }

  // Role check is now optional for login to prevent mismatches from the frontend default state
  /*
  if (role && user.role !== role) {
    return res
      .status(403)
      .json(
        new ApiResponse(
          403,
          null,
          `Access denied. Expected role: ${user.role}`,
        ),
      );
  }
  */

  const isPasswordValid = await user.comparePassword(reqPassword);
  if (!isPasswordValid) {
    return res.status(401).json(new ApiResponse(401, null, "Wrong password"));
  }

  const now = new Date();
  if (user.lastLogin) {
    const lastLoginDate = new Date(user.lastLogin);
    const diffTime = Math.abs(now - lastLoginDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      user.streak += 1;
    } else if (diffDays > 1) {
      user.streak = 1;
    }
  } else {
    user.streak = 1;
  }

  user.lastLogin = now;
  await user.save();

  const { accessToken, refreshToken } = await GenerateToken(user);

  const { password, ...userWithoutPassword } = user.toObject();

  return res
    .status(201)
    .cookie("accessToken", accessToken, security)
    .cookie("refreshToken", refreshToken, security)
    .json(
      new ApiResponse(
        201,
        userWithoutPassword,
        "User logged in successfullyyyy...",
      ),
    );
};

const logoutUser = async (req, res) => {
  try {
    const token =
      req.cookies?.accessToken || req.headers["authorization"]?.split(" ")[1];
    if (token) {
      const decoded = jwt.decode(token);
      if (decoded?.id) {
        await User.findByIdAndUpdate(
          decoded.id,
          { refreshToken: undefined },
          { new: true },
        );
      }
    }
  } catch (error) {
    console.log(
      "Error clearing refresh token from DB during logout (non-fatal):",
      error,
    );
  }

  return res
    .status(200)
    .clearCookie("accessToken", security)
    .clearCookie("refreshToken", security)
    .json(new ApiResponse(200, null, "User logged out successfully"));
};

const refreshAccessToken = async (req, res) => {
  const refreshToken =
    req.cookies?.refreshToken || req.headers["authorization"]?.split(" ")[1];

  if (!refreshToken) {
    return res
      .status(401)
      .json(new ApiResponse(401, null, "No refresh token provided"));
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json(new ApiResponse(401, null, "User not found"));
    }

    const isTokenValid = Array.isArray(user.refreshToken)
      ? user.refreshToken.includes(refreshToken)
      : user.refreshToken === refreshToken;

    if (!isTokenValid) {
      return res
        .status(401)
        .json(new ApiResponse(401, null, "Invalid refresh token"));
    }

    const { accessToken, refreshToken: newRefreshToken } = await GenerateToken(
      user,
    ).catch((err) => {
      throw new Error("Error generating tokens" + err);
    });

    return res
      .status(200)
      .cookie("accessToken", accessToken, security)
      .cookie("refreshToken", newRefreshToken, security)
      .json(new ApiResponse(200, user, "Tokens refreshed successfully"));
  } catch (error) {
    return res
      .status(403)
      .json(new ApiResponse(403, null, "Gating error during token refresh"));
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, year } = req.body;

    if (role === "admin" && email !== process.env.ADMIN_EMAIL) {
      return res
        .status(403)
        .json(new ApiResponse(403, null, "Cannot register as admin"));
    }

    const userRef = await User.findOne({ email });

    if (userRef) {
      return res
        .status(401)
        .json(new ApiResponse(401, null, "User already exists"));
    }

    const imageLocalPath = req.file?.path;
    let imageUrl = null;

    if (imageLocalPath) {
      imageUrl = await Upload(req.file.buffer || imageLocalPath, req.file?.isImage);
    }

    let normalizedRole = role?.replace(/['"]+/g, "").trim().toLowerCase();

    const user = await User.create({
      name,
      email,
      password,
      profileImage: imageUrl,
      role: normalizedRole,
      year, // Added year
    });

    if (!user) {
      return res
        .status(500)
        .json(new ApiResponse(500, null, "Failed to create user"));
    }

    const { accessToken, refreshToken } = await GenerateToken(user);

    console.log("RegisterUser: Tokens generated. Setting cookies...");

    const { password: pass, ...newUserCreatedref } = user.toObject();

    return res
      .status(201)
      .cookie("accessToken", accessToken, security)
      .cookie("refreshToken", refreshToken, security)
      .json(
        new ApiResponse(201, newUserCreatedref, "User registered successfully"),
      );
  } catch (error) {
    console.error("Register Error:", error);
    return res
      .status(500)
      .json(
        new ApiResponse(500, null, error.message || "Internal Server Error"),
      );
  }
};

const getProfile = async (req, res) => {
  const id = req.params.id || req.user?._id;
  
  if (!id) {
    return res.status(401).json(new ApiResponse(401, null, "Authentication required"));
  }

  const user = await User.findById(id).select("-password -refreshToken");
  if (!user) {
    return res.status(404).json(new ApiResponse(404, null, "User not found"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User Profile Fetched Successfully"));
};

const updateProfile = async (req, res) => {
  const { name, email, year, bio, phone, location, courses, achievements } = req.body;

  console.log("DEBUG: updateProfile request body:", req.body);
  console.log("DEBUG: updateProfile req.file:", req.file);

  const updateData = {};
  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (year) updateData.year = year;
  if (bio !== undefined) updateData.bio = bio;
  if (phone !== undefined) updateData.phone = phone;
  if (location !== undefined) updateData.location = location;
  if (courses) updateData.courses = courses;
  if (achievements) updateData.achievements = achievements;
  if (req.body.paymentQRCode) updateData.paymentQRCode = req.body.paymentQRCode;

  if (req.files) {
    if (req.files.paymentQRCode && req.files.paymentQRCode[0]) {
      console.log("DEBUG: Uploading paymentQRCode to Cloudinary");
      const qrFile = req.files.paymentQRCode[0];
      const imageUrl = await Upload(qrFile.buffer || qrFile.path, qrFile.isImage);
      console.log("DEBUG: Cloudinary QR Upload Result:", imageUrl);
      updateData.paymentQRCode = imageUrl;
    }
    if (req.files.profileImage && req.files.profileImage[0]) {
      console.log("DEBUG: Uploading profileImage to Cloudinary");
      const profileFile = req.files.profileImage[0];
      const imageUrl = await Upload(profileFile.buffer || profileFile.path, profileFile.isImage);
      console.log("DEBUG: Cloudinary Profile Upload Result:", imageUrl);
      updateData.profileImage = imageUrl;
    }
  } else if (req.file?.buffer || req.file?.path) {
    console.log("DEBUG: Uploading single file to Cloudinary");
    const imageUrl = await Upload(req.file.buffer || req.file.path, req.file.isImage);
    
    if (req.file.fieldname === "paymentQRCode") {
      updateData.paymentQRCode = imageUrl;
    } else {
      updateData.profileImage = imageUrl;
    }
  }

  try {
    console.log("DEBUG: Updating user document with ID:", req.user?._id);
    console.log("DEBUG: Final updateData:", updateData);

    const user = await User.findByIdAndUpdate(req.user?._id, updateData, {
      new: true,
    }).select("-password -refreshToken");

    if (!user) {
        console.error("DEBUG: User not found for update");
        return res.status(404).json(new ApiResponse(404, null, "User not found"));
    }

    console.log("DEBUG: Final User object to be returned:", user);

    return res
      .status(200)
      .json(new ApiResponse(200, user, "User updated successfully"));
  } catch (error) {
    console.error("Update Profile Error:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal server error"));
  }
};

const saveLastLocation = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "URL is required"));
  }

  try {
    const user = await User.findById(req.user._id);
    if (!user)
      return res.status(404).json(new ApiResponse(404, null, "User not found"));

    user.lastVisitedUrl = url;
    await user.save();
    
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Location saved"));
  } catch (error) {
    console.error("Save Location Error:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Failed to save location"));
  }
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "All fields are required"));
  }

  try {
    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(404).json(new ApiResponse(404, null, "User not found"));
    }

    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Invalid old password"));
    }

    user.password = newPassword;
    await user.save();

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Password changed successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          "Something went wrong while changing password",
        ),
      );
  }
};

const getUsers = async (req, res) => {
  try {
    const { role } = req.query;
    console.log(`DEBUG: Fetching users with role: "${role}"`);
    
    const filter = {};
    if (role) {
      // Use case-insensitive regex for more flexibility
      filter.role = { $regex: new RegExp(`^${role}$`, 'i') };
    }

    const users = await User.find(filter).select("-password -refreshToken");
    console.log(`DEBUG: Found ${users.length} users`);
    
    return res.status(200).json(new ApiResponse(200, users, "Users fetched successfully"));
  } catch (error) {
    console.error("DEBUG: getUsers Error:", error);
    return res.status(500).json(new ApiResponse(500, null, "Internal server error"));
  }
};

export {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  getProfile,
  updateProfile,
  saveLastLocation,
  changePassword,
  getUsers,
};
