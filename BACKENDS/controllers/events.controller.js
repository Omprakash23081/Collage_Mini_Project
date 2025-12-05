import { Event } from "../models/events.model.js";
import ApiResponse from "../util/ApiResponse.js";
import {
  eventValidation,
  UpdateeventValidation,
} from "../validation/event.validation.js";
import { Upload } from "../config/cloudinary.js";

const getEvents = async (req, res) => {
  const response = await Event.find({});
  if (response) {
    return res
      .status(200)
      .json(new ApiResponse(200, response, "Faculty details"));
  } else {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Faild to Events on Db"));
  }
};

const createEvents = async (req, res) => {
  const { err } = eventValidation.validate(req.body);

  if (err) {
    return res
      .status(400)
      .json(new ApiResponse(400, err, "Plase enter valid Inputs"));
  }

  const { name, title, description, link, endDate } = req.body;

  if (req.user.role !== "admin") {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "event only can uplode by admin"));
  }

  let imageUrl = null;

  if (req.file?.path) {
    imageUrl = await Upload(req.file.path);
  }

  const response = await Event.create({
    name,
    description,
    endDate,
    image: imageUrl,
    title,
    link,
  });

  if (response) {
    return res.status(200).json(new ApiResponse(200, response, ""));
  } else {
    return res.status(500).json(new ApiResponse(500, null, "faild to uplode "));
  }
};

const updateEvents = async (req, res) => {
  const { err } = UpdateeventValidation.validate(req.body);

  if (err) {
    return res
      .status(400)
      .json(new ApiResponse(400, err, "Plase enter valid Inputs"));
  }

  const { endDate, name, link, title, description } = req.body;

  if (req.user.role !== "admin") {
    return res
      .status(400)
      .json(
        new ApiResponse(400, null, "Faculty detais only can update by Admin")
      );
  }

  let updateData = {};
  if (name) updateData.name = name;
  if (title) updateData.title = title;
  if (description) updateData.description = description;
  if (link) updateData.link = link;
  if (endDate) updateData.endDate = endDate;

  if (req.file?.path) {
    const imageUrl = await Upload(req.file.path);
    updateData.image = imageUrl;
  }

  const response = await Event.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });

  if (response) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, response, "Events details updates Sucessfily")
      );
  } else {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Faild to uplode on Db"));
  }
};

const delateEvents = async (req, res) => {
  if (!req.params.id) {
    return res
      .status(400)
      .json(new ApiResponse(400, err, "Plase Select valid events"));
  }

  if (req.user.role !== "admin") {
    return res
      .status(400)
      .json(new ApiResponse(400, err, "Event only can delate by admin"));
  }

  const response = await Event.findByIdAndDelete(req.params.id);

  if (response) {
    return res
      .status(200)
      .json(new ApiResponse(200, response, "Event delete Sucessfily"));
  } else {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Faild to delate Events"));
  }
};

export { getEvents, createEvents, updateEvents, delateEvents };
