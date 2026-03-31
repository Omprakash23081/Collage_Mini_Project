import ApiResponse from "../utils/ApiResponse.js";
import { Upload } from "../config/cloudinary.js";
import PrintRequest from "../models/printRequest.model.js";
import { printRequestValidationSchema } from "../validation/printRequest.validation.js";
import { emitToUser } from "../utils/socket.js";

const createPrintRequest = async (req, res) => {
  try {
    // Parse settings first since they come as string from FormData
    if (typeof req.body.settings === "string") {
      try {
        req.body.settings = JSON.parse(req.body.settings);
      } catch (e) {
        return res.status(400).json(new ApiResponse(400, null, "Invalid settings JSON"));
      }
    }

    const { error } = printRequestValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json(new ApiResponse(400, null, error.message));
    }

    const files = req.files || {};
    const documentFile = files.document?.[0];
    const proofFile = files.paymentProof?.[0];

    if (!documentFile) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Please upload a document to print"));
    }

    const { vendorId, settings, transactionId, building, classNumber } = req.body;
    
    // Upload document
    const documentUrl = await Upload(documentFile.buffer || documentFile.path, false);
    
    // Upload payment proof if exists
    let proofUrl = null;
    if (proofFile) {
      proofUrl = await Upload(proofFile.buffer || proofFile.path, true);
    }

    const printRequest = await PrintRequest.create({
      studentId: req.user._id,
      vendorId,
      documentUrl,
      fileName: documentFile.originalname,
      settings,
      transactionId,
      building,
      classNumber,
      paymentProofUrl: proofUrl,
    });

    return res
      .status(201)
      .json(
        new ApiResponse(201, printRequest, "Print request submitted successfully")
      );
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

const getPrintRequests = async (req, res) => {
  try {
    const { role, _id } = req.user;
    let filter = {};

    if (role === "admin") {
      // Admins see everything
      filter = {};
    } else if (role === "stationery_vendor") {
      // Vendors only see requests placed WITH them
      filter.vendorId = _id;
    } else {
      // Students, Teachers, and all other roles only see requests placed BY them
      filter.studentId = _id;
    }

    const requests = await PrintRequest.find(filter)
      .populate("studentId", "name email")
      .populate("vendorId", "name");

    return res
      .status(200)
      .json(
        new ApiResponse(200, requests, "Print requests fetched successfully")
      );
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

const updatePrintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, totalEstimatedPrice } = req.body;

    const request = await PrintRequest.findById(id);
    if (!request) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Print request not found"));
    }

    if (
      request.vendorId.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json(new ApiResponse(403, null, "Unauthorized"));
    }

    if (status) request.status = status;
    if (totalEstimatedPrice) request.totalEstimatedPrice = totalEstimatedPrice;

    await request.save();

    // Notify student about print update
    emitToUser(request.studentId.toString(), "print_update", {
      requestId: request._id,
      status: request.status,
      price: request.totalEstimatedPrice,
      message: `Your print request is now ${request.status}`
    });

    return res
      .status(200)
      .json(
        new ApiResponse(200, request, "Print request updated successfully")
      );
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

const deletePrintRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await PrintRequest.findById(id);

    if (!request) {
      return res.status(404).json(new ApiResponse(404, null, "Print request not found"));
    }

    if (request.studentId.toString() !== req.user._id.toString()) {
      return res.status(403).json(new ApiResponse(403, null, "Unauthorized"));
    }

    if (request.status !== "Pending") {
      return res.status(400).json(new ApiResponse(400, null, "Only pending requests can be deleted"));
    }

    await PrintRequest.findByIdAndDelete(id);

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Print request deleted successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

const updatePrintRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { transactionId, building, classNumber, settings } = req.body;

    const request = await PrintRequest.findById(id);
    if (!request) {
      return res.status(404).json(new ApiResponse(404, null, "Print request not found"));
    }

    if (request.studentId.toString() !== req.user._id.toString()) {
      return res.status(403).json(new ApiResponse(403, null, "Unauthorized"));
    }

    if (request.status !== "Pending") {
      return res.status(400).json(new ApiResponse(400, null, "Only pending requests can be updated"));
    }

    if (transactionId) request.transactionId = transactionId;
    if (building) request.building = building;
    if (classNumber) request.classNumber = classNumber;
    
    if (settings) {
      const parsed = typeof settings === 'string' ? JSON.parse(settings) : settings;
      request.settings = { ...request.settings, ...parsed };
    }

    const files = req.files || {};
    if (files.paymentProof?.[0]) {
      const { Upload } = await import("../config/cloudinary.js");
      request.paymentProofUrl = await Upload(files.paymentProof[0].buffer || files.paymentProof[0].path, true);
    }

    await request.save();

    return res
      .status(200)
      .json(new ApiResponse(200, request, "Print request updated successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

export { createPrintRequest, getPrintRequests, updatePrintStatus, deletePrintRequest, updatePrintRequest };
