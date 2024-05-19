import { Event, Owner } from "../model";
import { eventTable } from "../util/tables";
// import { poapContract } from "../util/contractsInteractions";
import {
  createEventId,
  getOwner,
  getTokenEventId,
  isAdmin,
} from "../util/smartContracts/poapContractInteractions";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../.env") });

const {
  ADDRESS_0,
  ADDRESS_1,
  GANACHE_URL,
  POAP_ADDRESS,
  SOULBOUND_ADDRESS,
  CONSENSUAL_ADDRESS,
  HH_ACCOUNT_0,
} = process.env;

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
    return {
      poapsToBeMinted: mintableAmount?.dataValues.poapsToBeMinted,
      mintedPoaps: mintableAmount?.dataValues.mintedPoaps,
    };
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
    const eventCreated = await createEventId(333, 59, 1717977600, HH_ACCOUNT_0 as string)
    console.log("🚀 ~ createEvent ~ eventCreated:", eventCreated)

    // const eventCreated = await getOwner()
    // console.log("🚀 ~ createEvent ~ eventCreated:", eventCreated)

    // const eventCreated = await isAdmin(ADDRESS_1 as string)
    // console.log("🚀 ~ createEvent ~ eventCreated:", eventCreated)

    // const tokenEventId = await getTokenEventId(333);
    // console.log("🚀 ~ createEvent ~ tokenEventId:", tokenEventId);

    // const eventCreated = await Event.create(eventInfo);
    // return eventCreated;
  } catch (error) {
    console.log("Error: ", error);
  }
};
