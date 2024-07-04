import express from "express";
import poapRouter from "./poap.route";
import { config } from "../../config";
import ownerRouter from "./owner.route";
import eventRouter from "./event.route";
import issuerRouter from "./issuer.route";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/poap",
    route: poapRouter,
  },
  {
    path: "/owner",
    route: ownerRouter,
  },
  {
    path: "/event",
    route: eventRouter,
  },
  {
    path: "/issuer",
    route: issuerRouter,
  },
];

const devRoutes: any[] = [
  // routes available only in development mode
  {
    path: "/poap",
    route: poapRouter,
  },
  {
    path: "/owner",
    route: ownerRouter,
  },
  {
    path: "/event",
    route: eventRouter,
  },
  {
    path: "/issuer",
    route: issuerRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env !== "production") {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
