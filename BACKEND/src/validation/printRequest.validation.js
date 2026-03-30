import Joi from "joi";

const printRequestValidationSchema = Joi.object({
  vendorId: Joi.string().required(),
  transactionId: Joi.string().allow(""),
  building: Joi.string().allow(""),
  classNumber: Joi.string().allow(""),
  settings: Joi.object({
    copies: Joi.number().min(1),
    color: Joi.boolean(),
    doubleSided: Joi.boolean(),
    pageRange: Joi.string(),
  }).required(),
});

export { printRequestValidationSchema };
