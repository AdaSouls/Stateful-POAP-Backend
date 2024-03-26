import Joi from "joi"
import { validateEventType, validatePoapType } from "./custom.validation";

export const event = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  expiryDate: Joi.date(),
  year: Joi.number(),
  eventUrl: Joi.string().required(),
  virtualEvent: Joi.boolean(),
  image: Joi.string().required(),
  secretCode: Joi.number(),
  eventTemplateId: Joi.number(),
  email: Joi.string().required(),
  requestedCodes: Joi.number(),
  privateEvent: Joi.boolean(),
  purpose: Joi.string().required(),
  platform: Joi.string().required(),
  eventType: Joi.custom(validateEventType),
  amountOfAttendees: Joi.number(),
  account: Joi.string().required(),
  poapType: Joi.custom(validatePoapType),
})


