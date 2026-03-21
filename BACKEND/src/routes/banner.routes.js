import { Router } from "express";
import {
  createBanner,
  getBanners,
  deleteBanner,
} from "../controllers/banner.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";
import optimizeFile from "../middleware/optimizeFile.middleware.js";

const router = Router();

// Public route to get banners
router.route("/").get(getBanners);

// Protected routes (Admin only effectively, though verified by JWT)
router.route("/create").post(verifyJWT, upload.single("image"), optimizeFile, createBanner);
router.route("/:id").delete(verifyJWT, deleteBanner);

export default router;
