import catchAsync from "../util/catchAsync";
import * as issuerService from "../service/issuers.service";
import pagination from "../util/pagination";

/*
|--------------------------------------------------------------------------
| Issuers.
|--------------------------------------------------------------------------
*/

/**
 * Get all Issuers.
 */
export const getAllIssuers = catchAsync(async (req, res) => {
  const {page, limit} = req.query;
  let paginationOffset, paginationLimit;
  if (typeof page === "string" && typeof limit === "string") {
    ({paginationOffset, paginationLimit} = pagination(parseInt(page), parseInt(limit)));
  } else { ({paginationOffset, paginationLimit} = pagination())} 
  try {
    const issuers = await issuerService.getAllIssuers(paginationOffset, paginationLimit);
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
  const { uuid } = req.query;
  if (typeof uuid !== "string") {
    return res.status(400).send({ message: "Uuid must be a string" });
  }
  try {
    const issuer = await issuerService.getIssuerByPK(uuid);
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
    return res.status(400).send({ message: "Address, email, name and organization are required" });
  } else {
    try {
      const issuer = issuerService.createNewIssuer(address, email, organization, name);
      console.log("🚀 ~ createNewIssuer ~ issuer:", issuer)
      res.send(issuer);
      return issuer;
    } catch (error) {
      console.log("Error: ", error);
    }
  }
});

/**
 * Update Issuer's address or email.
 * 
 * Should it be able to change the organization or name?
 */
export const updateIssuer = catchAsync(async (req, res) => {
  const { address, email, uuid } = req.body;
  const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if(!uuid) return res.status(400).send({ message: "Issuer's UUID is required" });
  try {
    if (address) {
      const issuer = await issuerService.updateIssuersAddress(uuid, address)
      if (issuer && issuer[0] === 1) {return res.send({ message: "Issuer's address updated successfully" }) }
      return res.status(400).send({ message: "Issuer's address not updated" });
    }
    if (emailRegex.test(email)) {
      const issuer = await issuerService.updateIssuersEmail(uuid, email)
      if (issuer && issuer[0] === 1) {return res.send({ message: "Issuer's email updated successfully" }) }
      return res.status(400).send({ message: "Issuer's email not updated" });
    } else {
      res.status(400).send({ message: "Invalid email/address" });
    }
  } catch (error) {
    console.log("Error: ", error);
  }
});
