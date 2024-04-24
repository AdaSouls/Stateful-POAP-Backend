import { IEvent } from "@/common/interfaces";
import { Event } from "../model";

export const getAllEvents = async (offset: number, limit: number) => {
  try {
    const events = await Event.findAll({ offset, limit });
    return events;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getEventByAddress = async (address: string) => {
  try {
    const event = await Event.findOne({ where: { address } });
    return event;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getEventByPK = async (eventId: string) => {
  try {
    const event = await Event.findByPk(eventId);
    return event;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const createEvent = async (event: any) => {
  try {
    const eventCreated = await Event.create(event);
    return eventCreated;
  } catch (error) {
    console.log("Error: ", error);
  }
};
