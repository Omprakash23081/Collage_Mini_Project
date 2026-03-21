import ApiResponse from "../utils/ApiResponse.js";

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    return res.status(400).json(new ApiResponse(400, null, errorMessage));
  }
  next();
};

export default validate;
