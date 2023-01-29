import Joi from "joi";

export const paymentsSchema = Joi.object({
  ticketId: Joi.number().greater(0).required(),
  cardData: Joi.object({
    issuer: Joi.string().required(),
    number: Joi.string().required(),
    name: Joi.string().min(3).required(),
    expirationDate: Joi.string().required(),
    cvv: Joi.number().integer().required(),
  }).required(),
});
