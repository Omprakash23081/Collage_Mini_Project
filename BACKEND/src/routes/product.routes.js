import { Router } from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/").get(getProducts);

// Protected routes
router.use(verifyJWT);

router.route("/").post(upload.single("image"), createProduct);
router.route("/:id").patch(upload.single("image"), updateProduct).delete(deleteProduct);

export default router;
