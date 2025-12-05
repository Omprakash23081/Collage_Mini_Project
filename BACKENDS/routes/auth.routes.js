//this user is use for authorization of user like login register logout refresh token excetra

import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  getProfile,
  updateProfile,
} from "../controllers/auth.controller.js";

// hear importing multer middleware for handling file uploads because express cant handle file uploads individually
import multer from "../middleware/multer.middleware.js";
import verifyJWT from "../middleware/auth.middleware.js";

const router = Router();
const upload = multer;

/*insted of upload.single("profileImage") we can use upload.array("profileImage",5) for multiple file upload with max 5 files
also we can use upload.fields([{name:"profileImage",maxCount:2},{name:"otherImage",maxCount:3}]) for multiple file upload with different field names
upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
]),*/

//defining routes for user

// register new user (student/faculty)
router.route("/register").post(upload.single("profileImage"), registerUser);

//login with email & password
router.route("/login").post(loginUser);

//get logged-in user profile
router.route("/me/:id").get(getProfile);

//update logged-in user profile
router
  .route("/me")
  .patch(verifyJWT, upload.single("profileImage"), updateProfile);

//refresh access token
router.route("/refreshToken").post(refreshAccessToken);

//logout user
router.route("/logout").post(verifyJWT, logoutUser);

export default router;

// Rules

// Use nouns (resources), not verbs, in paths: /users, /items, /sessions.
// Use plural resource names: /users, /items.
// Use lowercase + hyphen (kebab-case) for multi-word paths: /refresh-token, /user-settings.
// CRUD mapping:
// GET /resources — list
// GET /resources/:id — retrieve
// POST /resources — create
// PUT /resources/:id — full replace (client sends whole resource)
// PATCH /resources/:id — partial update (only changed fields)
// DELETE /resources/:id — delete
// Use POST for non-idempotent actions that don't map to CRUD (login, logout, send-email): e.g., POST /sessions (login), POST /logout or DELETE /sessions/:id (logout by session id).
// Use sub-resources for related actions: e.g., POST /users/:id/activate or POST /items/:id/photos.
// Use /me for current authenticated user: GET /me, PATCH /me, DELETE /me.
// Return appropriate status codes: 201 for create, 200 for successful GET, 204 for successful DELETE or PATCH with no body, 400/422 for validation errors.
