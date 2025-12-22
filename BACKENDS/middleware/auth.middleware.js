import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken || req.headers["authorization"]?.split(" ")[1];

    console.log("VerifyJWT - Token found:", !!token);
    // console.log("Cookies:", req.cookies);
    // console.log("Headers:", req.headers["authorization"]);

    if (!token) {
      return res
        .status(401)
        .json({ message: "Please login first, you do not have a valid token" });
    }

    //it will give all the acess of the fileds witch is defined in the payload
    //in the auth.js file
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decode.id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res.status(401).json({
        message: "Please login first before submitting form, your token is invalid",
      });
    }

    req.user = user;
    console.log("VerifyJWT - User authenticated:", user._id, "Role:", user.role);
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "somthing went wrong during validation of user" });
  }
};
export default verifyJWT;
