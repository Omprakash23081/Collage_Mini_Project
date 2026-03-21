import { Router } from "express";
import upload from "../middleware/multer.middleware.js";
import optimizeFile from "../middleware/optimizeFile.middleware.js";
import {
  getPYQ,
  updatePYQ,
  uploadPYQ,
  deletePYQ,
  getPYQById,
} from "../controllers/pyq.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";

const router = Router();

const file = upload.single("file");

//this route will help to get all pyq for all
router.route("/").get(verifyJWT, getPYQ);

//this route will help to get specific pyq details by id
router.route("/:id").get(verifyJWT, getPYQById);

//this route will help to update specific pyq details by id this will be only done by admin
router.route("/:id").patch(verifyJWT, updatePYQ); // updatePYQ likely doesn't check for file in same way or needs explicit middleware if it does file update, let's assume it does if it updates resource.
// Wait, checking pyq controller would be safe, but let's assume consistency.
// Actually PYQ usually has file. Let's add it to patch just in case, but wait, updatePYQ routes often handle file update.
// In the original file: router.route("/:id").patch(verifyJWT, updatePYQ); - no 'file' middleware?
// Original: router.route("/:id").patch(verifyJWT, updatePYQ);
// It seems updatePYQ might not even have upload middleware connected in original code?
// Let's check original code again.
// Line 23: router.route("/:id").patch(verifyJWT, updatePYQ);
// If there is no 'file' middleware (multer), then req.file will be undefined anyway.
// So adding optimizeFile here won't hurt (it checks if req.file exists), but if multer isn't there, it does nothing.
// I should only add it where 'file' or 'upload' is used.
// create route: router.route("/create").post(verifyJWT, file, addPYQ); -> Add here.

//delete any specific pyq by admin only
router.route("/:id").delete(verifyJWT, deletePYQ);

//uplode pyq by admin or any user of the app
router.route("/create").post(verifyJWT, file, optimizeFile, uploadPYQ);

export default router;
