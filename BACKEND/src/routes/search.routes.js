import { Router } from "express";
import { searchContent } from "../controllers/search.controller.js";

const router = Router();

// Public or Protected? Student frontend, so likely public or requiring login
// Let's make it open but rate limited (if we had specific limits, but general limit applies)
// The user is likely inside the App, so they can search.
router.get("/", searchContent);

export default router;
