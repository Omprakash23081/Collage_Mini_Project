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
const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: "Access denied. No role found." });
    }
    const rolesArray = [...allowedRoles];
    // Check if user's role is in the allowedRoles array
    // Assuming single role per user based on model: role: String (enum)
    if (!rolesArray.includes(req.user.role)) {
       return res.status(403).json({ message: `Access denied. Insufficient permissions. Required: ${rolesArray.join(", ")}, Found: ${req.user.role}` });
    }
    next();
  };
};

const verifyPremium = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Please login first." });
  }
  // Check if role is admin/mod (bypass premium check) or if isPremium is true
  if (["admin", "moderator", "content_manager"].includes(req.user.role) || req.user.isPremium) {
    if (req.user.premiumExpiry && new Date() > req.user.premiumExpiry) {
        // Expired
        return res.status(403).json({ message: "Premium subscription expired." });
    }
    next();
  } else {
    return res.status(403).json({ message: "This content is for Premium members only." });
  }
};

export { verifyJWT, verifyRoles, verifyPremium };
export default verifyJWT;
