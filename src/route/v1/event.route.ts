import express, { Router } from "express"
import * as eventController from "../../controller/event.controller"

const eventRouter: Router = express.Router()

eventRouter.get("/getAll", eventController.getAllEvents)
eventRouter.get("/getAllByAddress", eventController.getAllEventsByIssuersAddress)
eventRouter.get("/getByPK", eventController.getEventByPK)
eventRouter.post("/createEvent", eventController.createEvent)


export default eventRouter