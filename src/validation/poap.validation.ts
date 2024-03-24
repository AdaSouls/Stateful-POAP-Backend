import Joi from "joi"
import JoiDateFactory from "@joi/date"

export enum EventType {
  Virtual="Virtual",
  InPerson="In-Person",
  Both="Both"
}

export interface Event {
  title: string;
  description: string;
  city: string;
  country: string;
  startDate: Date;
  endDate: Date;
  expiryDate: Date;
  year: number;
  eventUrl: string;
  virtualEvent: boolean;
  image: string;
  secretCode: number;
  eventTemplateId: number;
  email: string;
  requestedCodes: number;
  privateEvent: boolean;
  purpose: string;
  platform: string;
  eventType: EventType;
  amountOfAttendees: number;
  account: string;
  // state
}

const validateEventType = (value: any, helpers: any) => {
  if (!value && helpers.prefs.presence === 'optional') {
    return value;
  }
  if (Object.keys(EventType).indexOf(value) === -1) {
    return helpers.message('Invalid event type');
  }
  return value;
}


const event = Joi.object().keys({
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
})


