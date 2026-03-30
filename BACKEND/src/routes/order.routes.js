import { Router } from "express";
import {
  createOrder,
  getOrders,
  updateOrderStatus,
  deleteOrder,
  updateOrder,
} from "../controllers/order.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

import multer from "../middleware/multer.middleware.js";
import optimizeFile from "../middleware/optimizeFile.middleware.js";

const router = Router();
const upload = multer;

router.use(verifyJWT);

router.route("/").post(upload.single("paymentProof"), optimizeFile, createOrder).get(getOrders);
router.route("/:id").patch(upload.single("paymentProof"), updateOrder).delete(deleteOrder);
router.route("/:id/status").patch(updateOrderStatus);

export default router;
