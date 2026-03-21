import joi from "joi";

export const validateFaculty = joi.object({
  name: joi.string().required(),
  department: joi.string().required(),
  designation: joi.string().required(),
  experience: joi.number().required().min(0),
  subject: joi.string().required(),
  description: joi.string(),
}).unknown(true);

export const UpdatevalidateFaculty = joi.object({
  name: joi.string(),
  department: joi.string(),
  designation: joi.string(),
  experience: joi.number().min(0),
  subject: joi.string(),
  description: joi.string(),
}).unknown(true);
