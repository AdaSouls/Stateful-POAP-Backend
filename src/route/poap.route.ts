import express, { Router } from "express";
import * as poapController from "../controller/poap.controller";

const poapRouter: Router = express.Router();

/**
 * @swagger
 * /poap/getAll:
 *   get:
 *     tags:
 *       - Poap
 *     summary: Get all poaps
 *     description: Get all poaps
 *     responses:
 *       '200':
 *         description: A list of poaps
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Poap'
 *       '500':
 *         description: Internal server error
 */
poapRouter.get("/getAll", poapController.getAllPoaps);

/**
 * @swagger
 * /poap/getAllByAddress:
 *   get:
 *     tags:
 *       - Poap
 *     summary: Get all poaps by owner address
 *     description: Get all poaps by owner address
 *     parameters:
 *       - in: query
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: Owner address
 *     responses:
 *       '200':
 *         description: A list of poaps
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Poap'
 *       '500':
 *         description: Internal server error
 */
poapRouter.get("/getAllByAddress", poapController.getAllPoapsByOwnersAddress);

/**
 * @swagger
 * /poap/getByPK:
 *   get:
 *     tags:
 *       - Poap
 *     summary: Get poap by primary key
 *     description: Get poap by primary key
 *     parameters:
 *       - in: query
 *         name: poapUuid
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Poap primary key
 *     responses:
 *       '200':
 *         description: A poap
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Poap'
 *       '404':
 *         description: Poap not found
 *       '500':
 *         description: Internal server error
 */
poapRouter.get("/getByPK", poapController.getPoapByPK);

/**
 * @swagger
 * /poap/getAllByEvent:
 *   get:
 *     tags:
 *       - Poap
 *     summary: Get all poaps by event
 *     description: Get all poaps by event
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
 *         description: A poap
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Poap'
 *       '404':
 *         description: Poap not found
 *       '500':
 *         description: Internal server error
 */
poapRouter.get("/getAllByEvent", poapController.getAllPoapsByEvent);

/**
 * @swagger
 * /poap/mintPoap:
 *   post:
 *     tags:
 *       - Poap
 *     summary: Mint poap
 *     description: Mint poap
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventUuid:
 *                 type: string
 *                 format: uuid
 *                 example: 123e4567-e89b-12d3-a456-426614174000
 *               ownerAddress:
 *                 type: string
 *                 format: address
 *             required:
 *               - eventUuid
 *               - ownerAddress
 *     responses:
 *       '201':
 *         description: Poap minted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Poap'
 *       '400':
 *         description: Invalid request
 *       '500':
 *         description: Internal server error
 */
poapRouter.post("/mintPoap", poapController.mintPoap);

/**
 * @swagger
 * /poap/addEventToPoap:
 *   post:
 *     tags:
 *       - Poap
 *     summary: Add event to poap
 *     description: Add event to poap
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               poapUuid:
 *                 type: string
 *                 format: uuid
 *                 example: 123e4567-e89b-12d3-a456-426614174000
 *               eventUuid:
 *                 type: string
 *                 format: uuid
 *                 example: 123e4567-e89b-12d3-a456-426614174000
 *             required:
 *               - poapUuid
 *               - eventUuid
 *     responses:
 *       '201':
 *         description: Event added to poap
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventPoap'
 *       '400':
 *         description: Invalid request
 *       '500':
 *         description: Internal server error
 */
poapRouter.post("/addEventToPoap", poapController.addEventToPoap);

// poapRouter.get("/getState", poapController.getPoapsState)

export default poapRouter;
