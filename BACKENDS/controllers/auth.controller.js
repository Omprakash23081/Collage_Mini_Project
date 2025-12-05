import User from "../models/user.model.js";
import ApiResponse from "../util/ApiResponse.js";
import GenerateToken from "../services/auth.service.js";
import jwt from "jsonwebtoken";
import { Upload } from "../config/cloudinary.js";
import {
  registerValidation,
  loginValidation,
  updateProfileValidation,
} from "../validation/user.validation.js";

const security = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
};

//this function complite
const loginUser = async (req, res) => {
  // password: reqPassword → renames the password field from req.body to a new variable called reqPassword.
  let { email, password: reqPassword, role } = req.body;
  console.log("comming for login ");

  // Validate request body
  const { err } = loginValidation.validate(req.body);

  if (err) {
    return res.status(400).json(new ApiResponse(400, null, err.message));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json(new ApiResponse(404, null, "User not found"));
  }

  //in this application we have two window one for admin and another for user so during login we have to check role also and one another thing is that admin only can login they cannot register themselves they have to created by SuperAdmin
  if (user.role !== role) {
    return res.status(403).json(new ApiResponse(403, null, "Access denied"));
  }

  const isPasswordValid = await user.comparePassword(reqPassword);
  if (!isPasswordValid) {
    return res.status(401).json(new ApiResponse(401, null, "Wrong password"));
  }

  const { accessToken, refreshToken } = await GenerateToken(user);

  // Convert Mongoose doc to plain object and remove password
  const { password, ...userWithoutPassword } = user.toObject();

  return res
    .status(201)
    .cookie("accessToken", accessToken, security)
    .cookie("refreshToken", refreshToken, security)
    .json(
      new ApiResponse(
        201,
        userWithoutPassword,
        "User logged in successfullyyyy..."
      )
    );
};

const logoutUser = async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { refreshToken: undefined },
    { new: true }
  );
  return res
    .status(200)
    .clearCookie("accessToken", security)
    .clearCookie("refreshToken", security)
    .json(new ApiResponse(200, null, "User logged out successfully"));
};

//this is also complite
const refreshAccessToken = async (req, res) => {
  // console.log("comming");

  const refreshToken =
    req.cookies?.refreshToken || req.headers["authorization"]?.split(" ")[1];

  if (!refreshToken) {
    return res
      .status(401)
      .json(new ApiResponse(401, null, "No refresh token provided"));
  }

  try {
    // Verify and decode refresh token it will give all the payload data
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Find user by ID and also check refreshToken matches
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res
        .status(401)
        .json(new ApiResponse(401, null, "Invalid refresh token"));
    }

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = await GenerateToken(
      user
    ).catch((err) => {
      throw new Error("Error generating tokens" + err);
    });

    // console.log("comming for response and serponse id ");

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

//this function hase been done
const registerUser = async (req, res) => {
  // Validate request body whether all fields are valid or not
  const { err } = registerValidation.validate(req.body);
  if (err) {
    return res.status(400).json(new ApiResponse(400, null, err.message));
  }

  const { name, email, password, role } = req.body;

  // Admin registration is restricted admin only can be created by superadmin so here we are checking that if role is admin then email must be equal to ADMIN_EMAIL present in .env file
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

  //this is for reference to understand how req.file look like
  // file: {
  //   fieldname: 'profileImage',
  //   originalname: 'p2.jpg',
  //   encoding: '7bit',
  //   mimetype: 'image/jpeg',
  //   destination: './public',
  //   filename: 'profileImage',
  //   path: 'public\\profileImage',
  //   size: 54787
  // },

  const imageLocalPath = req.file?.path;
  let imageUrl = null;

  if (imageLocalPath) {
    imageUrl = await Upload(imageLocalPath);
  }

  let normalizedRole = role?.replace(/['"]+/g, "").trim().toLowerCase();

  const user = await User.create({
    name,
    email,
    password,
    profileImage: imageUrl,
    role: normalizedRole,
  });

  if (!user) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Failed to create user"));
  }

  const { password: pass, ...newUserCreatedref } = user.toObject();

  return res
    .status(201)
    .json(
      new ApiResponse(201, newUserCreatedref, "User registered successfully")
    );
};

//this function complite
const getProfile = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id).select("-password -refreshToken");
  if (!user) {
    return res.status(404).json(new ApiResponse(404, null, "User not found"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User Profile Fatch Sucessfully"));
};

//this function complite
const updateProfile = async (req, res) => {
  const { name, email, year } = req.body;
  const { err } = updateProfileValidation.validate(req.body);
  if (err) {
    return res.status(400).json(new ApiResponse(400, null, err.message));
  }

  const updateData = {};
  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (year) updateData.year = year;
  if (req.file?.path) {
    const imageUrl = await Upload(req.file.path);
    updateData.profileImage = imageUrl;
  }
  const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, {
    new: true,
    runValidators: true,
  }).select("-password -refreshToken");

  if (updatedUser) {
    return res
      .status(200)
      .json(new ApiResponse(200, updatedUser, "profile update sucessfully"));
  } else {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "field to update profile"));
  }
};

export {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  getProfile,
  updateProfile,
};
