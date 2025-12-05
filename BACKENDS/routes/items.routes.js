//this file handel lost and found section routes

import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";
import {
  uplodeItems,
  getItems,
  getUserUplodedItems,
  updateItem,
  deleteItem,
} from "../controllers/items.controller.js";

const router = Router();

const file = upload.single("image");

//this router will help to show all data related to lost and found items
router.route("/").get(getItems);

//this router is used to uplode lost and found items by user
router.route("/upload").post(verifyJWT, file, uplodeItems);

//this router will help to get specific lost and found item by id and update only for user who uplode the item and admin
router.route("/my-documents").get(verifyJWT, getUserUplodedItems);

//this router will help to update in specific Items
router.route("/:id").patch(verifyJWT, file, updateItem);

//this router will help to delete specific lost and found item by id but this will be only done by admin and user who uplode the item
router.route("/:id").delete(verifyJWT, deleteItem);

export default router;
