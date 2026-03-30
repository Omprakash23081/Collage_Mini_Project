import ApiResponse from "../utils/ApiResponse.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import { orderValidationSchema } from "../validation/order.validation.js";
import { emitToUser } from "../utils/socket.js";

const createOrder = async (req, res) => {
  try {
    let { vendorId, items, totalAmount, transactionId, building, classNumber } = req.body;

    // Handle FormData stringified fields
    if (typeof items === 'string') {
      try {
        items = JSON.parse(items);
      } catch (e) {
        return res.status(400).json(new ApiResponse(400, null, "Invalid items format"));
      }
    }

    const { error } = orderValidationSchema.validate({ vendorId, items, totalAmount, transactionId, building, classNumber });
    if (error) {
      return res.status(400).json(new ApiResponse(400, null, error.message));
    }

    let paymentProofUrl = "";
    if (req.file) {
      const { Upload } = await import("../config/cloudinary.js");
      paymentProofUrl = await Upload(req.file.buffer || req.file.path, req.file.isImage);
    }

    const order = await Order.create({
      studentId: req.user._id,
      vendorId,
      items,
      totalAmount,
      transactionId: transactionId || "",
      paymentProof: paymentProofUrl,
      building: building || "",
      classNumber: classNumber || "",
    });

    // Update stock levels
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (product) {
        product.stock = Math.max(0, product.stock - (item.quantity || 1));
        if (product.stock === 0) {
          product.isAvailable = false;
        }
        await product.save();
      }
    }

    return res
      .status(201)
      .json(new ApiResponse(201, order, "Order placed successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

const getOrders = async (req, res) => {
  try {
    const { role, _id } = req.user;
    let filter = {};

    if (role === "student") {
      filter.studentId = _id;
    } else if (role === "canteen_vendor" || role === "stationery_vendor") {
      filter.vendorId = _id;
    }

    const orders = await Order.find(filter)
      .populate("studentId", "name email")
      .populate("vendorId", "name")
      .populate("items.productId", "name price category")
      .sort({ createdAt: -1 });

    return res
      .status(200)
      .json(new ApiResponse(200, orders, "Orders fetched successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json(new ApiResponse(400, null, "Status is required"));
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json(new ApiResponse(404, null, "Order not found"));
    }

    // Only the assigned vendor or admin can update status
    if (order.vendorId.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json(new ApiResponse(403, null, "Unauthorized"));
    }

    order.status = status;
    await order.save();

    // Notify student about order update
    emitToUser(order.studentId.toString(), "order_update", {
      orderId: order._id,
      status: order.status,
      message: `Your order is now ${order.status}`
    });

    return res
      .status(200)
      .json(new ApiResponse(200, order, "Order status updated successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json(new ApiResponse(404, null, "Order not found"));
    }

    if (order.studentId.toString() !== req.user._id.toString()) {
      return res.status(403).json(new ApiResponse(403, null, "Unauthorized"));
    }

    if (order.status !== "Pending") {
      return res.status(400).json(new ApiResponse(400, null, "Only pending orders can be deleted"));
    }

    await Order.findByIdAndDelete(id);

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Order deleted successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { transactionId, building, classNumber } = req.body;
    
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json(new ApiResponse(404, null, "Order not found"));
    }

    if (order.studentId.toString() !== req.user._id.toString()) {
      return res.status(403).json(new ApiResponse(403, null, "Unauthorized"));
    }

    if (order.status !== "Pending") {
      return res.status(400).json(new ApiResponse(400, null, "Only pending orders can be updated"));
    }

    if (transactionId) order.transactionId = transactionId;
    if (building) order.building = building;
    if (classNumber) order.classNumber = classNumber;

    if (req.file) {
      const { Upload } = await import("../config/cloudinary.js");
      order.paymentProof = await Upload(req.file.buffer || req.file.path, true);
    }

    await order.save();

    return res
      .status(200)
      .json(new ApiResponse(200, order, "Order updated successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

export { createOrder, getOrders, updateOrderStatus, deleteOrder, updateOrder };
