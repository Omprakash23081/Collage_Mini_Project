import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken || req.headers["Authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    //it will give all the acess of the fileds witch is defined in the payload
    //in the auth.js file
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decode.id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
export default verifyJWT;
