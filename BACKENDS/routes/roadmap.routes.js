import { generateRoadmap } from "../controllers/roadmap.controller.js";
import { Router } from "express";
const router = Router();
//this route will help to generate AI roadmap for a given topic
router.route("/generate").post(generateRoadmap);
export default router;
