import { Event, Owner } from "../model";
import { eventTable } from "../util/tables";
// import { poapContract } from "../util/contractsInteractions";
import * as poap from "../util/smartContracts/poapContractInteractions";
import * as soulbound from "../util/smartContracts/soulboundContractInteractions";
import * as consensual from "../util/smartContracts/consensualContractInteractions";
import dotenv from "dotenv";
import path from "path";
import { PoapType } from "../common/enums";
import { IEvent } from "../common/interfaces";

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

export const getEventContractType = async (eventId: string) => {
  try {
    const event = await Event.findOne({
      where: { eventId },
      attributes: [eventTable.poapType],
    });
    return event?.dataValues.poapType;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const createEvent = async (event: IEvent, ownerId: string) => {
  const eventId = crypto.randomUUID();
  const eventInfo = { ...event, ownerId, eventId };
  console.log("🚀 ~ createEvent ~ eventInfo.expiryDate:", eventInfo.expiryDate)
  // const timestamp = Math.floor(
  //   eventInfo.expiryDate
  //     ? eventInfo.expiryDate.getDate() / 1000
  //     : Date.now() / 1000 + 86400 * 7
  // );
  try {
    // if (eventInfo.poapType === PoapType.Poap) {
    //   const eventCreated = await poap.createEventId(
    //     eventInfo.idInContract,
    //     eventInfo.poapsToBeMinted,
    //     timestamp,
    //     HH_ACCOUNT_0 as string
    //   );
    //   console.log("🚀 ~ createEvent ~ eventCreated:", eventCreated);
    // }
    // if (eventInfo.poapType === PoapType.Soulbound) {
    //   const eventCreated = await soulbound.createEventId(
    //     eventInfo.idInContract,
    //     eventInfo.poapsToBeMinted,
    //     timestamp,
    //     HH_ACCOUNT_0 as string
    //   );
    //   console.log("🚀 ~ createEvent ~ eventCreated:", eventCreated);
    // }
    // if (eventInfo.poapType === PoapType.Consensual) {
    //   const eventCreated = await consensual.createEventId(
    //     eventInfo.idInContract,
    //     eventInfo.poapsToBeMinted,
    //     timestamp,
    //     HH_ACCOUNT_0 as string
    //   );
    //   console.log("🚀 ~ createEvent ~ eventCreated:", eventCreated);
    // } else {
    //   console.log("Error: Event type not found");
    //   return;
    // }

    const event = await Event.create(eventInfo);
    

    return event;
  } catch (error) {
    console.log("Error: ", error);
  }
};
