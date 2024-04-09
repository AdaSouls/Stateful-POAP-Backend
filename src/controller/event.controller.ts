import catchAsync from "../util/catchAsync";
import * as eventService from "../service/events.service";
import { IEvent } from "@/common/interfaces";

/*
|--------------------------------------------------------------------------
| Poap assets.
|--------------------------------------------------------------------------
*/



/**
 * Get all Event records.
 */
export const getAllEvents = catchAsync(async (req, res) => {
  try {
    const events = await eventService.getAllEvents();
    res.send(events)
  } catch (error) {
    console.log("Error: ", error);
  }
});

/**
 * Get all Event records by owner's address.
 */
export const getAllEventsByOwnersAddress = catchAsync(async (req, res) => {
  const { address } = req.params;
  try {
    const events = await eventService.getEventByAddress(address);
    res.send(events)
  } catch (error) {
    console.log("Error: ", error);
  }
});


/**
 * Get all Event records by owner's address.
 */
export const createEvent = catchAsync(async (req, res) => {
  const event: IEvent = {...req.body}
  console.log("🚀 ~ createEvent ~ event:", event)
  if (!event) {
    return res.status(400).send({ message: "Event cannot be empty or with empty information" });
  }
  try {
    const eventCreated = await eventService.createEvent(event);
    res.send(eventCreated)
  } catch (error) {
    console.log("Error: ", error);
  }
});

