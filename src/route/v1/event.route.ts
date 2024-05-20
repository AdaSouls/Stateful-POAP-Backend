import express, { Router } from "express"
import * as eventController from "../../controller/event.controller"

const eventRouter: Router = express.Router()

eventRouter.get("/getAll", eventController.getAllEvents)
eventRouter.get("/getAllByAddress", eventController.getAllEventsByOwnersAddress)
eventRouter.post("/createEvent", eventController.createEvent)


export default eventRouter