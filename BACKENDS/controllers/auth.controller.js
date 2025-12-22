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

const isProduction = process.env.NODE_ENV === "production";

const security = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
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
  // Try to clear token from DB if we can identify the user, but don't block response
  try {
    const token = req.cookies?.accessToken || req.headers["authorization"]?.split(" ")[1];
    if (token) {
        const decoded = jwt.decode(token); // safe decode without verification
        if (decoded?.id) {
             await User.findByIdAndUpdate(
                decoded.id,
                { refreshToken: undefined },
                { new: true }
              );
        }
    }
  } catch (error) {
    console.log("Error clearing refresh token from DB during logout (non-fatal):", error);
  }

  // ALWAYS clear cookies
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
  console.log("comming for rejestation ...");

  try {
    // Validate request body whether all fields are valid or not
    const { error } = registerValidation.validate(req.body);
    if (error) {
      return res.status(400).json(new ApiResponse(400, null, error.message));
    }

    const { name, email, password, role, year } = req.body;

    // Admin registration is restricted admin only can be created by superadmin
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
      imageUrl = await Upload(imageLocalPath);
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
        new ApiResponse(201, newUserCreatedref, "User registered successfully")
      );
  } catch (error) {
    console.error("Register Error:", error);
    return res
      .status(500)
      .json(
        new ApiResponse(500, null, error.message || "Internal Server Error")
      );
  }
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
  const { name, email, year, bio, courses, achievements } = req.body;
  const { err } = updateProfileValidation.validate(req.body);
  if (err) {
    return res.status(400).json(new ApiResponse(400, null, err.message));
  }

  const updateData = {};
  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (year) updateData.year = year;
  if (bio !== undefined) updateData.bio = bio;
  if (courses) updateData.courses = courses;
  if (achievements) updateData.achievements = achievements;
  
  if (req.file?.path) {
    const imageUrl = await Upload(req.file.path);
    updateData.profileImage = imageUrl;
  }

  try {
    const user = await User.findByIdAndUpdate(req.user?._id, updateData, {
      new: true,
    }); //return new user

    return res
      .status(200)
      .json(new ApiResponse(200, user, "User updated successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal server error"));
  }
};

const trackActivity = async (req, res) => {
  const { subjectName, type } = req.body; // type: "Notes" or "PYQ"
  
  if (!subjectName) {
      return res.status(400).json(new ApiResponse(400, null, "Subject name is required"));
  }

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json(new ApiResponse(404, null, "User not found"));

    let courseIndex = user.courses.findIndex(c => c.name === subjectName);
    
    if (courseIndex > -1) {
        // Update existing
        user.courses[courseIndex].lastAccessed = new Date();
        // Increment progress slightly (mock logic), max 100
        let newProgress = user.courses[courseIndex].progress + 5;
        if (newProgress > 100) newProgress = 100;
        user.courses[courseIndex].progress = newProgress;
        
        // Update time spent string (mock logic: increment hour if possible, else just set new)
        // For simplicity, just cycling times or keeping static for now, or randomizing slightly
        // Let's just keep it simple: if below 100%, assume they spent more time. 
    } else {
        // Add new
        user.courses.push({
            name: subjectName,
            progress: 10,
            timeSpent: "30m", // Initial time
            lastAccessed: new Date()
        });
    }
    
    // Sort courses by lastAccessed desc
    user.courses.sort((a, b) => b.lastAccessed - a.lastAccessed);
    // Limit to recent 5? Optional.

    await user.save();
    return res.status(200).json(new ApiResponse(200, user.courses, "Activity tracked"));

  } catch (error) {
    console.error("Track Activity Error:", error);
    return res.status(500).json(new ApiResponse(500, null, "Failed to track activity"));
  }
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json(new ApiResponse(400, null, "All fields are required"));
  }

  try {
    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(404).json(new ApiResponse(404, null, "User not found"));
    }

    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
      return res.status(400).json(new ApiResponse(400, null, "Invalid old password"));
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, "Something went wrong while changing password"));
  }
};

export {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  getProfile,
  updateProfile,
  trackActivity,
  changePassword
};
