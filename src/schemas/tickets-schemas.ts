import Joi from "joi";

export const ticketsSchema = Joi.object({
  ticketTypeId: Joi.number().greater(0).required(),
});
