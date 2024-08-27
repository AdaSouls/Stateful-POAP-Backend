import express, { Router } from "express"
import * as issuerController from "../controller/issuer.controller"

const issuerRouter: Router = express.Router()

/**
 * @swagger 
 * /issuer/getAll:
 *   get:
 *     tags: 
 *       - Issuer
 *     summary: Get all issuers
 *     description: Get all issuers
 *     responses:
 *       '200':
 *         description: A list of issuers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Issuer'
 *       '500':
 *         description: Internal server error
 */
issuerRouter.get("/getAll", issuerController.getAllIssuers)

/**
 * @swagger 
 * /issuer/getAllByAddress:
 *   get:
 *     tags: 
 *       - Issuer
 *     summary: Get all issuers by address
 *     description: Get all issuers by address
 *     parameters:
 *       - in: query
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *           format: address
 *         description: Issuer's address
 *     responses:
 *       '200':
 *         description: A list of issuers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Issuer'
 *       '500':
 *         description: Internal server error
 */
issuerRouter.get("/getAllByAddress", issuerController.getAllIssuersByAddress)

/**
 * @swagger
 * /issuer/getIssuerByEmail:
 *   get:
 *     tags: 
 *       - Issuer
 *     summary: Get issuer by email
 *     description: Get issuer by email
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Issuer email
 *     responses:
 *       '200':
 *         description: An issuer
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Issuer'
 *       '404':
 *         description: Issuer not found
 *       '500':
 *         description: Internal server error
 */
issuerRouter.get("/getIssuerByEmail", issuerController.getIssuerByEmail)

/**
 * @swagger
 * /issuer/getIssuerByPK:
 *   get:
 *     tags: 
 *       - Issuer
 *     summary: Get issuer by primary key
 *     description: Get issuer by primary key
 *     parameters:
 *       - in: query
 *         name: issuerUuid
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Issuer primary key
 *     responses:
 *       '200':
 *         description: An issuer
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Issuer'
 *       '404':
 *         description: Issuer not found
 *       '500':
 *         description: Internal server error
 */
issuerRouter.get("/getIssuerByPK", issuerController.getIssuerByPK)

/**
 * @swagger
 * /issuer/createNewIssuer:
 *   post:
 *     tags: 
 *       - Issuer
 *     summary: Create new issuer
 *     description: Create new issuer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               address:
 *                 type: string
 *                 format: address
 *                 example: "0xdD2FD4581271e330360230F9337D5c0430Bf44C0"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: mail@example.com
 *               organization:
 *                 type: string
 *                 example: Some_Organization
 *               name:
 *                 type: string
 *                 example: Name_of_the_issuer_for_the_event
 *             required:
 *               - address
 *               - email
 *               - organization
 *               - name
 *     responses:
 *       '201':
 *         description: Issuer created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Issuer'
 *       '400':
 *         description: Invalid request
 *       '500':
 *         description: Internal server error
*/
issuerRouter.post("/createNewIssuer", issuerController.createNewIssuer)

/**
 * @swagger
 * /issuer/updateIssuer:
 *   patch:
 *     tags: 
 *       - Issuer
 *     summary: Update issuer
 *     description: Update issuer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               issuerUuid:
 *                 type: string
 *                 format: uuid
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *             required:
 *               - issuerUuid
 *             anyOf:
 *               - properties:
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: mail@example.com
 *       responses:
 *         '200':
 *           description: Issuer updated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Issuer'
 *         '400':
 *           description: Invalid request
 *         '404':
 *           description: Issuer not found
 *         '500':
 *           description: Internal server error
 */
issuerRouter.patch("/updateIssuer", issuerController.updateIssuer)


export default issuerRouter