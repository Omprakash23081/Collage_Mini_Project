import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
} from "../controller/login.controller.js";
import { registerUser } from "../controller/rejester.controller.js";
import multer from "../middleware/multer.middleware.js";
import verifyJWT from "../middleware/auth.middleware.js";
import { information } from "../controller/information.controller.js";

const router = Router();

router.route("/register").post(
  multer.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  registerUser
);
router.route("/login").post(loginUser);
router.route("/Logout").post(verifyJWT, logoutUser);
router.route("/refreshToken").post(refreshAccessToken);
// router.route("/protected").get(verifyJWT, (req, res) => {
//   res.json({ message: "You are authorized to access this route." });
// });

//information of user

router.route("/me").get(verifyJWT, information);
export default router;
