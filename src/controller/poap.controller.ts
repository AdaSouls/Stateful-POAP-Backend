const config = require("../config/config");
const { ethers } = require("ethers");
// const httpStatus = require("http-status");
import * as httpStatus from "http-status";
import catchAsync from "../util/catchAsyncTS";
const { codeService, errorService, assetService } = require("../service");

/*
|--------------------------------------------------------------------------
| Poap assets.
|--------------------------------------------------------------------------
*/

/**
 * Get all Poap records.
 */
const getAllPoaps = catchAsync(async (req, res) => {});

/**
 * Get all Poap records by owner's address.
 */
const getAllPoapsByAddress = catchAsync(async (req, res) => {});

/**
 * Get all Poap records by event.
 */
const getAllPoapsByEvent = catchAsync(async (req, res) => {});

/**
 * Get Poap's state.
 */
const getPoapsState = catchAsync(async (req, res) => {});

/*
|--------------------------------------------------------------------------
| Exports.
|--------------------------------------------------------------------------
*/

export { getAllPoaps, getAllPoapsByAddress, getAllPoapsByEvent, getPoapsState };
