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

const ValidateNotes = (req, res, next) => {
  const schema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    subject: joi.string().required(),
    year: joi.number(),
    fileUrl: joi.string().required(),
    type: joi.string().required(),
  });
  const { err } = joi.validate(schema);

  if (err) {
    return res.status(401).json({
      date: err,
      massage: "Plase enter valid inputs",
    });
  }
  next();
};
export { ValidateItems, ValidateNotes };
