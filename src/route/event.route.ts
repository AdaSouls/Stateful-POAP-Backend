import express, { Router } from "express"
import * as eventController from "../controller/event.controller"

const eventRouter: Router = express.Router()

/**
 * @swagger
 * /event/getAll:
 *   get:
 *     tags: 
 *       - Event
 *     summary: Get all events
 *     description: Get all events
 *     responses:
 *       '200':
 *         description: A list of events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       '500':
 *         description: Internal server error
 */
eventRouter.get("/getAll", eventController.getAllEvents)

/**
 * @swagger
 * /event/getAllByAddress:
 *   get:
 *     tags: 
 *       - Event
 *     summary: Get all events by issuer address
 *     description: Get all events by issuer address
 *     parameters:
 *       - in: query
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: Issuer address
 *     responses:
 *       '200':
 *         description: A list of events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       '500':
 *         description: Internal server error
 */
eventRouter.get("/getAllByAddress", eventController.getAllEventsByIssuersAddress)

/**
 * @swagger
 * /event/getByPK:
 *   get:
 *     tags: 
 *       - Event
 *     summary: Get event by primary key
 *     description: Get event by primary key
 *     parameters:
 *       - in: query
 *         name: eventUuid
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Event primary key
 *     responses:
 *       '200':
 *         description: An event
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       '404':
 *         description: Event not found
 *       '500':
 *         description: Internal server error
 */
eventRouter.get("/getByPK", eventController.getEventByPK)

/**
 * @swagger
 * /event/getAllByApprovalStatus:
 *   get:
 *     tags: 
 *       - Event
 *     summary: Get event by approval status
 *     description: Get event by approval status
 *     parameters:
 *       - in: query
 *         name: approved
 *         required: true
 *         schema:
 *           type: string
 *         description: Event approval status
 *     responses:
 *       '200':
 *         description: An event
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       '404':
 *         description: Event not found
 *       '500':
 *         description: Internal server error
 */
eventRouter.get("/getAllByApprovalStatus", eventController.getAllByApprovalStatus)

/**
 * @swagger
 * /event/createEvent:
 *   post:
 *     tags: 
 *       - Event
 *     summary: Create new event
 *     description: Create new event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Event title"
 *               description:
 *                 type: string
 *                 example: "Event description"
 *               city:
 *                 type: string
 *                 example: "Buenos Aires"
 *               country:
 *                 type: string
 *                 example: "Argentina"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2022-01-01"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2022-01-02"
 *               expiryDate:
 *                 type: string
 *                 format: date
 *                 example: "2022-01-03"
 *               year:
 *                 type: integer
 *                 example: 2022
 *               eventUrl:
 *                 type: string
 *                 example: "https: *www.example.com"
 *               virtualEvent:
 *                 type: boolean
 *                 example: true
 *               image:
 *                 type: string
 *                 example: "https: *www.example.com/image.jpg"
 *               secretCode:
 *                 type: string
 *                 example: "secret"
 *               eventTemplateId:
 *                 type: string
 *                 example: "template"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: mail@example.com
 *               requestedCodes:
 *                 type: integer
 *                 example: 100
 *               privateEvent:
 *                 type: boolean
 *                 example: false
 *               purpose:
 *                 type: string
 *                 example: "Event purpose"
 *               platform:
 *                 type: string
 *                 example: "Event platform"
 *               eventType:
 *                 type: string
 *                 enum:
 *                   - "Virtual"
 *                   - "In-Person"
 *                   - "Both"
 *                   - "Unknown"
 *                 example: "Virtual"
 *               amountOfAttendees:
 *                 type: integer
 *                 example: 100
 *               poapType:
 *                 type: string
 *                 enum:
 *                   - "Poap"
 *                   - "Soulbound"
 *                   - "Consensual"
 *                 example: "Poap"
 *               poapsToBeMinted:
 *                 type: integer
 *                 example: 100
 *               mintedPoaps:
 *                 type: integer
 *                 example: 50
 *               issuerUuid:
 *                 type: string
 *                 format: uuid
 *               example: "123e4567-e89b-12d3-a456-426614174000"
 *             required:
 *               - title
 *               - description
 *               - startDate
 *               - endDate
 *               - virtualEvent
 *               - image
 *               - email
 *               - requestedCodes
 *               - privateEvent
 *               - platform
 *               - poapType
 *               - poapsToBeMinted
 *               - mintedPoaps
 *               - issuerUuid
 *     responses:
 *       '201':
 *         description: Event created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       '400':
 *         description: Invalid request
 *       '500':
 *         description: Internal server error
*/
eventRouter.post("/createEvent", eventController.createEvent)

