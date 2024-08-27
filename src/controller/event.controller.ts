import catchAsync from "../util/catchAsync";
import * as eventService from "../service/events.service";
import * as ownerService from "../service/owners.service";
import * as issuerService from "../service/issuers.service";
import { IEvent, IIssuer, IOwner } from "../common/interfaces";
import pagination from "../util/pagination";
import Owner from "../model/Owner";
import { UUID } from "crypto";
import { Approved, EventType, PoapType } from "../common/enums";
import contractIdentifier from "../util/contractIdentifier";
import isEnumValue from "../util/isEnumValue";

/*
|--------------------------------------------------------------------------
| Event assets.
|--------------------------------------------------------------------------
*/

/**
 * Get all Event records.
 */
export const getAllEvents = catchAsync(async (req, res) => {
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
    const events = await eventService.getAllEvents(
      paginationOffset,
      paginationLimit
    );
    res.status(200).send(events);
  } catch (error) {
    console.log("Error: ", error);
    res.status(404).send({ message: "Events could not be found" });
  }
});

/**
 * Get all Event records by issuer's address.
 */
export const getAllEventsByIssuersAddress = catchAsync(async (req, res) => {
  const { address } = req.query;
  if (typeof address !== "string") {
    return res.status(400).send({ message: "Address must be a string" });
  }
  try {
    const events = await eventService.getEventByAddress(address);
    console.log("🚀 ~ getAllEventsByIssuersAddress ~ events:", events);
    if (!events) {
      return res.status(404).send({ message: "Events could not be found" });
    }
    return res.status(200).send(events);
  } catch (error) {
    console.log("Error: ", error);
    res.status(404).send({ message: "Events could not be found" });
  }
});

/**
 * Get all Event records by primary key.
 */
export const getEventByPK = catchAsync(async (req, res) => {
  const { eventUuid } = req.query;
  if (typeof eventUuid !== "string") {
    return res.status(400).send({ message: "EventId must be a string" });
  }
  try {
    const events = await eventService.getEventByPK(eventUuid);
    if (!events) {
      return res.status(404).send({ message: "Event could not be found" });
    }
    return res.status(200).send(events);
  } catch (error) {
    console.log("Error: ", error);
    res.status(404).send({ message: "Event could not be found" });
  }
});

/**
 * Get all Event records by approval status.
 */
export const getAllByApprovalStatus = catchAsync(async (req, res) => {
  const { approved } = req.query;
  if (typeof approved !== "string") {
    return res
      .status(400)
      .send({ message: "Approval status must be a string" });
  }
  // If approved is not an option of Approved enum, return 400
  if (!isEnumValue(Approved, approved)) {
    return res.status(400).send({
      message:
        "Parameter approved must be an option of 'Approved', 'Rejected' or 'Pending'",
    });
  }
  try {
    const events = await eventService.getAllByApprovalStatus(approved);
    res.status(200).send(events);
  } catch (error) {
    console.log("Error: ", error);
    res.status(404).send({ message: "Event could not be found" });
  }
});

/**
 * Create Event.
 */
export const createEvent = catchAsync(async (req, res) => {
  const info = { ...req.body };
  const event: IEvent = { ...info.event };
  const issuerUuid: UUID = info.issuerUuid;
  if (!event) {
    return res
      .status(400)
      .send({ message: "Event cannot be empty or with empty information" });
  }
  if (!issuerUuid) {
    return res
      .status(400)
      .send({ message: "Issuer cannot be empty or with empty information" });
  }
  if (event.eventType && !isEnumValue(EventType, event.eventType)) {
    return res.status(400).send({ message: "Event type is not valid" });
  }
  if (!isEnumValue(PoapType, event.poapType)) {
    return res.status(400).send({ message: "Poap type is not valid" });
  }
  if (Approved.Approved === event.approved) {
    return res
      .status(400)
      .send({ message: "Event has to be approved by Admin" });
  }
  try {
    if (issuerUuid) {
      console.log("Adentro de issuerUuid");
      const issuer = await issuerService.getIssuerByPK(issuerUuid);
      console.log("🚀 ~ createEvent ~ issuer:", issuer);
      if (!issuer) {
        return res.status(404).send({ message: "Issuer could not be found" });
      }
      const eventCreated = await eventService.createEvent(event, issuerUuid);
      if (!eventCreated) {
        return res.status(400).send({ message: "Event could not be created" });
      }
      res.status(201).send(eventCreated);
    }
  } catch (error) {
    console.log("Error: ", error);
    res.status(400).send({ message: "Event could not be created" });
  }
});

