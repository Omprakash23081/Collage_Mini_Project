import User from "../models/user.models.js";
import ApiResponse from "../util/ApiResponse.js";
import GenerateToken from "../services/auth.js";

const security = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
};

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
  const { accessToken, refreshToken } = await GenerateToken(user);

  return res
    .status(201)
    .cookie("accessToken", accessToken, security)
    .cookie("refreshToken", refreshToken, security)
    .json(new ApiResponse(201, null, "User logged in successfullyyyy..."));
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

const refreshAccessToken = async (req, res) => {
  const refreshToken =
    req.cookies?.refreshToken || req.headers["Authorization"]?.split(" ")[1];

  if (!refreshToken) {
    return res.status(401).json({
      message: "refress token is not present",
      data: refreshToken,
    });
  }

  const user = await User.findOne({ refreshToken }).select(
    "-password -refreshToken"
  );

  console.log("use is :" + user);

  if (!user) {
    return res
      .status(401)
      .json(new ApiResponse(401, null, "user is not find from your token"));
  }

  const { accessToken, refreshToken: newRefreshToken } = await GenerateToken(
    user
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, security)
    .cookie("refreshToken", newRefreshToken, security)
    .json(new ApiResponse(200, user, "Access Token refreshed successfully"));
};

export { loginUser, logoutUser, refreshAccessToken };
