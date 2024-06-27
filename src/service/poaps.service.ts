import { Event, Poap, EventPoap, Owner } from "../model";
import dotenv from "dotenv";
import path from "path";
import * as eventService from "./events.service";
import * as eventPoapService from "./eventPoaps.service";
import { mintToken } from "../util/smartContracts/poapContractInteractions";
import { encodeStatus } from "../util/smartContracts/statusEncoder";
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
  const event = await eventService.getEventByPK(eventUuid);
  let mintInfo;
  if (event) {
    mintInfo = {
      ownerUuid,
      eventUuid,
      poapUuid,
      instance: event?.dataValues.mintedPoaps + 1,
    };
  }
  const hashedInfo = encodeStatus([event?.dataValues]);
  try {
    const mintedTokenToBlockchain = await mintToken(
      event?.dataValues.Issuer.dataValues.issuerIdInContract as number,
      event?.dataValues.idInContract as number,
      HH_ACCOUNT_1 as string,
      hashedInfo
    );

    if (
      event &&
      event.dataValues.poapsToBeMinted - event.dataValues.mintedPoaps > 0
    ) {
      const poap = await Poap.create(mintInfo);
      if (poap) {
        const relation = await eventPoapService.addRelation(
          poapUuid,
          eventUuid
        );
      }

      const updatedMintedAmount = await Event.update(
        { mintedPoaps: event.dataValues.mintedPoaps + 1 },
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

export const addEventToPoap = async (poapUuid: UUID, eventUuid: UUID) => {
  // Add hashed data to paima
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
