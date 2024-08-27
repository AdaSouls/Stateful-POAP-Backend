import catchAsync from "../util/catchAsync";
import * as issuerService from "../service/issuers.service";
import pagination from "../util/pagination";
import { ethers } from "ethers";

/*
|--------------------------------------------------------------------------
| Issuers.
|--------------------------------------------------------------------------
*/

/**
 * Get all Issuers.
 */
export const getAllIssuers = catchAsync(async (req, res) => {
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
    const issuers = await issuerService.getAllIssuers(
      paginationOffset,
      paginationLimit
    );
    res.send(issuers);
  } catch (error) {
    console.log("Error: ", error);
  }
});

/**
 * Get all Issuers.
 */
export const getAllIssuersByAddress = catchAsync(async (req, res) => {
  const { page, limit, address } = req.query;
  let paginationOffset, paginationLimit;
  if (typeof address !== "string" && !ethers.isAddress(address)) {
    return res.status(400).send({ message: "Address must be a valid Ethereum address" });
  }
  if (typeof page === "string" && typeof limit === "string") {
    ({ paginationOffset, paginationLimit } = pagination(
      parseInt(page),
      parseInt(limit)
    ));
  } else {
    ({ paginationOffset, paginationLimit } = pagination());
  }
  try {
    const issuers = await issuerService.getAllIssuersByAddress(
      paginationOffset,
      paginationLimit,
      address
    );
    res.send(issuers);
  } catch (error) {
    console.log("Error: ", error);
  }
});

/**
 * Get Issuer by address.
 */
// export const getIssuerByAddress = catchAsync(async (req, res) => {
//   const { address } = req.query;
//   if (typeof address !== "string") {
//     return res.status(400).send({ message: "Address must be a string" });
//   }
//   try {
//     const issuer = await issuerService.getIssuerByAddress(address);
//     res.send(issuer);
//   } catch (error) {
//     console.log("Error: ", error);
//   }
// });

/**
 * Get Issuer by email.
 */
export const getIssuerByEmail = catchAsync(async (req, res) => {
  const { email } = req.query;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (typeof email === "string" && !emailRegex.test(email)) {
    return res.status(400).send({ message: "Email must be valid" });
  }
  if (typeof email !== "string") {
    return res.status(400).send({ message: "Email must be a string" });
  }
  try {
    const issuer = await issuerService.getIssuerByEmail(email);
    res.send(issuer);
  } catch (error) {
    console.log("Error: ", error);
  }
});

/**
 * Get Issuer by primary key (UUID).
 */
export const getIssuerByPK = catchAsync(async (req, res) => {
  const { issuerUuid } = req.query;
  if (typeof issuerUuid !== "string") {
    return res.status(400).send({ message: "Uuid must be a string" });
  }
  try {
    const issuer = await issuerService.getIssuerByPK(issuerUuid);
    res.send(issuer);
  } catch (error) {
    console.log("Error: ", error);
  }
});

/**
 * Create new Issuer
 */
export const createNewIssuer = catchAsync(async (req, res) => {
  const { address, email, organization, name } = req.body;
  if (!address && !email && !organization && !name) {
    return res
      .status(400)
      .send({ message: "Address, email, name and organization are required" });
  }
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (typeof email === "string" && !emailRegex.test(email)) {
    return res.status(400).send({ message: "Email must be valid" });
  }
  if (!ethers.isAddress(address)) {
    return res.status(400).send({ message: "Invalid address" });
  }

  try {
    const issuer = await issuerService.createNewIssuer(
      address,
      email,
      organization,
      name
    );
    console.log("🚀 ~ createNewIssuer ~ issuer:", issuer);
    res.status(201).send(issuer);
  } catch (error) {
    console.log("Error: ", error);
  }
});

/**
 * Update Issuer's address or email.
 *
 * Should it be able to change the organization or name?
 */
export const updateIssuer = catchAsync(async (req, res) => {
  const { address, email, issuerUuid } = req.body;
  console.log("🚀 ~ updateIssuer ~ issuerUuid:", issuerUuid)
  console.log("🚀 ~ updateIssuer ~ email:", email)
  const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!issuerUuid)
    return res.status(400).send({ message: "Issuer's UUID is required" });
  console.log("🚀 ~ updateIssuer ~ emailRegex.test(email):", emailRegex.test(email))
  try {
    const foundIssuer = await issuerService.getIssuerByPK(issuerUuid);
    if (!foundIssuer) {
      return res.status(404).send({ message: "Issuer could not be found" });
    }
    if (email && emailRegex.test(email)) {
      const issuer = await issuerService.updateIssuersEmail(issuerUuid, email);
      if (issuer && issuer[0] === 1) {
        console.log("🚀 ~ updateIssuer ~ issuer[0] === 1:", issuer[0])
        return res.status(200).send({ message: "Issuer's email updated successfully" });
      } 
      if (issuer && issuer[0] !== 1) {
        console.log("🚀 ~ updateIssuer ~ issuer[0] !== 1:", issuer[0])
        return res.status(400).send({ message: "Issuer's email not updated" });
      }
    } else {
      return res.status(400).send({ message: "Invalid email/address" });
    }
  } catch (error) {
    console.log("Error: ", error);
  }
});
