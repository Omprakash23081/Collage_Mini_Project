import Joi from "joi";

const productValidationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow(""),
  price: Joi.number().required(),
  category: Joi.string().valid("canteen", "stationery").required(),
  isAvailable: Joi.boolean(),
  stock: Joi.number().min(0),
});

const updateProductValidationSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string().allow(""),
  price: Joi.number(),
  category: Joi.string().valid("canteen", "stationery"),
  isAvailable: Joi.boolean(),
  stock: Joi.number().min(0),
});

export { productValidationSchema, updateProductValidationSchema };
