import ApiResponse from "../util/ApiResponse.js";
import { Upload } from "../config/cloudinary.js";
import { Item } from "../models/lostAndFound.model.js";
import {
  validateItems,
  deleteItemValidation,
  updateItemValidation,
} from "../validation/items.validation.js";

//this logic has been done
const uplodeItems = async (req, res) => {
  const { name, description, status, location, number } = req.body;

  await validateItems.validateAsync(req.body).catch((err) => {
    return res.status(400).json(new ApiResponse(400, null, err.message));
  });

  const localPath = req.file?.path;
  let responseUrl = null;

  if (localPath) {
    responseUrl = await Upload(localPath);
  }

  if (!responseUrl) {
    return res.status(500).json(new ApiResponse(500, "Image Uplide Faild", ""));
  }

  const response = await Item.create({
    name,
    description,
    status,
    location,
    number,
    image: responseUrl,
    uploadedBy: req.user._id,
  });

  if (response) {
    return res
      .status(200)
      .json(new ApiResponse(200, response, "Data Uplode Sucessfully"));
  } else {
    return res
      .status(500)
      .json(new ApiResponse(500, "fails to uplode in DataBase", ""));
  }
};

//this logic has been done
const getItems = async (req, res) => {
  const data = await Item.find({});
  if (data) {
    return res
      .status(200)
      .json(new ApiResponse(200, data, "Data find sucessfully"));
  } else {
    return res
      .status(500)
      .json(new ApiResponse(500, {}, "Internal server error"));
  }
};

//thus logic has been done
const getUserUplodedItems = async (req, res) => {
  const data = await Item.find({ uploadedBy: req.user._id });
  if (data) {
    return res
      .status(200)
      .json(new ApiResponse(200, data, "Data Fatch Sucessfully"));
  } else {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "you have not uplode any Item yeat"));
  }
};

//this logic has been done
const updateItem = async (req, res) => {
  const { name, description, status, location, number } = req.body;

  await updateItemValidation.validateAsync(req.body).catch((err) => {
    return res.status(400).json(new ApiResponse(400, null, err.message));
  });

  let updateData = {};
  if (name) updateData.name = name;
  if (description) updateData.description = description;
  if (status) updateData.status = status;
  if (location) updateData.location = location;
  if (number) updateData.number = number;

  if (req.file?.path) {
    const ImageUrl = await Upload(req.file.path);
    updateData.image = ImageUrl;
  }

  const response = await Item.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });

  if (response) {
    return res
      .status(200)
      .json(new ApiResponse(200, response, "Item is Update Sucessfully"));
  } else {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Faild to Update Item in db"));
  }
};

//this logic has been done
const deleteItem = async (req, res) => {
  await deleteItemValidation.validateAsync(req.params).catch((err) => {
    return res
      .status(400)
      .json(new ApiResponse(400, err, "Plase sellect valid item to delate"));
  });

  const delatedItem = await Item.findByIdAndDelete(req.params.id);
  if (delatedItem) {
    return res
      .status(200)
      .json(new ApiResponse(200, delatedItem, "ItemDelate Sucessfully"));
  } else {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "faild to delate the items"));
  }
};
export { uplodeItems, getItems, getUserUplodedItems, updateItem, deleteItem };
