import catchAsync from "../util/catchAsync";
import * as eventService from "../service/events.service";
import * as ownerService from "../service/owners.service";
import { IEvent } from "@/common/interfaces";
import pagination from "@/util/pagination";

/*
|--------------------------------------------------------------------------
| Poap assets.
|--------------------------------------------------------------------------
*/



/**
 * Get all Event records.
 */
export const getAllEvents = catchAsync(async (req, res) => {
  const {page, limit} = req.query;
  let paginationOffset, paginationLimit;
  if (typeof page === "string" && typeof limit === "string") {
    ({paginationOffset, paginationLimit} = pagination(parseInt(page), parseInt(limit)));
  } else { ({paginationOffset, paginationLimit} = pagination())} 
  try {
    const events = await eventService.getAllEvents(paginationOffset, paginationLimit);
    res.send(events)
  } catch (error) {
    console.log("Error: ", error);
  }
});

/**
 * Get all Event records by owner's address.
 */
export const getAllEventsByOwnersAddress = catchAsync(async (req, res) => {
  const { address } = req.query;
  if (typeof address !== "string") {
    return res.status(400).send({ message: "Address must be a string" });
  }
  try {
    const events = await eventService.getEventByAddress(address);
    res.send(events)
  } catch (error) {
    console.log("Error: ", error);
  }
});


/**
 * Create Event.
 */
export const createEvent = catchAsync(async (req, res) => {
  const info = {...req.body}
  const event: IEvent = info.event
  const owner = info.owner
  console.log("🚀 ~ createEvent ~ info:", info)
  if (!event) {
    return res.status(400).send({ message: "Event cannot be empty or with empty information" });
  }
  try {
    let ownerId
    if (!owner.uuid) {
      const ownerCreated = await ownerService.createNewOwner(owner.address, owner.email);
      // ownerId = ownerCreated.uuid
    }
    const eventCreated = await eventService.createEvent(event);
    res.send(eventCreated)
  } catch (error) {
    console.log("Error: ", error);
  }
});

