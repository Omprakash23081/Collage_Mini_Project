import { Router } from "express";
import { getDashboardStats } from "../controllers/dashboard.controller.js";
import verifyJWT, { verifyRoles } from "../middleware/auth.middleware.js";

const router = Router();

// Get Dashboard Stats (Admin/Moderator only)
router.route("/stats").get(verifyJWT, verifyRoles("admin", "moderator"), getDashboardStats);

export default router;
