//this file is for faculty member related routes like get faculty member details update faculty member details delete faculty member details excetra

import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import {
  createFaculty,
  getFaculty,
  updateFaculty,
  delateFaculty,
  getSpicificFaculityDetails,
} from "../controllers/facuelty.controller.js";
import upload from "../middleware/multer.middleware.js";

const router = Router();

const file = upload.single("image");

//this route will help to get all faculty members details for all
router.route("/").get(getFaculty);

//this route will help to get specific faculty member details by id
router.route("/:id").get(getSpicificFaculityDetails);

//this route will help to create faculty member profile this will be only done by admin and faculty member himself
router.route("/create").post(verifyJWT, file, createFaculty);

//this route will help to update specific faculty member details by id this will be only done by admin and faculty member himself
router.route("/:id").patch(verifyJWT, file, updateFaculty);

//this route will help to delete specific faculty member details by id this will be only done by admin and faculty member himself
router.route("/:id").delete(verifyJWT, delateFaculty);

export default router;
