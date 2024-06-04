import express, { Router } from "express"
import * as poapController from "../../controller/poap.controller"

const poapRouter: Router = express.Router()

poapRouter.get("/getAll", poapController.getAllPoaps)
poapRouter.get("/getAllByAddress", poapController.getAllPoapsByOwnersAddress)
poapRouter.get("/getByPK", poapController.getPoapByPK)
poapRouter.get("/getAllByEvent", poapController.getAllPoapsByEvent)
poapRouter.get("/getState", poapController.getPoapsState)
poapRouter.post("/mintPoap", poapController.mintPoap)
poapRouter.post("/addEventToPoap", poapController.addEventToPoap)
poapRouter.patch("/updateMetadata", poapController.updatePoapMetadata)

export default poapRouter