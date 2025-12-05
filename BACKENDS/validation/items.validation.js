//this file is help during writing controller function it will give schema and controller just import this file and use the validation fildes by using joi.validate function

import Joi from "joi";

//this is used for validation during adding item in lost and found section
const validateItems = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().valid("lost", "found").required(),
  location: Joi.string().required(),
  number: Joi.string().max(10).min(10).required(),
});

//this is used for validation during updating item in lost and found section
const updateItemValidation = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  status: Joi.string().valid("lost", "found"),
  location: Joi.string(),
  number: Joi.string().max(10).min(10),
  image: Joi.string(),
});

//this is used for validation during deleting item in lost and found section
const deleteItemValidation = Joi.object({
  itemId: Joi.string().hex().length(24).required(),
});

export { validateItems, updateItemValidation, deleteItemValidation };