/**
 * Create Event and Approve.
 */
export const createAndApproveMock = catchAsync(async (req, res) => {
  const info = { ...req.body };
  const event: IEvent = { ...info.event };
  const issuerUuid: UUID = info.issuerUuid;
  if (!event) {
    return res
      .status(400)
      .send({ message: "Event cannot be empty or with empty information" });
  }
  if (!issuerUuid) {
    return res
      .status(400)
      .send({ message: "Issuer cannot be empty or with empty information" });
  }
  if (event.eventType && !isEnumValue(EventType, event.eventType)) {
    return res.status(400).send({ message: "Event type is not valid" });
  }
  if (!isEnumValue(PoapType, event.poapType)) {
    return res.status(400).send({ message: "Poap type is not valid" });
  }
  if (Approved.Approved === event.approved) {
    return res
      .status(400)
      .send({ message: "Event has to be approved by Admin" });
  }
  try {
    if (issuerUuid) {
      // console.log("Adentro de issuerUuid");
      const issuer = await issuerService.getIssuerByPK(issuerUuid);
      // console.log("🚀 ~ createEvent ~ issuer:", issuer);
      if (!issuer) {
        return res.status(404).send({ message: "Issuer could not be found" });
      }
      const eventCreated = await eventService.createEvent(event, issuerUuid);
      console.log("🚀 ~ createAndApproveMock ~ eventCreated:", eventCreated)
      if (!eventCreated) {
        return res.status(400).send({ message: "Event could not be created" });
      }
      const isApproved = await eventService.approveOrReject(
        eventCreated.dataValues.eventUuid,
        Approved.Approved
      );
      if (!isApproved) {
        return res.status(400).send({ message: "Event could not be approved" });
      }
      return res.status(201).send(eventCreated);
    }
  } catch (error) {
    console.log("Error: ", error);
    res.status(400).send({ message: "Event could not be created" });
  }
});

/**
 * Update event status to approved or rejected.
 */
export const approveOrReject = catchAsync(async (req, res) => {
  const { approval, eventIdInContract, issuerAddress, contractAddress } =
    req.body;
  const contractType = contractIdentifier(contractAddress as string);
  if (approval !== Approved.Approved && approval !== Approved.Rejected) {
    return res
      .status(400)
      .send({ message: "Approval must be an option of Approved or Rejected" });
  }
  try {
    const isEventApproved = await eventService.getApprovalStatus(
      eventIdInContract,
      issuerAddress,
      contractType
    );
    if (
      typeof isEventApproved?.dataValues.approved === "string" &&
      isEventApproved?.dataValues.approved !== Approved.Pending
    ) {
      return res.status(400).send({
        message: "Event has already been rejected and cannot be approved",
      });
    }
    const events = await eventService.approveOrReject(
      isEventApproved?.dataValues.eventUuid,
      approval
    );
    if (events === undefined) {
      return res
        .status(400)
        .send({ message: "EventID could not be created in Blockchain" });
    }
    if (events === null) {
      return res
        .status(404)
        .send({ message: "Event could not be approved or rejected" });
    }
    return res.status(200).send(events);
  } catch (error) {
    console.log("Error: ", error);
    res.status(404).send({ message: "Event could not be found" });
  }
});
