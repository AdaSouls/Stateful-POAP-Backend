import { Event, Issuer, Owner } from "../model";
import { eventTable } from "../util/tables";
// import { poapContract } from "../util/contractsInteractions";
import * as poap from "../util/smartContracts/poapContractInteractions";
import * as soulbound from "../util/smartContracts/soulboundContractInteractions";
import * as consensual from "../util/smartContracts/consensualContractInteractions";
import dotenv from "dotenv";
import path from "path";
import { Approved, PoapType } from "../common/enums";
import { IEvent, IIssuer } from "../common/interfaces";
import { UUID } from "crypto";
import { eventUuidInBytes32 } from "../util/smartContracts/statusEncoder";

dotenv.config({ path: path.join(__dirname, "../.env") });

const {
  ADDRESS_0,
  ADDRESS_1,
  GANACHE_URL,
  POAP_ADDRESS,
  SOULBOUND_ADDRESS,
  CONSENSUAL_ADDRESS,
  HH_ACCOUNT_0,
  HH_ACCOUNT_1,
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

export const getAllByApprovalStatus = async (approved: string) => {
  try {
    const events = await Event.findAll({
      include: { model: Issuer },
      where: { approved },
    });
    return events;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getApprovalStatus = async (
  eventIdInContract: number,
  issuerAddress: string,
  contractType: string
) => {
  try {
    const event = await Event.findOne({
      where: { idInContract: eventIdInContract, poapType: contractType },
      include: { model: Issuer, where: { address: issuerAddress } },
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
    console.log("🚀 ~ [eventTable.poapsToBeMinted, eventTable.mintedPoaps]:", [
      eventTable.poapsToBeMinted,
      eventTable.mintedPoaps,
    ]);
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

export const createEvent = async (event: IEvent, issuerUuid: UUID) => {
  const eventUuid = crypto.randomUUID();
  const eventInfo = { ...event, issuerUuid, eventUuid };
  try {
    const event = await Event.create(eventInfo, { include: { model: Issuer } });
    return event;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const approveOrReject = async (eventUuid: string, approval: string) => {
  try {
    if (approval === Approved.Rejected) {
      const event = await Event.update(
        { approved: approval },
        { where: { eventUuid } }
      );
      if (event[0] === 1) {
        const event = await Event.findByPk(eventUuid);
        return event;
      } else {
        return;
      }
    } else {
      const event = await Event.findByPk(eventUuid, {
        include: { model: Issuer },
      });
      if (event?.dataValues.poapType === PoapType.Poap) {
        let milliseconds;
        if (event?.dataValues.expiryDate !== null) {
          const date = new Date(event?.dataValues.expiryDate);
          milliseconds = date.getTime();
        } else {
          const currentDate = new Date();
          const futureDate = new Date();
          futureDate.setFullYear(currentDate.getFullYear() + 99);
          milliseconds = futureDate.getTime();
        }
        const timestamp = Math.floor(milliseconds / 1000);
        const eventCreatedInBC = await poap.createEventId(
          event?.dataValues.Issuer?.dataValues.issuerIdInContract,
          event?.dataValues.idInContract,
          event?.dataValues.poapsToBeMinted,
          timestamp,
          HH_ACCOUNT_0 as string
        );
      }
      const eventUpdated = await Event.update(
        { approved: approval },
        { where: { eventUuid } }
      );
      if (eventUpdated[0] === 1) {
        const event = await Event.findByPk(eventUuid);
        return event;
      }
      if (eventUpdated[0] === 0) {
        return null;
      } else {
        return;
      }
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};
