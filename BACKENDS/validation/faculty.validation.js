import joi from "joi";

export const validateFaculty = joi.object({
  name: joi.string().required(),
  departement: joi.string().required(),
  exprence: joi.number().required().min(0),
  subject: joi.string().required(),
  description: joi.string(),
});

export const UpdatevalidateFaculty = joi.object({
  name: joi.string(),
  departement: joi.string(),
  exprence: joi.number().min(0),
  subject: joi.string(),
  description: joi.string(),
});
