import joi from "joi";

export const validatePYQ = joi.object({
  subjectName: joi.string().required(),
  teacherName: joi.string().allow("", null),
  year: joi.string().required(),
  isPremium: joi.boolean().default(false),
  status: joi.string().valid("draft", "approved").default("draft"),
  isAll: joi.boolean().default(false),
  examType: joi.string().allow("", null),
  chapter: joi.string().allow("", null),
  chapterName: joi.string().allow("", null),
}).unknown(true);

export const validatePYQUpdate = joi.object({
  questionNumber: joi.number(),
  subjectName: joi.string(),
  question: joi.string(),
  tag: joi.string().allow("", null),
  years: joi.array().items(joi.string()),
  year: joi.string(),
  answer: joi.string(),
  isPremium: joi.boolean(),
  status: joi.string().valid("draft", "approved"),
  difficulty: joi.string().valid("easy", "medium", "hard"),
  isAll: joi.boolean(),
  teacherName: joi.string().allow("", null),
  chapter: joi.string().allow("", null),
  chapterName: joi.string().allow("", null),
  examType: joi.string().allow("", null),
}).unknown(true);
