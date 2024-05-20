import { Event, Owner } from "../model";
import { eventTable } from "../util/tables";

export const getAllEvents = async (offset: number, limit: number) => {
  try {
    const events = await Event.findAll({
      offset,
      limit,
      include: { model: Owner },
    });
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

export const getEventMintableAmount = async (eventId: string) => {
  try {
    const mintableAmount = await Event.findOne({
      where: { eventId },
      attributes: [eventTable.poapsToBeMinted, eventTable.mintedPoaps],
    });
    return ({
      poapsToBeMinted: mintableAmount?.dataValues.poapsToBeMinted,
      mintedPoaps: mintableAmount?.dataValues.mintedPoaps,
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const updateMintedPoapsAmount = async (
  eventId: string,
  newAmount: number
) => {
  try {
    const event = await Event.update(
      { mintedPoaps: newAmount },
      {
        where: { eventId },
      }
    );
    return event;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const createEvent = async (event: any, ownerId: string) => {
  const eventId = crypto.randomUUID();
  const eventInfo = { ...event, ownerId, eventId };
  try {
    const eventCreated = await Event.create(eventInfo);
    return eventCreated;
  } catch (error) {
    console.log("Error: ", error);
  }
};
