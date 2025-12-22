import { Event } from "../models/events.model.js";
import ApiResponse from "../util/ApiResponse.js";
import {
  eventValidation,
  UpdateeventValidation,
} from "../validation/event.validation.js";
import { Upload } from "../config/cloudinary.js";

const getEvents = async (req, res) => {
  try {
    const response = await Event.find({});
    if (response) {
      return res
        .status(200)
        .json(new ApiResponse(200, response, "Faculty details"));
    } else {
      return res
        .status(404) // Fixed: 404
        .json(new ApiResponse(404, [], "No events found"));
    }
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

const createEvents = async (req, res) => {
  try {
    const { error } = eventValidation.validate(req.body); // Fixed: error instead of err

    if (error) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, error.message));
    }

    const { name, title, description, link, endDate } = req.body;

    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json(new ApiResponse(403, null, "event only can uplode by admin"));
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
      return res.status(200).json(new ApiResponse(200, response, "Event Created Successfully"));
    } else {
      return res.status(500).json(new ApiResponse(500, null, "faild to uplode "));
    }
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

const updateEvents = async (req, res) => {
  try {
    const { error } = UpdateeventValidation.validate(req.body); // Fixed destructuring

    if (error) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, error.message));
    }

    const { endDate, name, link, title, description } = req.body;

    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json(
          new ApiResponse(403, null, "Faculty detais only can update by Admin")
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
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

const delateEvents = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Plase Select valid events"));
    }

    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json(new ApiResponse(403, null, "Event only can delate by admin"));
    }

    const response = await Event.findByIdAndDelete(req.params.id);

    if (response) {
      return res
        .status(200)
        .json(new ApiResponse(200, response, "Event delete Sucessfily"));
    } else {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Faild to delate Events"));
    }
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

export { getEvents, createEvents, updateEvents, delateEvents };
