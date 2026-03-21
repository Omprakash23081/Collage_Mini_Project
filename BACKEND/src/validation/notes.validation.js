import joi from "joi";

export const validateNotes = joi.object({
  subjectName: joi.string().required(),
  teacherName: joi.string().required(),
  year: joi.string().required(),
  fileUrl: joi.string(),
  isPremium: joi.boolean().default(false),
  isFull: joi.boolean().default(false),
  status: joi
    .string()
    .valid("draft", "approved", "published", "archived")
    .default("draft"),
  chapterName: joi.string().allow("", null),
}).unknown(true);

export const UpdatevalidateNotes = joi
  .object({
    subjectName: joi.string(),
    description: joi.string(),
    teacherName: joi.string(),
    year: joi.string(),
    type: joi.string(),
    isPremium: joi.boolean(),
    isFull: joi.boolean(),
    chapterName: joi.string().allow("", null),
    status: joi.string().valid("draft", "published", "archived", "approved"),
    difficulty: joi.string().valid("easy", "medium", "hard"),
  })
  .unknown(true)
  .min(1);
