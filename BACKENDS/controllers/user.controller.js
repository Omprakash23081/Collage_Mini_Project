import User from "../models/user.model.js";
import ApiResponse from "../util/ApiResponse.js";

const getAllUsers = async (req, res) => {
  try {
    console.log("getAllUsers controller called");
    const users = await User.find({}).select("-password -refreshToken");
    console.log("Users fetched from DB:", users);
    
    return res
      .status(200)
      .json(new ApiResponse(200, users, "All users fetched successfully"));
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Failed to fetch users"));
  }
};

export { getAllUsers };
