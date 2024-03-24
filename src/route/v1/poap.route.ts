import express, { Router } from "express"
import { getAllPoaps, getAllPoapsByAddress, getAllPoapsByEvent, getPoapsState } from "@/controller/poap.controller"

const router: Router = express.Router()

router.route("poap/getAll").get(getAllPoaps)
router.route("poap/getAllByAddress").get(getAllPoapsByAddress)
router.route("poap/getAllByEvent").get(getAllPoapsByEvent)
router.route("poap/getState").get(getPoapsState)

export default router