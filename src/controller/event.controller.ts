const config = require("../config/config");
const { ethers } = require("ethers");
import * as httpStatus from "http-status";
import catchAsync from "../util/catchAsync";
const { codeService, errorService, assetService } = require("../service");
import * as eventService from "@/service/events.service";

/*
|--------------------------------------------------------------------------
| Poap assets.
|--------------------------------------------------------------------------
*/

/**
 * Get all Event records.
 */
const getAllEvents = catchAsync(async (req, res) => {
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
const getAllEventsByOwnersAddress = catchAsync(async (req, res) => {
  const { address } = req.body;
  try {
    const events = await eventService.getEventByAddress(address);
    res.send(events)
  } catch (error) {
    console.log("Error: ", error);
  }
});

/*
|--------------------------------------------------------------------------
| Exports.
|--------------------------------------------------------------------------
*/

export { getAllEvents, getAllEventsByOwnersAddress };
