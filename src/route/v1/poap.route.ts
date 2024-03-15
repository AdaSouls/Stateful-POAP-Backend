import express, { Router } from "express"
import { getAllPoapAssets } from "@/controller/poap.controller"

const router: Router = express.Router()

router.route("poap/getAll").get(getAllPoapAssets)

export default router