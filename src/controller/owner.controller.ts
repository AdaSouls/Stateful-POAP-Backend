import catchAsync from "../util/catchAsync";
import * as ownerService from "../service/owners.service";
import pagination from "../util/pagination";

/*
|--------------------------------------------------------------------------
| Owners.
|--------------------------------------------------------------------------
*/

/**
 * Get all Owners.
 */
export const getAllOwners = catchAsync(async (req, res) => {
  const {page, limit} = req.query;
  let paginationOffset, paginationLimit;
  if (typeof page === "string" && typeof limit === "string") {
    ({paginationOffset, paginationLimit} = pagination(parseInt(page), parseInt(limit)));
  } else { ({paginationOffset, paginationLimit} = pagination())} 
  try {
    const owners = await ownerService.getAllOwners(paginationOffset, paginationLimit);
    res.send(owners);
  } catch (error) {
    console.log("Error: ", error);
  }
});

/**
 * Get Owner by address.
 */
export const getOwnerByAddress = catchAsync(async (req, res) => {
  const { address } = req.query;
  if (typeof address !== "string") {
    return res.status(400).send({ message: "Address must be a string" });
  }
  try {
    const owner = await ownerService.getOwnerByAddress(address);
    res.send(owner);
  } catch (error) {
    console.log("Error: ", error);
  }
});

/**
 * Get Owner by email.
 */
export const getOwnerByEmail = catchAsync(async (req, res) => {
  const { email } = req.query;
  if (typeof email !== "string") {
    return res.status(400).send({ message: "Email must be a string" });
  }
  try {
    const owner = await ownerService.getOwnerByEmail(email);
    res.send(owner);
  } catch (error) {
    console.log("Error: ", error);
  }
});

/**
 * Get Owner by primary key (UUID).
 */
export const getOwnerByPK = catchAsync(async (req, res) => {
  const { uuid } = req.query;
  if (typeof uuid !== "string") {
    return res.status(400).send({ message: "Uuid must be a string" });
  }
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
    console.log("🚀 ~ createNewOwner ~ owner:", owner)
    res.send(owner);
    return owner;
  } catch (error) {
    console.log("Error: ", error);
  }
});

/**
 * Update Owner's address or email.
 */
export const updateOwner = catchAsync(async (req, res) => {
  const { address, email, uuid } = req.body;
  const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if(!uuid) return res.status(400).send({ message: "Owner's UUID is required" });
  try {
    if (address) {
      const owner = await ownerService.updateOwnersAddress(uuid, address)
      if (owner && owner[0] === 1) {return res.send({ message: "Owner's address updated successfully" }) }
      return res.status(400).send({ message: "Owner's address not updated" });
    }
    if (emailRegex.test(email)) {
      const owner = await ownerService.updateOwnersEmail(uuid, email)
      if (owner && owner[0] === 1) {return res.send({ message: "Owner's email updated successfully" }) }
      return res.status(400).send({ message: "Owner's email not updated" });
    } else {
      res.status(400).send({ message: "Invalid email/address" });
    }
  } catch (error) {
    console.log("Error: ", error);
  }
});

