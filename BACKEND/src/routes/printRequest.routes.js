import { Router } from "express";
import {
  createPrintRequest,
  getPrintRequests,
  updatePrintStatus,
  deletePrintRequest,
  updatePrintRequest,
} from "../controllers/printRequest.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/").post(
  upload.fields([
    { name: "document", maxCount: 1 },
    { name: "paymentProof", maxCount: 1 }
  ]), 
  createPrintRequest
).get(getPrintRequests);
router.route("/:id/status").patch(updatePrintStatus);
router.route("/:id").patch(
  upload.fields([{ name: "paymentProof", maxCount: 1 }]), 
  updatePrintRequest
).delete(deletePrintRequest);

export default router;
