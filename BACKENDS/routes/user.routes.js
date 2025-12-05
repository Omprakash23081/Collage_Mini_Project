// this rourter will helf user routes like get all users update user delete user excetra handel user updates only for admin
import { Router } from "express";
import { getAllUsers } from "../controllers/user.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";

const router = Router();

//get all users (admin only)
router.route("/getallusers").get(getAllUsers);

//get specific user
// router.route("/:id").get();

//update user (e.g., role change)
// router.route("/:id").put();

//delete user (admin)
// router.route("/:id").delete();

export default router;
