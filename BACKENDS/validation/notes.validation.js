import joi from "joi";

export const validateNotes = joi
  .object({
    subjectName: joi.string().required(),
    description: joi.string().required(),
    teacherName: joi.string().required(),
    year: joi.string().required(),
    type: joi.string(),
  })
  .min(4);

export const UpdatevalidateNotes = joi
  .object({
    subject: joi.string(),
    description: joi.string(),
    teacherName: joi.string(),
    year: joi.number(),
    type: joi.string().valid("notes", "pyq"),
  })
  .min(1);
