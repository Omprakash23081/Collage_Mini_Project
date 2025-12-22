import User from "../models/user.model.js";
import ApiResponse from "../util/ApiResponse.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    if (users) {
      return res
        .status(200)
        .json(new ApiResponse(200, users, "Users fetched successfully"));
    } else {
      return res.status(404).json(new ApiResponse(404, null, "No users found"));
    }
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

const deleteUser = async (req, res) => {
  console.log("Delete User Request received for ID:", req.params.id);
  try {
    const { id } = req.params;
    if (!id) {
       return res.status(400).json(new ApiResponse(400, null, "User ID required"));
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json(new ApiResponse(404, null, "User not found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, null, "User deleted successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

const updateUser = async (req, res) => {
  console.log("Update User Request received for ID:", req.params.id, "Body:", req.body);
  try {
    const { id } = req.params;
    const { name, email, role, year } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role) updateData.role = role;
    if (year) updateData.year = year;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true } // Return updated document
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json(new ApiResponse(404, null, "User not found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, updatedUser, "User updated successfully"));

  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

export { getAllUsers, deleteUser, updateUser };
