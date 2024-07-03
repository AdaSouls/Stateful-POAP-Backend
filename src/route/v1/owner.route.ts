import express, { Router } from "express"
import * as ownerController from "../../controller/owner.controller"

const ownerRouter: Router = express.Router()

/**
 * @swagger
 * /owner/getAll:
 * get:
 *   tags: 
 *     - Owner
 *   summary: Get all owners
 *   description: Get all owners
 *   responses:
 *     '200':
 *       description: A list of owners
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Owner'
 */
ownerRouter.get("/getAll", ownerController.getAllOwners)

/**
 * @swagger
 * /owner/getOwnerByAddress:
 * get:
 *   tags: 
 *     - Owner
 *   summary: Get owner by address
 *   description: Get owner by address
 *   parameters:
 *     - in: query
 *       name: address
 *       required: true
 *       schema:
 *         type: string
 *       description: Owner address
 *   responses:
 *     '200':
 *       description: An owner
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Owner'
 *     '404':
 *       description: Owner not found
 */
ownerRouter.get("/getOwnerByAddress", ownerController.getOwnerByAddress)

/**
 * @swagger
 * /owner/getOwnerByEmail:
 * get:
 *   tags: 
 *     - Owner
 *   summary: Get owner by email
 *   description: Get owner by email
 *   parameters:
 *     - in: query
 *       name: email
 *       required: true
 *       schema:
 *         type: string
 *       description: Owner email
 *   responses:
 *     '200':
 *       description: An owner
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Owner'
 *     '404':
 *       description: Owner not found
 */
ownerRouter.get("/getOwnerByEmail", ownerController.getOwnerByEmail)

/**
 * @swagger
 * /owner/getOwnerByPK:
 * get:
 *   tags: 
 *     - Owner
 *   summary: Get owner by primary key
 *   description: Get owner by primary key
 *   parameters:
 *     - in: query
 *       name: ownerUuid
 *       required: true
 *       schema:
 *         type: string
 *         format: uuid
 *       description: Owner primary key
 *   responses:
 *     '200':
 *       description: An owner
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Owner'
 *     '404':
 *       description: Owner not found
 */
ownerRouter.get("/getOwnerByPK", ownerController.getOwnerByPK)

/**
 * @swagger
 * /owner/createOwner:
 *     post:
 *       tags: 
 *         - Owner
 *       summary: Create new owner
 *       description: Create new owner
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 address:
 *                   type: string
 *                   format: address
 *                   example: "0xdD2FD4581271e330360230F9337D5c0430Bf44C0"
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: mail@example.com
 *               required:
 *                 - address
 *                 - email
 *       responses:
 *         '201':
 *           description: Owner created
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Owner'
 *         '400':
 *           description: Invalid request
 *         '500':
 *           description: Internal server error
 */
ownerRouter.post("/createOwner", ownerController.createNewOwner)

/**
 * @swagger
 * /owner/updateOwner:
 *     patch:
 *       tags: 
 *         - Owner
 *       summary: Update owner
 *       description: Update owner
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ownerUuid:
 *                   type: string
 *                   format: uuid
 *                   example: 123e4567-e89b-12d3-a456-426614174000
 *               required:
 *                 - ownerUuid
 *               anyOf:
 *                 - properties:
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: mail@example.com
 *                 - properties:
 *                     address:
 *                       type: string
 *                       format: address
 *                       example: "0xdD2FD4581271e330360230F9337D5c0430Bf44C0"
 *       responses:
 *         '200':
 *           description: Owner updated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Owner'
 *         '400':
 *           description: Invalid request
 *         '404':
 *           description: Owner not found
 *         '500':
 *           description: Internal server error
 */
ownerRouter.patch("/updateOwner", ownerController.updateOwner)


export default ownerRouter