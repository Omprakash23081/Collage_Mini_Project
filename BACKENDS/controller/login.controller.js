import User from "../models/user.models.js";
import ApiResponse from "../util/ApiResponse.js";

const loginUser = async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;
  if (
    [email, password].some((field) => (field ? field.trim() === "" : false))
  ) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "All fields are required"));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json(new ApiResponse(404, null, "User not found"));
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    return res.status(401).json(new ApiResponse(401, null, "Wrong password"));
  }

  return res
    .status(201)
    .json(new ApiResponse(201, null, "User logged in successfullyyyy..."));
};

export { loginUser };
