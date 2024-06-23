import catchAsync from "../util/catchAsync";
import * as eventService from "../service/events.service";
import * as ownerService from "../service/owners.service";
import * as issuerService from "../service/issuers.service";
import { IEvent, IIssuer, IOwner } from "../common/interfaces";
import pagination from "../util/pagination";
import Owner from "../model/Owner";
import { UUID } from "crypto";

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
    res.send(events);
  } catch (error) {
    console.log("Error: ", error);
    res.status(400).send({ message: "Events could not be found" });
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
    res.send(events);
  } catch (error) {
    console.log("Error: ", error);
    res.status(400).send({ message: "Events could not be found" });
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
    res.send(events);
  } catch (error) {
    console.log("Error: ", error);
    res.status(400).send({ message: "Event could not be found" });
  }
});

/**
 * Create Event.
 */
export const createEvent = catchAsync(async (req, res) => {
  const info = { ...req.body };
  const event: IEvent = { ...info.event };
  // const owner: IOwner = info.owner;
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
  // let returnedOwner;
  try {
    if (issuerUuid) {
      console.log("Adentro de issuerUuid")
      const eventCreated = await eventService.createEvent(event, issuerUuid);
      if (!eventCreated) {
        return res
          .status(400)
          .send({ message: "Event could not be created" });
      }
      res.status(201).send(eventCreated);
    }
  } catch (error) {
    console.log("Error: ", error);
    res
      .status(400)
      .send({ message: "Event could not be created" });
  }
});
