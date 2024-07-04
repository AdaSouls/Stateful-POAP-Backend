import catchAsync from "../util/catchAsync";
import * as poapService from "../service/poaps.service";
import pagination from "../util/pagination";
import { Owner } from "../model";
import { UUID } from "crypto";

/*
|--------------------------------------------------------------------------
| Poap assets.
|--------------------------------------------------------------------------
*/

/**
 * Get all Poap records.
 */
export const getAllPoaps = catchAsync(async (req, res) => {
  const { page, limit } = req.query;
  let paginationOffset, paginationLimit;
  if (typeof page === "string" && typeof limit === "string") {
    ({ paginationOffset, paginationLimit } = pagination(
      parseInt(page),
      parseInt(limit)
    ));
  } else {
    ({ paginationOffset, paginationLimit } = pagination());
  }
  try {
    const poaps = await poapService.getAllPoaps(
      paginationOffset,
      paginationLimit
    );
    res.send(poaps);
  } catch (error) {
    console.log("Error: ", error);
    res.status(400).send({ message: "Poaps could not be found" });
  }
});

/**
 * Get all Poap records by owner's address.
 */
export const getAllPoapsByOwnersAddress = catchAsync(async (req, res) => {
  const { address } = req.query;
  if (typeof address !== "string") {
    return res.status(400).send({ message: "Address must be a string" });
  }
  try {
    const poaps = await poapService.getAllPoapsByOwnersAddress(address);
    res.send(poaps);
  } catch (error) {
    console.log("Error: ", error);
  }
});

/**
 * Get Poap records by primary key.
 */
export const getPoapByPK = catchAsync(async (req, res) => {
  const { poapUuid } = req.query;
  if (typeof poapUuid !== "string") {
    return res.status(400).send({ message: "PoapUuid must be a string" });
  }
  try {
    const poaps = await poapService.getPoapByPK(poapUuid);
    res.send(poaps);
  } catch (error) {
    console.log("Error: ", error);
  }
});

/**
 * Get all Poap records by event.
 */
export const getAllPoapsByEvent = catchAsync(async (req, res) => {
  const { eventUuid } = req.query;
  if (typeof eventUuid !== "string") {
    return res.status(400).send({ message: "EventId must be a string" });
  }
  try {
    const poaps = await poapService.getAllPoapsByEvent(eventUuid);
    res.send(poaps);
  } catch (error) {
    console.log("Error: ", error);
  }
});

/**
 * Get Poap's state.
 */
export const getPoapsState = catchAsync(async (req, res) => {});

/**
 * Mint a Poap.
 */
export const mintPoap = catchAsync(async (req, res) => {
  const { ownerUuid, eventUuid } = req.body;
  // const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  // if (!uuidRegex.test(ownerUuid) || uuidRegex.test(eventUuid)) {
  //   res.status(400).send({message: "Invalid UUID"})
  // }
  if (!ownerUuid) {
    res.status(400).send({message: "Owner's information is needed"})
  }
  try {
    const owner = await Owner.findByPk(ownerUuid);
    if (!owner) {
      res.status(400).send({message: "Owner not found"})
    }
    const poap = await poapService.mintPoap(ownerUuid, eventUuid);
    if (!poap) {
      res.status(400).send({message: "Poap couldn't be minted"})
    }
    if (typeof poap === "string") {
      res.status(400).send({message: poap})
    }
    res.status(201).send(poap);
  } catch (error) {
    console.log("Error: ", error);
    res.status(400).send({message: "Poap couldn't be minted"})
  }
});

/**
 * Update Poap's event relation.
 */
export const addEventToPoap = catchAsync(async (req, res) => {
  const { poapUuid, eventUuid } = req.body
  try {
    const updatedPoap = await poapService.addEventToPoap(poapUuid, eventUuid);
    console.log("🚀 ~ addEventToPoap ~ updatedPoap:", updatedPoap)
    res.send(updatedPoap);
  } catch (error) {
    console.log("Error: ", error);
  }
})