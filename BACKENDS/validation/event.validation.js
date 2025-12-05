import joi from "joi";

export const eventValidation = joi
  .object({
    name: joi.string().required(),
    title: joi.string().required(),
    link: joi.string().uri().required(),
    description: joi.string(),
    endDate: joi.date().required(),
  })
  .min(4);

export const UpdateeventValidation = joi.object({
  name: joi.string(),
  title: joi.string(),
  link: joi.link(),
  description: joi.string(),
  endDate: joi.date(),
});
