// this rourter will helf user routes like get all users update user delete user excetra handel user updates only for admin
import { Router } from "express";
import { getAllUsers, updateUser, deleteUser } from "../controllers/user.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import { verifyRoles } from "../middleware/auth.middleware.js";

const router = Router();

//get all users (admin only)
router.route("/getallusers").get(verifyJWT, verifyRoles("admin"), getAllUsers);

//update user (e.g., role change)
router.route("/:id").patch(verifyJWT, verifyRoles("admin"), updateUser); // Changed to PATCH and mapped to updateUser

//delete user (admin)
router.route("/:id").delete(verifyJWT, verifyRoles("admin"), deleteUser); // Mapped to deleteUser

export default router;
