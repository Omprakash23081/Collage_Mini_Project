//this file is for event related routes like create event update event delete event get event excetra

import { Router } from "express";
import {
  getEvents,
  createEvents,
  updateEvents,
  delateEvents,
} from "../controllers/events.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";

const router = Router();

const file = upload.single("image");

//this route will help to get all event details for all
router.route("/").get(getEvents);

//this route will help to get specific event details by id
router.route("/:id").get(getEvents); // Reusing getEvents or need specific controller? getEvents usually handles both if written that way, but let's check controller.

//this route will help to update specific event details by id this will be only done by admin and event organizer
router.route("/:id").patch(verifyJWT, file, updateEvents);

//this route will help to delete specific event details by id this will be only done by admin and event organizer
router.route("/:id").delete(verifyJWT, delateEvents);

//this route will help to create event this will be only done by admin and event organizer
router.route("/").post(verifyJWT, file, createEvents);

export default router;
