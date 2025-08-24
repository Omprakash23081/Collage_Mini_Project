import User from "../models/user.models.js";
import ApiErrer from "../util/ApiErrer.js";
import ApiResponse from "../util/ApiResponse.js";
import { upload } from "../util/cloudinary.js";

const registerUser = async (req, res) => {
  console.log(req.body);

  const { name, email, password } = req.body;
  //check wather all fields are filled or not
  if (
    [name, email, password].some((field) =>
      field ? field.trim() === "" : false
    )
  ) {
    throw new ApiErrer("All fields are required", 400);
  }

  //check wather user is exist or not if exist then throw errer athor wise prosid
  const userRef = await User.findOne({ email });
  if (userRef) {
    throw new ApiErrer("User already exists", 400);
  }

  //upload avatar image and it is not mendtry it will be empty
  const imageLocalPath = req.files?.avatar?.[0]?.path;
  let imageUrl = null;

  if (imageLocalPath) {
    imageUrl = await upload(imageLocalPath);
  }
  const user = await User.create({
    name,
    email,
    password,
    avatar: imageUrl,
  });
  //we have to remove password from user object
  const newUserCreatedref = await User.findById(user._id).select("-password");

  //we have to check if user is created successfully or not
  if (!newUserCreatedref) {
    throw new ApiErrer("User registration failed", 500);
  }

  return res
    .status(201)
    .json(
      new ApiResponse(201, newUserCreatedref, "User registered successfully")
    );
};

export { registerUser };
