import { Router } from "express";
import { Items, getItems } from "../controller/Items.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import ValidateItems from "../middleware/ValidateItems.middleware.js";
import multer from "../middleware/multer.middleware.js";

const router = Router();
const middleware = multer.fields([
  {
    name: "image",
    maxCount: 1,
  },
]);
router.route("/postItems").post(verifyJWT, middleware, ValidateItems, Items);
router.route("/getItems").get(getItems);

export default router;
