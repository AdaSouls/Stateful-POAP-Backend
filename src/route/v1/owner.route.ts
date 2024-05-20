import express, { Router } from "express"
import * as ownerController from "../../controller/owner.controller"

const ownerRouter: Router = express.Router()

ownerRouter.get("/getAll", ownerController.getAllOwners)
ownerRouter.get("/getOwnerByAddress", ownerController.getOwnerByAddress)
ownerRouter.get("/getOwnerByEmail", ownerController.getOwnerByEmail)
ownerRouter.get("/getOwnerByPK", ownerController.getOwnerByPK)
ownerRouter.post("/createOwner", ownerController.createNewOwner)
ownerRouter.patch("/updateOwner", ownerController.updateOwner)


export default ownerRouter