import joi from "joi";

export const validatePlan = joi.object({
  name: joi.string().required().messages({
    "string.empty": "Plan name is required",
  }),
  prices: joi
    .object({
      monthly: joi.number().min(0).required(),
      quarterly: joi.number().min(0).required(),
      yearly: joi.number().min(0).required(),
    })
    .required(),
  features: joi
    .array()
    .items(
      joi.object({
        name: joi.string().required(),
        included: joi.boolean().default(true),
        textValue: joi.string().allow("", null),
      }),
    )
    .default([]),
  isActive: joi.boolean().default(true),
  highlight: joi.boolean().default(false),
});
