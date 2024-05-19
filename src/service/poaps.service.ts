import { IOwner } from "@/common/interfaces";
import { Event, Poap } from "../model";
import dotenv from "dotenv";
import path from "path";
import * as eventService from "./events.service";
import { mintToken } from "../util/smartContracts/poapContractInteractions";

dotenv.config({ path: path.join(__dirname, "../.env") });

const {
  HH_ACCOUNT_0,
  HH_ACCOUNT_1,
} = process.env;

export const getAllPoaps = async (offset: number, limit: number) => {
  try {
    const poaps = await Poap.findAll({ offset, limit });
    return poaps;
  } catch (error) {
    console.log("Error: ", error);
  }
};

// Check if it should be here or in event's service
export const getAllPoapsByEvent = async (eventId: string) => {
  try {
    const poaps = await Poap.findAll({ where: { eventId } });
    return poaps;
  } catch (error) {
    console.log("Error: ", error);
  }
};

// Check if it should be here or in owner's service
export const getAllPoapsByOwnersAddress = async (ownerId: string) => {
  try {
    const poaps = await Poap.findAll({ where: { ownerId } });
    return poaps;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getPoapByAddress = async (address: string) => {
  try {
    const poap = await Poap.findOne({ where: { address } });
    return poap;
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

export const mintPoap = async (owner: IOwner, eventId: string) => {
  const uuid = crypto.randomUUID();
  const mintableAmount = await eventService.getEventMintableAmount(eventId);
  console.log("🚀 ~ mintPoap ~ mintableAmount:", mintableAmount);
  const mintInfo = {
    ownerId: owner.uuid,
    eventId,
    uuid,
    poap: eventId,
    instance: mintableAmount?.mintedPoaps + 1,
  };
  console.log("🚀 ~ mintPoap ~ mintInfo:", mintInfo);
  try {
    const mintedTokenToBlockchain = await mintToken(333, HH_ACCOUNT_1 as string, "Primer evento de prueba");
    console.log("🚀 ~ mintPoap ~ mintedTokenToBlockchain:", mintedTokenToBlockchain)
    if (
      mintableAmount &&
      mintableAmount.poapsToBeMinted - mintableAmount.mintedPoaps > 0
    ) {
      const poap = await Poap.create(mintInfo);
      console.log("🚀 ~ mintPoap ~ poap:", poap);
      const updatedMintedAmount = await Event.update(
        { mintedPoaps: mintableAmount.mintedPoaps + 1 },
        { where: { eventId } }
      );
      console.log("🚀 ~ mintPoap ~ updatedMintedAmount:", updatedMintedAmount)
      return poap;
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};
