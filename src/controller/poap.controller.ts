import catchAsync from "../util/catchAsync";
import * as poapService from "../service/poaps.service";
import pagination from "../util/pagination";

/*
|--------------------------------------------------------------------------
| Poap assets.
|--------------------------------------------------------------------------
*/

/**
 * Get all Poap records.
 */
export const getAllPoaps = catchAsync(async (req, res) => {
  const {page, limit} = req.query;
  let paginationOffset, paginationLimit;
  if (typeof page === "string" && typeof limit === "string") {
    ({paginationOffset, paginationLimit} = pagination(parseInt(page), parseInt(limit)));
  } else { ({paginationOffset, paginationLimit} = pagination())} 
  try {
    const poaps = await poapService.getAllPoaps(paginationOffset, paginationLimit);
    res.send(poaps);
  } catch (error) {
    console.log("Error: ", error);
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
    const poaps = await poapService.getPoapByAddress(address);
    res.send(poaps);
  } catch (error) {
    console.log("Error: ", error);
  }
});

/**
 * Get all Poap records by event.
 */
export const getAllPoapsByEvent = catchAsync(async (req, res) => {
  const { eventId } = req.query;
  if (typeof eventId !== "string") {
    return res.status(400).send({ message: "EventId must be a string" });
  }
  try {
    const poaps = await poapService.getAllPoapsByEvent(eventId);
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
 * Get Poap's state.
 */
export const mintPoap = catchAsync(async (req, res) => {
  const { owner, eventId } = req.body;
  try {
    const poap = await poapService.mintPoap( owner, eventId );
    res.send(poap);
  } catch (error) {
    console.log("Error: ", error);
  }

});
