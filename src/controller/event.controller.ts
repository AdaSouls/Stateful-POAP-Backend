import catchAsync from "../util/catchAsync";
import * as eventService from "@/service/events.service";

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
  const { address } = req.body;
  try {
    const events = await eventService.getEventByAddress(address);
    res.send(events)
  } catch (error) {
    console.log("Error: ", error);
  }
});

