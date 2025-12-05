import { Router } from "express";
import {
  getAllCareers,
  getCareerById,
  createCareer,
  deleteCareer,
  updateCareer,
} from "../controllers/career.controller.js";
import verifyJWT from "../middleware/auth.middleware.js"; // Assuming auth middleware exists

const router = Router();

// Public routes
router.route("/").get(getAllCareers);
router.route("/:id").get(getCareerById);

// Protected routes (Admin only - assuming middleware handles role check or we add it later)
router.route("/create").post(verifyJWT, createCareer);
router.route("/:id").delete(verifyJWT, deleteCareer);
router.route("/:id").patch(verifyJWT, updateCareer);

export default router;
