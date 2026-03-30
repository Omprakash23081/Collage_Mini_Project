import Joi from "joi";

const orderValidationSchema = Joi.object({
  vendorId: Joi.string().required(),
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().min(1).required(),
        price: Joi.number().required(),
      })
    )
    .min(1)
    .required(),
  totalAmount: Joi.number().required(),
  transactionId: Joi.string().allow(""),
  paymentProof: Joi.string().allow(""),
  building: Joi.string().allow(""),
  classNumber: Joi.string().allow(""),
});

export { orderValidationSchema };
