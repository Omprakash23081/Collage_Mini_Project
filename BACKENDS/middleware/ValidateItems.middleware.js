import joi from "joi";

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
export { ValidateNotes };
