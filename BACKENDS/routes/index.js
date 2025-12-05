//this is the main router file which is used to import all the routes and export them as a single router

import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import notesRoutes from "./notes.routes.js";
import pyqRoutes from "./pyq.routes.js";
import eventsRoutes from "./events.routes.js";
import itemsRoutes from "./items.routes.js";
import facultyRoutes from "./faculty.routes.js";
import careerRoutes from "./career.routes.js";
import roadmapRoutes from "./roadmap.routes.js";

const router = Router();

//this is for authorization of user wather user is login or not excetra
router.use("/auth", authRoutes);
//this is for items like add item delete item excetra in lost and found section
router.use("/items", itemsRoutes);
//this is for notes like add note delete note excetra in primum section
router.use("/notes", notesRoutes);
//this is for user profile and user settings excetra like change password update profile excetra
router.use("/users", userRoutes);
//this is for previous year question papers in primum section
router.use("/pyq", pyqRoutes);
//this is for events like add event delete event excetra in events section
router.use("/events", eventsRoutes);
//this is for faculty like add faculty delete faculty excetra in faculty section
router.use("/faculty", facultyRoutes);
//this is for career like add career delete career excetra in career section
router.use("/career", careerRoutes);

//this is for generating AI roadmaps
router.use("/roadmap", roadmapRoutes);

export default router;
