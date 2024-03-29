const config = require("../config/config");
const { ethers } = require("ethers");
import * as httpStatus from "http-status";
import catchAsync from "../util/catchAsync";
const { codeService, errorService, assetService } = require("../service");
import * as poapService from "@/service/poaps.service";

/*
|--------------------------------------------------------------------------
| Poap assets.
|--------------------------------------------------------------------------
*/

/**
 * Get all Poap records.
 */
const getAllPoaps = catchAsync(async (req, res) => {
  try {
    const poaps = await poapService.getAllPoaps();
    res.send(poaps);
  } catch (error) {
    console.log("Error: ", error);
  }
});

/**
 * Get all Poap records by owner's address.
 */
const getAllPoapsByOwnersAddress = catchAsync(async (req, res) => {
  const { address } = req.body;
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
const getAllPoapsByEvent = catchAsync(async (req, res) => {
  const { eventId } = req.body;
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
const getPoapsState = catchAsync(async (req, res) => {});

/*
|--------------------------------------------------------------------------
| Exports.
|--------------------------------------------------------------------------
*/

export { getAllPoaps, getAllPoapsByOwnersAddress, getAllPoapsByEvent, getPoapsState };
