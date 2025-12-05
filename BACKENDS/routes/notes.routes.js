//this router will handle all routes related to study materials like get all materials, upload material, delete material this is help in primum section where we have "PYQ" "NOTES"  section.

import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import multer from "../middleware/multer.middleware.js";
import {
  uplodeNotes,
  getNotes,
  updateNotes,
  delateNotes,
  getSpecificNotes,
} from "../controllers/notes.controller.js";

const router = Router();
const upload = multer;
// const middleware = upload.fields([
//   {
//     name: "image",
//     maxCount: 1,
//   },
// ])
const file = upload.single("image");

// console.log("request is comming");

//give all study materials hear we can use validation wather user have subscription or not if now then filter out all subscription materials and give only free materials or if user have subscription then give all materials
router.route("/").get(verifyJWT, getNotes);

//upload study materials by admin and by user also but by admin not required to aprove but for user required to aprove by admin witch is uplode by user
router.route("/upload").post(verifyJWT, file, uplodeNotes);

//get specific study material by id witch is uploaded by admin or user after clicking specific material
router.route("/:id").get(verifyJWT, getSpecificNotes);

//update notes only by admin
router.route("/:id").patch(verifyJWT, updateNotes);

//delete specific study material by id witch is uploaded by admin or user after clicking specific material this route is only for admin
router.route("/:id").delete(verifyJWT, delateNotes);

export default router;
