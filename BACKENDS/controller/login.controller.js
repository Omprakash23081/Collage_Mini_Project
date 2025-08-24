import User from "../models/user.models.js";
import ApiErrer from "../util/ApiErrer.js";
import ApiResponse from "../util/ApiResponse.js";

const loginUser = async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;
  if (
    [email, password].some((field) => (field ? field.trim() === "" : false))
  ) {
    throw new ApiErrer("All fields are required", 400);
  }

  //check wather user is exist if exist then throw errer athor wise prosid
  const user = await User.findOne({ email });
  console.log("uppr");

  if (!user) {
    throw new ApiErrer("User not found", 404);
  }
  if (user.password != password) {
    throw new ApiErrer("invalid credentails", 404);
  }
  console.log("lower");

  return res
    .status(201)
    .json(new ApiResponse(201, null, "User logged in successfullyyyy"));
};

export { loginUser };
