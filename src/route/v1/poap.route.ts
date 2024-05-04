import express, { Router } from "express"
import * as poapController from "../../controller/poap.controller"

const poapRouter: Router = express.Router()

poapRouter.route("/getAll").get(poapController.getAllPoaps)
poapRouter.route("/getAllByAddress").get(poapController.getAllPoapsByOwnersAddress)
poapRouter.route("/getAllByEvent").get(poapController.getAllPoapsByEvent)
poapRouter.route("/getState").get(poapController.getPoapsState)
poapRouter.route("/mintPoap").post(poapController.mintPoap)

export default poapRouter