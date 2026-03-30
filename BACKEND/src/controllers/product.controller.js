import ApiResponse from "../utils/ApiResponse.js";
import { Upload } from "../config/cloudinary.js";
import Product from "../models/product.model.js";
import {
  productValidationSchema,
  updateProductValidationSchema,
} from "../validation/product.validation.js";

const createProduct = async (req, res) => {
  try {
    const { error } = productValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json(new ApiResponse(400, null, error.message));
    }

    const { name, description, price, category, isAvailable, stock } = req.body;

    let imageUrl = "https://via.placeholder.com/150";
    if (req.file) {
      imageUrl = await Upload(req.file.buffer || req.file.path, true);
    }

    const product = await Product.create({
      vendorId: req.user._id,
      name,
      description,
      price,
      image: imageUrl,
      category,
      isAvailable,
      stock,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, product, "Product created successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

const getProducts = async (req, res) => {
  try {
    const { category, vendorId } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (vendorId) filter.vendorId = vendorId;

    const products = await Product.find(filter).populate("vendorId", "name paymentQRCode");
    return res
      .status(200)
      .json(new ApiResponse(200, products, "Products fetched successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = updateProductValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json(new ApiResponse(400, null, error.message));
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json(new ApiResponse(404, null, "Product not found"));
    }

    if (product.vendorId.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json(new ApiResponse(403, null, "Unauthorized"));
    }

    if (req.file) {
      req.body.image = await Upload(req.file.buffer || req.file.path, true);
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json(new ApiResponse(404, null, "Product not found"));
    }

    if (product.vendorId.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json(new ApiResponse(403, null, "Unauthorized"));
    }

    await Product.findByIdAndDelete(id);
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Product deleted successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

export { createProduct, getProducts, updateProduct, deleteProduct };
