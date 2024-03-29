import express, { Router } from "express"
import { getAllPoaps, getAllPoapsByOwnersAddress, getAllPoapsByEvent, getPoapsState } from "@/controller/poap.controller"

const poapRouter: Router = express.Router()

poapRouter.route("poap/getAll").get(getAllPoaps)
poapRouter.route("poap/getAllByAddress").get(getAllPoapsByOwnersAddress)
poapRouter.route("poap/getAllByEvent").get(getAllPoapsByEvent)
poapRouter.route("poap/getState").get(getPoapsState)

export default poapRouter