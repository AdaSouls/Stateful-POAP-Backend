import { Event, Poap, EventPoap, Owner } from "../model";
import dotenv from "dotenv";
import path from "path";
import * as eventService from "./events.service";
import * as eventPoapService from "./eventPoaps.service";
import { mintToken } from "../util/smartContracts/poapContractInteractions";
import { encodeStatus } from "../util/smartContracts/statusEncoder";
import { sequelize } from "../database/connection";
import { QueryTypes } from "sequelize";
import { UUID } from "crypto";

dotenv.config({ path: path.join(__dirname, "../.env") });

const { HH_ACCOUNT_0, HH_ACCOUNT_1 } = process.env;

export const getAllPoaps = async (offset: number, limit: number) => {
  try {
    const poaps = await Poap.findAll({
      offset,
      limit,
      include: {
        model: Event,
        attributes: ["idInContract", "eventUuid"],
        through: { attributes: ["relationUuid"] },
      },
    });
    return poaps;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getAllPoapsByOwnersAddress = async (ownerUuid: string) => {
  try {
    const poaps = await Poap.findAll({ where: { ownerUuid } });
    return poaps;
  } catch (error) {
    console.log("Error: ", error);
  }
};

// Check if it should be here or in event's service
export const getAllPoapsByEvent = async (eventUuid: string) => {
  try {
    const poaps = await Poap.findAll({ where: { eventUuid } });
    return poaps;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getPoapByPK = async (address: string) => {
  try {
    const poap = await Poap.findByPk(address);
    return poap;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const mintPoap = async (ownerUuid: UUID, eventUuid: UUID) => {
  const poapUuid = crypto.randomUUID();
  const mintableAmount = await eventService.getEventMintableAmount(eventUuid);
  const event = await eventService.getEventByPK(eventUuid);
  let mintInfo;
  if (mintableAmount) {
    mintInfo = {
      ownerUuid,
      eventUuid,
      poapUuid,
      instance: mintableAmount?.mintedPoaps + 1,
    };
  }
  const hashedInfo = encodeStatus([event?.dataValues]);
  try {
    const mintedTokenToBlockchain = await mintToken(
      event?.dataValues.idInContract as number,
      HH_ACCOUNT_1 as string,
      hashedInfo
    );
    console.log(
      "🚀 ~ mintPoap ~ mintedTokenToBlockchain:",
      mintedTokenToBlockchain
    );
    const owner = await Owner.findByPk(ownerUuid);
    if (!owner) {
      return;
    }
    if (
      mintableAmount &&
      mintableAmount.poapsToBeMinted - mintableAmount.mintedPoaps > 0 &&
      event
    ) {
      const poap = await Poap.create(mintInfo);
      const relation = await eventPoapService.addRelation(poapUuid, eventUuid);
      console.log("🚀 ~ mintPoap ~ relation:", relation);

      const updatedMintedAmount = await Event.update(
        { mintedPoaps: mintableAmount.mintedPoaps + 1 },
        { where: { eventUuid } }
      );
      return poap;
    } else {
      return "Poap could not be minted, minted all poaps";
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const updatePoapMetadata = async (
  poapUuid: UUID,
  eventUuid: UUID
) => {
  // Option 1
  // Get metadata from blockchain/paima (correct way)

  // Option 2
  // Get metadata from DB
  try {
    const poap = await Poap.findByPk(poapUuid, {
      include: { model: Event },
    });
    console.log("🚀 ~ updatePoapMetadata ~ poap:", poap);
    // const metadata = poap?.dataValues.metadata;
    // const newEvent = await eventService.getEventByPK(eventUuid);
    // const newMetadata = [...metadata, newEvent?.dataValues];
    // const updatedPoap = await Poap.update(
    //   { metadata: newMetadata },
    //   { where: { uuid: poapUuid } }
    // );
    // return updatedPoap;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const addEventToPoap = async (poapUuid: UUID, eventUuid: UUID) => {
  try {
    const poap = await Poap.findByPk(poapUuid);
    const event = await Event.findByPk(eventUuid);
    if (!poap || !event) {
      return;
    } else {
      const relation = await eventPoapService.addRelation(poapUuid, eventUuid);
      return relation;
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};
