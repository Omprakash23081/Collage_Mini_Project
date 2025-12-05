import { Router } from "express";
import upload from "../middleware/multer.middleware.js";
import {
  getPYQ,
  updatePYQ,
  addPYQ,
  delatePYQ,
  getPYQById,
} from "../controllers/pyq.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";

const router = Router();

const file = upload.single("image");

//this route will help to get all pyq for all
router.route("/").get(verifyJWT, getPYQ);

//this route will help to get specific pyq details by id
router.route("/:id").get(verifyJWT, getPYQById);

//this route will help to update specific pyq details by id this will be only done by admin
router.route("/:id").patch(verifyJWT, updatePYQ);

//this route will help to delete specific pyq details by id this will be only done by admin
router.route("/:id").delete(verifyJWT, delatePYQ);

//this route will help to create pyq this will be only done by admin
router.route("/create").post(verifyJWT, file, addPYQ);

export default router;
