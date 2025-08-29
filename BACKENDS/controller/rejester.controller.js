import User from "../models/user.models.js";
// import ApiErrer from "../util/ApiErrer.js";
import ApiResponse from "../util/ApiResponse.js";
import { Upload } from "../util/cloudinary.js";

const registerUser = async (req, res) => {
  console.log(req.body);

  const { name, email, password } = req.body;
  if (
    [name, email, password].some((field) =>
      field ? field.trim() === "" : false
    )
  ) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "All fields are required"));
  }

  const userRef = await User.findOne({ email });
  if (userRef) {
    return res
      .status(401)
      .json(new ApiResponse(401, null, "User already exists"));
  }

  console.log(req.files?.image?.[0]?.path + "printing");
  const imageLocalPath = req.files?.image[0]?.path;
  let imageUrl = null;

  if (imageLocalPath) {
    imageUrl = await Upload(imageLocalPath);
  }
  console.log(imageLocalPath + " image path");
  console.log(imageUrl + " image url");

  const user = await User.create({
    name,
    email,
    password,
    image: imageUrl,
  });
  const newUserCreatedref = await User.findById(user._id).select("-password");

  if (!newUserCreatedref) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "User registration failed"));
  }

  return res
    .status(201)
    .json(
      new ApiResponse(201, newUserCreatedref, "User registered successfully")
    );
};

export { registerUser };
