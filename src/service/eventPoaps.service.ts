import { Event, Poap, EventPoap } from "../model";
import dotenv from "dotenv";
import path from "path";
import * as eventService from "./events.service";
import { mintToken } from "../util/smartContracts/poapContractInteractions";
import { encodeStatus } from "../util/smartContracts/statusEncoder";
import { sequelize } from "../database/connection";
import { QueryTypes } from "sequelize";
import { UUID } from "crypto";

export const getAllEventPoaps = async (offset: number, limit: number) => {
  try {
    const eventPoaps = await EventPoap.findAll({
      offset,
      limit,
    });
    return eventPoaps;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const addRelation = async (poapUuid: UUID, eventUuid: UUID) => {
  try {
    const eventPoaps = await EventPoap.create({ poapUuid, eventUuid });
    return eventPoaps;
  } catch (error) {
    console.log("Error: ", error);
  }
};
