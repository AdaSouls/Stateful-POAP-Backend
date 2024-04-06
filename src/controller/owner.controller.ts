import catchAsync from "../util/catchAsync";
import * as ownerService from "../service/owners.service";

/*
|--------------------------------------------------------------------------
| Owners.
|--------------------------------------------------------------------------
*/

/**
 * Get all Owners.
 */
export const getAllOwners = catchAsync(async (req, res) => {
  try {
    const owners = await ownerService.getAllOwners();
    res.send(owners);
  } catch (error) {
    console.log("Error: ", error);
  }
});

/**
 * Get Owner by address.
 */
export const getOwnerByAddress = catchAsync(async (req, res) => {
  const { address } = req.params;
  try {
    const owner = await ownerService.getOwnerByAddress(address);
    res.send(owner);
  } catch (error) {
    console.log("Error: ", error);
  }
});

/**
 * Get Owner by primary key (UUID).
 */
export const getOwnerByPK = catchAsync(async (req, res) => {
  const { uuid } = req.params;
  try {
    const owner = await ownerService.getOwnerByPK(uuid);
    res.send(owner);
  } catch (error) {
    console.log("Error: ", error);
  }
});

/**
 * Create new Owner
 */
export const createNewOwner = catchAsync(async (req, res) => {
  const { address, email } = req.body;
  try {
    const owner = ownerService.createNewOwner(address, email);
    res.send(owner);
  } catch (error) {
    console.log("Error: ", error);
  }
});

/*
|--------------------------------------------------------------------------
| Exports.
|--------------------------------------------------------------------------
*/
