import joi from "joi";

export const validatePYQ = joi.object({
  questionNumber: joi.number().required(),
  subjectName: joi.string().required(),
  question: joi.string().required(),
  tag: joi.string().required(),
  years: joi.array().items(joi.string()).required(),
  answer: joi.string().required(),
});

export const validatePYQUpdate = joi.object({
  questionNumber: joi.number(),
  subjectName: joi.string(),
  question: joi.string(),
  tag: joi.string(),
  years: joi.array().items(joi.string()),
  answer: joi.string(),
});
