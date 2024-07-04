import express, { Router } from "express"
import * as issuerController from "../../controller/issuer.controller"

const issuerRouter: Router = express.Router()

issuerRouter.get("/getAll", issuerController.getAllIssuers)
issuerRouter.get("/getIssuerByEmail", issuerController.getIssuerByEmail)
issuerRouter.get("/getIssuerByPK", issuerController.getIssuerByPK)
issuerRouter.post("/createNewIssuer", issuerController.createNewIssuer)
issuerRouter.patch("/updateIssuer", issuerController.updateIssuer)


export default issuerRouter