import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken || req.headers["Authorization"]?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "plase login first you have not valid tocken" });
    }

    //it will give all the acess of the fileds witch is defined in the payload
    //in the auth.js file
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decode.id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res.status(401).json({
        message: "plase login fist before submit form your tocken went wrong",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "somthing went wrong during validation of user" });
  }
};
export default verifyJWT;
