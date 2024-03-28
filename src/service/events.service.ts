import { Event } from "@/model";

export const getAllEvents = async () => {
  try {
    const events = await Event.findAll();
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
