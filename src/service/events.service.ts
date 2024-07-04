import { Event, Issuer, Owner } from "../model";
import { eventTable } from "../util/tables";
// import { poapContract } from "../util/contractsInteractions";
import * as poap from "../util/smartContracts/poapContractInteractions";
import * as soulbound from "../util/smartContracts/soulboundContractInteractions";
import * as consensual from "../util/smartContracts/consensualContractInteractions";
import dotenv from "dotenv";
import path from "path";
import { PoapType } from "../common/enums";
import { IEvent, IIssuer } from "../common/interfaces";
import { UUID } from "crypto";

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
      include: { model: Issuer },
    });
    return events;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getEventByAddress = async (address: string) => {
  try {
    const event = await Event.findOne({
      where: { address },
      include: { model: Issuer },
    });
    return event;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getEventByPK = async (eventUuid: string) => {
  try {
    const event = await Event.findByPk(eventUuid, {
      include: { model: Issuer },
    });
    return event;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getEventMintableAmount = async (
  eventUuid: string
): Promise<{ poapsToBeMinted: number; mintedPoaps: number } | undefined> => {
  try {
    console.log("🚀 ~ [eventTable.poapsToBeMinted, eventTable.mintedPoaps]:", [eventTable.poapsToBeMinted, eventTable.mintedPoaps])
    const mintableAmount = await Event.findOne({
      where: { eventUuid },
      attributes: [eventTable.poapsToBeMinted, eventTable.mintedPoaps],
    });
    if (
      mintableAmount?.dataValues.poapsToBeMinted &&
      mintableAmount?.dataValues.mintedPoaps
    ) {
      return {
        poapsToBeMinted: mintableAmount?.dataValues.poapsToBeMinted,
        mintedPoaps: mintableAmount?.dataValues.mintedPoaps,
      };
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const updateMintedPoapsAmount = async (
  eventUuid: string,
  newAmount: number
) => {
  try {
    const event = await Event.update(
      { mintedPoaps: newAmount },
      {
        where: { eventUuid },
      }
    );
    return event;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getEventContractType = async (eventUuid: string) => {
  try {
    const event = await Event.findOne({
      where: { eventUuid },
      attributes: [eventTable.poapType],
    });
    return event?.dataValues.poapType;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const createEvent = async (event: IEvent, issuerUuid: UUID, issuerIdInContract: number, hashedInfo: string) => {
  console.log("🚀 ~ createEvent ~ issuerIdInContract:", issuerIdInContract)
  console.log("🚀 ~ createEvent ~ issuerUuid:", issuerUuid);
  console.log("🚀 ~ createEvent ~ event:", event);
  const eventUuid = crypto.randomUUID();
  if (!issuerUuid) {
    console.log("Error: Issuer not found");
    return;
  }
  const eventInfo = { ...event, issuerUuid, eventUuid };
  let milliseconds;
  if (eventInfo.expiryDate) {
    const date = new Date(eventInfo.expiryDate);
    milliseconds = date.getTime();
  } else {
    milliseconds = Date.now() / 1000 + 86400 * 365 * 99;
  }
  const timestamp = Math.floor(milliseconds / 1000);
  try {
    if (eventInfo.poapType === PoapType.Poap) {
      console.log("🚀 ~ createEvent ~ eventInfo.poapType === PoapType.Poap:", eventInfo.poapType === PoapType.Poap)
      const eventCreated = await poap.createEventId(
        issuerIdInContract,
        eventInfo.idInContract,
        eventInfo.poapsToBeMinted,
        timestamp,
        HH_ACCOUNT_0 as string,
        hashedInfo
        
      );
      console.log("🚀 ~ createEvent ~ eventCreated:", eventCreated);
    }
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

    const event = await Event.create(eventInfo, {include: {model: Issuer}});
    // const event = await Event.create(eventInfo, { include: { model: Issuer } });

    return event;
  } catch (error) {
    console.log("Error: ", error);
  }
}