/**
 * @swagger
 * /event/createAndApproveMock:
 *   post:
 *     tags: 
 *       - Event
 *     summary: Create new event
 *     description: Create new event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Event title"
 *               description:
 *                 type: string
 *                 example: "Event description"
 *               city:
 *                 type: string
 *                 example: "Buenos Aires"
 *               country:
 *                 type: string
 *                 example: "Argentina"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2022-01-01"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2022-01-02"
 *               expiryDate:
 *                 type: string
 *                 format: date
 *                 example: "2022-01-03"
 *               year:
 *                 type: integer
 *                 example: 2022
 *               eventUrl:
 *                 type: string
 *                 example: "https: *www.example.com"
 *               virtualEvent:
 *                 type: boolean
 *                 example: true
 *               image:
 *                 type: string
 *                 example: "https: *www.example.com/image.jpg"
 *               secretCode:
 *                 type: string
 *                 example: "secret"
 *               eventTemplateId:
 *                 type: string
 *                 example: "template"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: mail@example.com
 *               requestedCodes:
 *                 type: integer
 *                 example: 100
 *               privateEvent:
 *                 type: boolean
 *                 example: false
 *               purpose:
 *                 type: string
 *                 example: "Event purpose"
 *               platform:
 *                 type: string
 *                 example: "Event platform"
 *               eventType:
 *                 type: string
 *                 enum:
 *                   - "Virtual"
 *                   - "In-Person"
 *                   - "Both"
 *                   - "Unknown"
 *                 example: "Virtual"
 *               amountOfAttendees:
 *                 type: integer
 *                 example: 100
 *               poapType:
 *                 type: string
 *                 enum:
 *                   - "Poap"
 *                   - "Soulbound"
 *                   - "Consensual"
 *                 example: "Poap"
 *               poapsToBeMinted:
 *                 type: integer
 *                 example: 100
 *               mintedPoaps:
 *                 type: integer
 *                 example: 50
 *               issuerUuid:
 *                 type: string
 *                 format: uuid
 *               example: "123e4567-e89b-12d3-a456-426614174000"
 *             required:
 *               - title
 *               - description
 *               - startDate
 *               - endDate
 *               - virtualEvent
 *               - image
 *               - email
 *               - requestedCodes
 *               - privateEvent
 *               - platform
 *               - poapType
 *               - poapsToBeMinted
 *               - mintedPoaps
 *               - issuerUuid
 *     responses:
 *       '201':
 *         description: Event created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       '400':
 *         description: Invalid request
 *       '500':
 *         description: Internal server error
*/
eventRouter.post("/createAndApproveMock", eventController.createAndApproveMock)

/**
 * @swagger
 * /event/approveOrReject:
 *   patch:
 *     tags:
 *      - Event
 *     summary: Approve or reject an event
 *     description: Approve or reject an event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               approval:
 *                 type: string
 *                 example: "Approved"
 *               eventIdInContract:
 *                 type: number
 *                 example: 1
 *               issuerAddress:
 *                 type: string
 *                 format: uuid
 *                 example: "0xdD2FD4581271e330360230F9337D5c0430Bf44C0"
 *               contractAddress:
 *                 type: string
 *                 format: address
 *                 example: "0xdD2FD4581271e330360230F9337D5c0430Bf44C0"
 *             required:
 *               - approval
 *               - eventIdInContract
 *               - issuerAddress
 *               - contractAddress
 *       responses:
 *         '200':
 *           description: An event
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Event'
 *         '404':
 *           description: Event not found
 *         '500':
 *           description: Internal server error
 */
eventRouter.patch("/approveOrReject", eventController.approveOrReject)

export default eventRouter