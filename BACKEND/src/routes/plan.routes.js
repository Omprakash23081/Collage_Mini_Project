import express from "express";
import {
  createPlan,
  deletePlan,
  getPlans,
  updatePlan,
} from "../controllers/plan.controller.js";
import { verifyJWT, verifyRoles } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getPlans); // Public fetch
router.post("/create", verifyJWT, verifyRoles("admin"), createPlan);
router.patch("/:id", verifyJWT, verifyRoles("admin"), updatePlan);
router.delete("/:id", verifyJWT, verifyRoles("admin"), deletePlan);

export default router;
