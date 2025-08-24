import { Router } from "express";
import { loginUser } from "../controller/login.controller.js";
import { registerUser } from "../controller/rejester.controller.js";
import multer from "../middleware/multer.middleware.js";
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

export default router;
