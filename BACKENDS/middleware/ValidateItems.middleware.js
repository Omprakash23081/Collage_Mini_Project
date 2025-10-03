import joi from "joi";

const ValidateItems = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().required(),
    Description: joi.string().required(),
    Status: joi.string().required(),
    Location: joi.string().required(),
    number: joi.string().max(10).min(10).required(),
    image: joi.string().required(),
  });
  const { err } = schema.validate(req.body);
  if (err) {
    return res.Status(401).json({
      status: 401,
      data: err,
      message: "invalid input",
    });
  }
  next();
};

export default ValidateItems;
