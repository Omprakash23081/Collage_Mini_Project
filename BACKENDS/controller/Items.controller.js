import ApiResponse from "../util/ApiResponse.js";
import { Upload } from "../util/cloudinary.js";
import { Item } from "../models/lostAndFound.models.js";

const Items = async (req, res) => {
  const { name, description, status, location, number, image } = req.body;

  console.log(name);

  const localPath = req.files?.image?.[0]?.path;

  var responseUrl = null;
  if (localPath) {
    responseUrl = await Upload(localPath);
  }
  console.log(responseUrl);

  let response = null;
  if (responseUrl != null) {
    response = await Item.create({
      name,
      description,
      status,
      location,
      number,
      image: responseUrl,
    });
  }
  console.log(response);
  if (response != null) {
    return res.status(200).json(new ApiResponse(200, response, ""));
  } else {
    return res.status(500).json(new ApiResponse(500, "fails to uplode", ""));
  }
};

const getItems = async (req, res) => {
  const data = await Item.find({});
  if (data)
    return res
      .status(200)
      .json(new ApiResponse(200, data, "Data find sucessfully"));
  else
    return res
      .status(500)
      .json(new ApiResponse(500, {}, "Internal server Errer"));
};

export { Items, getItems };
